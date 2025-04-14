
import { Box, Container, TextField, Typography, Button, FormControl } from "@mui/material";
import Body from "../components/containers/body";


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
            <Container sx={{display: "flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
                <Box sx={{display: "flex", flexDirection:"column", maxWidth:"350px", width:"100%"}}>
                    <Typography variant="h1" sx={{textAlign:"center"}}>
                        Välkommen!
                    </Typography>

                    <FormControl sx={{ my: 1 }}>
                        <TextField
                            label="Användarnamn"
                            name="username"
                            variant="outlined"
                            fullWidth


                        />
                    </FormControl>
                    <FormControl sx={{ my: 1 }}>
                        <TextField
                            label="Lösenord"
                            name="password"
                            variant="outlined"
                            fullWidth

                        />
                    </FormControl>
                    <Button 
                        variant ="outlined"
                        color="primary"
                    >
                        Logga in
                    </Button>
                    
                </Box>
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
            </Container>
        </Body>
        

    )
}

export default LogIn;