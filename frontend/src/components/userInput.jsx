import { Box, Container, Typography, FormControl, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";


{/* Denna ska skicka tillbaka formuläret för att logga in och registera
    ex, boxarna för att skriva in användarnamn, lösernord etc. Registrera kanske 
    ska ha så man upprepar lösenordet? Vet ej hur jag ska implementera detta då
    men det tar jag sen */}

function UserInput(title, action, navigation){

    return (
        <Container sx={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
            <Box sx={{display:"flex", flexdirection:"column", maxWidth:"350px", width:"100%"}}>
                <Typography variant="h1" sx={{textAlign:"center"}}>
                    {title}
                </Typography>

                <FormControl sx={{ my:1 }}>
                    <TextField
                        label="Användarnamn"
                        name="username"
                        variant="outlined"
                        fullWidth
                    />
                </FormControl>

                <FormControl sx={{ my:1 }}>
                    <TextField
                        label="Lösenord"
                        name="password"
                        variant="outlined"
                        fullWidth
                    />
                </FormControl>
                <Link to="navigation" style={{textDecoration:"none", color:"black"}}>
                    <Button
                        variant="outlined"
                        color="primary"
                    >
                        {action}
                    </Button>
                </Link>
            </Box>
        </Container>
    )
}

export default UserInput;
