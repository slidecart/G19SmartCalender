import React from 'react';
import { Container, Box } from '@mui/material';
import UserInput from '../components/UserInput'; // Adjust path if needed

function Register() {
    // This function handles form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default page refresh

        const formData = new FormData(e.target); // Get form data

        // Extract fields from form
        const username = formData.get('username');
        const email = formData.get('emailAdress'); // Match backend's "emailAddress"
        const password = formData.get('password');
        const checkPassword = formData.get('checkPassword');

        // Basic frontend validation
        if (!username || !email || !password || !checkPassword) {
            alert("Alla fält måste fyllas i."); // All fields are required
            return;
        }

        if (password !== checkPassword) {
            alert("Lösenorden matchar inte."); // Passwords don't match
            return;
        }

        // Prepare object for backend
        const registerRequest = {
            username,
            emailAddress: email,
            password
        };

        // Send request to backend
        fetch("http://localhost:8080/register", {
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
                // Optional: redirect to login or homepage
                // window.location.href = "/login";
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
                    onSubmit={handleSubmit} // Capital "S" is important!
                />
            </Box>
        </Container>
    );
}

export default Register;
