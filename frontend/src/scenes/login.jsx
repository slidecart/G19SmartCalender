
import { Box, Container, TextField, Typography, Button, FormControl, colors } from "@mui/material";
import { Link } from "react-router-dom";
import Body from "../components/containers/body";
import UserInput from "../components/userInput";


function LogIn(key, value) {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const username = formData.get('username');
        const password = formData.get('password');

        const loginRequest = {
            username,
            password
        }

        // Basic Validation
        if (!username || !password) {
            alert('Please provide both username and password.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginRequest),
            });

            if (!response.ok) {
                throw new Error(`Login failed: ${response.status} – ${response.statusText}`);
            }

            const data = await response.text();
            console.log('Login successful:', data); // Handle response data
            localStorage.setItem("jwt", data.token);
        } catch (error) {
            console.error('An error occurred:', error.message);
            alert('Login failed. Please try again.');
        }
    };

    return(

        <Body>
            <UserInput title="Välkommen">
                <FormControl>
                    <TextField
                        label="Användarnamn"
                        name="username"
                        variant="outlined"
                        fullWidth
                    />
                </FormControl>

                <FormControl>
                    <TextField
                        label="Lösenord"
                        name="username"
                        variant="outlined"
                        fullWidth
                    />
                </FormControl>

                <Link to="/today" style={{textDecoration:"none", color:"black"}}>
                    <Button
                        variant="outlined"
                        color="primary"
                    >
                        Logga in
                    </Button>
                </Link>
            </UserInput>

            {/* Box för att ge användaren möjlighet att registrera sig */}
                <Box sx={{display:"flex", flexDirection:"column", my: 3, justifyContent:"center", alignItems:"center", maxWidth:"350px", width:"100%"}}>
                    <Typography variant="p" sx={{my: 1, textDecoration:"underline", fontWeight:"600", fontSize:"18px"}}>
                        Inte registrerat dig än?
                    </Typography>
                    <Button
                        variant="contained"
                        backgroundColor="secondary.main"
                        fullWidth
                    >
                        Registrera dig idag!
                    </Button>
                </Box>
        </Body>
        

    )
}

export default LogIn;