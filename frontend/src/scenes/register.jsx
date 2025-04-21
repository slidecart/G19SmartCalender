import Body from "../components/containers/body";
import { Box, Container, Typography, FormControl, TextField, Button } from "@mui/material";

return (
    <Body>
        <Container sx={{display: "flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
            <Box sx={{display: "flex", flexDirection:"column", maxWidth:"350px", width:"100%"}}>
                <Typography variant="h1" sx={{textAlign:"center"}}>
                    Registrera dig
                </Typography>

                <FormControl sx={{ my:1 }}>
                    <TextField
                        label="Användarnamn"
                        name="username"
                        variant="outlined"
                        fullWidth
                    />
                </FormControl>

                <FormControl sx={{ my: 1}}>
                    <TextField
                        label="Email"
                        name="emailAdress"
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

                <Button
                    variant="contained"
                    color="primary"
                >
                    Registrera
                </Button>
            </Box>
        </Container>

    </Body>
)