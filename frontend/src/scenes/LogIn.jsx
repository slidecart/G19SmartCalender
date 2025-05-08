import {useState} from "react";
import {Alert, Box, Button, CircularProgress, Snackbar, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import UserInput from "../components/userInput";
import {useAuth} from "../context/AuthContext";
import {fetchData} from "../hooks/FetchData";

function LogIn() {
    const auth = useAuth();
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showResendVerification, setShowResendVerification] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const username = formData.get('username');
        const password = formData.get('password');

        const loginRequest = {
            username,
            password
        };

        if (loginRequest.username === "" || loginRequest.password === "") {
            setSnackbar({
                open: true,
                message: "Var vänlig fyll i alla fält.",
                severity: "error"
            });
            setShowResendVerification(false);
            return;
        }

        setIsLoading(true);
        try {
            await auth.loginAction(loginRequest);
            setShowResendVerification(false);
        } catch (error) {
            console.error("Login error:", error);
            if (error.message.toLowerCase().includes("email not verified")) {
                setSnackbar({
                    open: true,
                    message: "Vänligen verifiera din e-postadress innan du loggar in.",
                    severity: "error"
                });
                setShowResendVerification(true);
            } else {
                setSnackbar({
                    open: true,
                    message: "Inloggning misslyckades: Fel användarnamn eller lösenord.",
                    severity: "error"
                });
                setShowResendVerification(false);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        if (!emailInput) {
            setSnackbar({
                open: true,
                message: "Var vänlig ange din e-postadress.",
                severity: "error"
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}auth/forgot-password?email=${encodeURIComponent(emailInput)}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const data = await response.json();
            setSnackbar({
                open: true,
                message: data.message || "Länk för återställning av lösenord skickas till din e-post.",
                severity: "success"
            });
            setEmailInput("");

            if (data.message === "Länk för återställning av lösenord skickas till din e-post.") {
                setIsForgotPassword(false);
            }

        } catch (error) {
            console.error("Forgot password error:", error);
            setSnackbar({
                open: true,
                message: error.message || "Meddelande kunde inte skickas. Var vänlig försök igen.",
                severity: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendVerification = async () => {
        if (!emailInput) {
            setSnackbar({
                open: true,
                message: "Var vänlig ange din e-postadress för att skicka verifieringslänk.",
                severity: "error"
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}auth/resend-verification?email=${encodeURIComponent(emailInput)}`, {
            method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                }
             });
        const data = await response.json();
            console.error("fetchData response:", data);
            setSnackbar({
                open: true,
                message: data.message || "Verifieringslänk skickad till din e-post.",
                severity: "success"
            });
            setEmailInput("");

            if (data.message === "Verifieringslänk skickad till din e-post.") {
                setShowResendVerification(false);
            }

            } catch (error) {
            console.error("Resend verification error:", error);
            setSnackbar({
                open: true,
                message: error.message || "Kunde inte skicka verifieringslänk. Försök igen.",
                severity: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        setIsForgotPassword(false);
        setEmailInput("");
        setShowResendVerification(false);
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", height: "100vh" }}>
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
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
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
                </Box>
            ) : showResendVerification ? (
                <Box sx={{ maxWidth: "350px", width: "100%", textAlign: "center" }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Verifiera din e-post
                    </Typography>
                    <TextField
                        label="E-postadress"
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        fullWidth
                        margin="normal"
                        placeholder="Ange e-post för verifieringslänk"
                    />
                    <Button
                        variant="contained"
                        onClick={(e) => {
                            e.preventDefault();
                            handleResendVerification();
                        }}
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Skicka Verifieringslänk"}
                    </Button>
                    <Button
                        onClick={handleBackToLogin}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Tillbaka till inloggning
                    </Button>
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
                        isLoading={isLoading}
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
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default LogIn;