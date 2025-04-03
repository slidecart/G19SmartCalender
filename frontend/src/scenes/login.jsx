import { Box, Container, TextField, Typography, Button } from "@mui/material";

function LogIn() {

    {/*Här måste läggas till funktioner kopplat till backend för att få möjlighet att logga in*/}

    return(
        <Container sx={{display: "flex", alignItems:"center", justifyContent:"center", height:"80vh", flexDirection:"column"}}>
            <Box sx={{display: "flex", flexDirection:"column", maxWidth:"350px", width:"100%"}}>
                <Typography variant="h1" sx={{textAlign:"center"}}>
                    Välkommen!
                </Typography>
                <TextField
                    label="Användarnamn"
                    name="username"
                    variant="outlined"
                    fullWidth
                    
                />
                <TextField  
                    label="Lösenord"
                    name="password"
                    variant="outlined"
                    fullWidth

                />
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
    )
}

export default LogIn;