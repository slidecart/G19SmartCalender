import { Box, Container } from "@mui/material";
import UserInput from "../components/userInput";

function Register(){


    return (
        <Container sx={{display: "flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
            <Box sx={{display: "flex", flexDirection:"column", maxWidth:"350px", width:"100%"}}>
                {/* 
                    Field allowing the user to register by deciding a username and password 
                    connected to their email. Password needs to be repeated to make sure the 
                    user typed in the correct password
                
                */}
                <UserInput
                    title="Registrera dig"
                    fields={[
                        { label: "Användarnamn", name:"username", required:true },
                        { label: "Email", name:"emailAdress", required:true},
                        { label:"Lösenord", name:"password", required:true},
                        { label:"Upprepa lösenord", name:"checkPassword", required:true}
                    ]}
                    buttonText="Registrera"
                    onsubmit={handleSubmit} // Tillägg av handleSubmit för att skicka vidare till backend 
                />
            </Box>
        </Container>
    )
}

export default Register;

