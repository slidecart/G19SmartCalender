
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
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

            const data = await response.json();
            console.log('Login successful:', data); // Handle response data
            // Save tokens correctly using their property names
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
        } catch (error) {
            console.error('An error occurred:', error.message);
            alert('Login failed. Please try again.');
        }
    };

    return(
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", height:"100vh"}}>
            
            {/* Field that let's the user log in using their username and password */}
            <UserInput 
                title="Välkommen"
                fields={[
                    { label: "Användarnamn", name:"username", required:true},
                    { label: "Lösenord", name:"password", type:"password", required:true}

                ]}
                buttonText="Logga in"
                onSubmit={handleSubmit}
                >

                {/* Hur knappen ska vara utformad
                <Button
                    component={Link}
                    to="/today"
                    variant="outlined"
                    color="primary"
                >
                    Logga in
                </Button>
            */}
            </UserInput>

            {/* Box that allows the user to register themselves */}
                <Box sx={{display:"flex", flexDirection:"column", my: 3, justifyContent:"center", alignItems:"center", maxWidth:"350px", width:"100%"}}>
                    <Typography variant="p" sx={{my: 1, textDecoration:"underline", fontWeight:"600", fontSize:"18px"}}>
                        Inte registrerat dig än?
                    </Typography>
                    <Button
                        component={Link}
                        to="/register"
                        variant="contained"
                        backgroundColor="secondary.main"
                        fullWidth
                    >
                        Registrera dig idag!
                    </Button>
                </Box>
        </Box>
        

    )
}

export default LogIn;