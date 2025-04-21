import { Box, Container, FormControl, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

{/* Denna ska skicka tillbaka formuläret för att logga in och registera
    ex, boxarna för att skriva in användarnamn, lösernord etc. Registrera kanske 
    ska ha så man upprepar lösenordet? Vet ej hur jag ska implementera detta då
    men det tar jag sen */}

function UserInput(title, fields = [], buttonText, onSubmit, children){

    return (
        <Container sx={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
            <Box sx={{display:"flex", flexdirection:"column", maxWidth:"350px", width:"100%"}}>
                <Typography variant="h1" sx={{textAlign:"center"}}>
                    {title}
                </Typography>

                {fields.map((field, index) => (
                    <FormControl key={index} sx={{ mb: 2 }}>
                        <TextField
                            label={field.label}
                            name={field.name}
                            type="text"
                            variant="outlined"
                            fullWidth
                            required={field.required ?? true}
                        />
                    </FormControl>
                ))}

                <Button 
                    type="submit"   
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 1 }} 
                >
                    {buttonText}
                </Button>
                
                {/* Om det finns element inuti <UserInput> skall dessa element fortfarande visas */}
                {children && (
                    <Box sx={{ mt: 2 }}>
                        {children}
                    </Box>
                )}
            </Box>
        </Container>
    )
}

export default UserInput;
