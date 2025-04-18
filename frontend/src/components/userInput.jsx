import { Box, Container, Typography } from "@mui/material";


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
            </Box>
        </Container>
    )
}

export default UserInput;
