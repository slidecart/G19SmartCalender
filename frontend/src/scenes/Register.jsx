import React, { useState } from 'react';
import { Box, Container, Snackbar, Alert } from '@mui/material';
import UserInput from '../components/userInput';
import { Link } from 'react-router-dom';
// TODO: "Vänligen verifiera din e-postadress innan du loggar in." - this should be handled in the backend and shown here
function Register() {
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const username = formData.get('username');
        const email = formData.get('emailAdress');
        const password = formData.get('password');
        const checkPassword = formData.get('checkPassword');

        if (!username || !email || !password || !checkPassword) {
            setSnackbar({
                open: true,
                message: "Alla fält måste fyllas i.",
                severity: "error"
            });
            return;
        }

        if (password !== checkPassword) {
            setSnackbar({
                open: true,
                message: "Lösenorden matchar inte.",
                severity: "error"
            });
            return;
        }

        const registerRequest = {
            username,
            emailAddress: email,
            password
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerRequest)
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 409) {
                        setSnackbar({
                            open: true,
                            message: "Användarnamn eller email finns redan.",
                            severity: "error"
                        });
                    } else {
                        setSnackbar({
                            open: true,
                            message: "Registreringen misslyckades. Försök igen.",
                            severity: "error"
                        });
                    }
                    throw new Error("Registration failed");
                }
                return response.json();
            })
            .then(data => {
                setSnackbar({
                    open: true,
                    message: `Registrering lyckades! Välkommen, ${data.username}`,
                    severity: "success"
                });
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            })
            .catch(error => {
                console.error("Fel vid registrering:", error);
                setSnackbar({
                    open: true,
                    message: "Ett fel uppstod. Kunde inte kontakta servern.",
                    severity: "error"
                });
            });
    };

    return (
        <Container
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "100vh"
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "350px", width: "100%" }}>
                <UserInput
                    title="Registrera dig"
                    fields={[
                        { label: "Användarnamn", name: "username", required: true },
                        { label: "Email", name: "emailAdress", required: true },
                        { label: "Lösenord", name: "password", type: "password", required: true },
                        { label: "Upprepa lösenord", name: "checkPassword", type: "password", required: true }
                    ]}
                    buttonText="Registrera"
                    onSubmit={handleSubmit}
                />
                <Box sx={{ textAlign: "center", mt: 2 }}>
                    <p>Har du redan ett konto? <Link to="/login">Logga in här</Link></p>
                </Box>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Register;