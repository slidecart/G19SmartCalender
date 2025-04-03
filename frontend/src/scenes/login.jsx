import { Box, Container, TextField, Typography } from "@mui/material";

function LogIn() {

    return(
        <Container sx={{display: "flex", alignItems:"center", justifyContent:"center", height:"80vh"}}>
            <Box sx={{display: "flex", flexDirection:"column"}}>
                <Typography variant="h1">
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
            </Box>
        </Container>
    )
}

export default LogIn;