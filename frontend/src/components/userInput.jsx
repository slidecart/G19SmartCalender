import { Box, Container, FormControl, Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

{/* Denna ska skicka tillbaka formuläret för att logga in och registera
    ex, boxarna för att skriva in användarnamn, lösernord etc. Registrera kanske 
    ska ha så man upprepar lösenordet? Vet ej hur jag ska implementera detta då
    men det tar jag sen */}

function UserInput({title, fields = [], buttonText, onSubmit, children}){

    return (
        <Container sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Box sx={{display:"flex", flexDirection:"column", width:"100%", maxWidth:"350px"}}>
                {/* Title for the page */}
                <Typography variant="h1" sx={{textAlign:"center"}}>
                    {title}
                </Typography>

                {/* Maps out all textFields for the form */}
                {fields.map((field, index) => (
                    <FormControl key={index} sx={{ mb: 2 }}>
                        <TextField
                            label={field.label}
                            name={field.name}
                            type={field.type || "text" }
                            variant="outlined"
                            fullWidth
                            required={field.required ?? true}
                        />
                    </FormControl>
                ))}

                {/* Button delivering the data written by the user */}
                <Button 
                    type="submit"   
                    variant="contained" 
                    color="primary" 
                    fullWidth 
                    sx={{ mt: 1 }} 
                >
                    {buttonText}
                </Button>
                
                {/*If there are any elements inside of <UserInput> shall these elements still show */}
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
