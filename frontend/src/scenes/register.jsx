import React from 'react';
import { Container, Box } from '@mui/material';
import UserInput from '../components/userInput';

function Register() {
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);


        const username = formData.get('username');
        const email = formData.get('emailAdress');
        const password = formData.get('password');
        const checkPassword = formData.get('checkPassword');


        if (!username || !email || !password || !checkPassword) {
            alert("Alla fält måste fyllas i.");
            return;
        }

        if (password !== checkPassword) {
            alert("Lösenorden matchar inte.");
            return;
        }

        const registerRequest = {
            username,
            emailAddress: email,
            password
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}auth/register`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerRequest)
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 409) {
                        alert("Användarnamn eller email finns redan.");
                    } else {
                        alert("Registreringen misslyckades. Försök igen.");
                    }
                    throw new Error("Registration failed");
                }
                return response.json();
            })
            .then(data => {
                alert("Registrering lyckades! Välkommen, " + data.username);
                 window.location.href = "/login";
            })
            .catch(error => {
                console.error("Fel vid registrering:", error);
                alert("Ett fel uppstod. Kunde inte kontakta servern.");
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
                    <p>Har du redan ett konto? <a href="/login">Logga in här</a></p>
                </Box>
            </Box>
        </Container>
    );
}

export default Register;
