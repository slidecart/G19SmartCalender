
import { Box, Container, TextField, Typography, Button, FormControl, colors } from "@mui/material";
import { Link } from "react-router-dom";
import Body from "../components/containers/body";
import UserInput from "../components/userInput";
import {useAuth} from "../hooks/AuthContext";


function LogIn(key, value) {

    const auth = useAuth();
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const username = formData.get('username');
        const password = formData.get('password');

        const loginRequest = {
            username,
            password
        }

        // Basic Validation
        if (loginRequest.username !== "" && loginRequest.password !== "") {
            auth.loginAction(loginRequest);
            return;
        }
        alert("please provide a valid input");
    };

    const fields = [
        {label: "Användarnamn", name:"username", required:true},
        {label: "Lösenord", name:"password", required:true}
    ]

    return(

        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", height:"100vh"}}>
            <UserInput 
                title="Välkommen"
                fields={[
                    { label: "Användarnamn", name:"username", required:true},
                    {label: "Lösenord", name:"password", required:true}

                ]}
                buttonText="Logga in"
                onSubmit={handleSubmit}
                >

                {/*
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

            {/* Box för att ge användaren möjlighet att registrera sig */}

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