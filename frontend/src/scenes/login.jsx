
import { useState } from "react";
import { Box, Typography, Button, TextField, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import UserInput from "../components/userInput";
import {useAuth} from "../hooks/AuthContext";
import { fetchData } from "../hooks/FetchData";



function LogIn() {

    const auth = useAuth();
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
        alert("Var vänlig fyll i alla fält.");
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage("Var vänlig ange din e-postadress.");
            return;
        }

        setIsLoading(true);
        try {
            const data = await fetchData(`auth/forgot-password?email=${encodeURIComponent(email)}`, "POST", null, true);
            setMessage(data.message || "Länk för återställning av lösenord skickas till din e-post.");
            setEmail("");
        } catch (error) {
            setMessage(error.message || "Meddelande kunde inte skickas. Var vänlig försök igen.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        setIsForgotPassword(false);
        setMessage("");
        setEmail("");
    };

    return(
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", height:"100vh"}}>
            <Typography variant="h1" sx={{ textAlign: "center", mb: 4, color: "primary.main" }}>
                SmartCalendar
            </Typography>

            {isForgotPassword ? (
                <Box sx={{ maxWidth: "350px", width: "100%", textAlign: "center" }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Byt ditt lösenord
                    </Typography>
                    <form onSubmit={handleForgotPasswordSubmit}>
                        <TextField
                            label="E-postadress"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2 }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : "Skicka Återställning Länk"}
                        </Button>
                        <Button
                            onClick={handleBackToLogin}
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Tillbaka till inloggning
                        </Button>
                    </form>
                    {message && (
                        <Typography
                            variant="body1"
                            sx={{ mt: 2, color: message.includes("sent") ? "green" : "red" }}
                        >
                            {message}
                        </Typography>
                    )}
                </Box>
            ) : (
                <>
                    <UserInput
                        title="Välkommen"
                        fields={[
                            { label: "Användarnamn", name: "username", required: true },
                            { label: "Lösenord", name: "password", type: "password", required: true },
                        ]}
                        buttonText="Logga in"
                        onSubmit={handleSubmit}
                    />
                    <Box sx={{ maxWidth: "350px", width: "100%", textAlign: "center", mt: 2 }}>
                        <Typography
                            variant="body1"
                            component={Link}
                            to="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsForgotPassword(true);
                            }}
                            sx={{ textDecoration: "underline", cursor: "pointer", color: "primary.main" }}
                        >
                            Glömt Lösenordet?
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", my: 3, justifyContent: "center", alignItems: "center", maxWidth: "350px", width: "100%" }}>
                        <Typography variant="body1" sx={{ my: 1, textDecoration: "underline", fontWeight: "600", fontSize: "18px" }}>
                            Inte registrerat dig än?
                        </Typography>
                        <Button
                            component={Link}
                            to="/register"
                            variant="contained"
                            sx={{ backgroundColor: "secondary.main" }}
                            fullWidth
                        >
                            Registrera dig idag!
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    )
}

export default LogIn;