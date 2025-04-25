import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { fetchData } from "../hooks/FetchData";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            setMessage("Ogiltig eller saknad token. Vänligen försök återställa ditt lösenord igen.");
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            setMessage("Ogiltig eller saknad token. Vänligen försök återställa ditt lösenord igen.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage("Lösenorden matchar inte. Var vänlig försök igen.");
            return;
        }
        if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
            setMessage("Lösenordet måste vara minst 8 tecken långt och innehålla minst en stor bokstav och en siffra.");
            return;
        }

        setIsLoading(true);
        try {
            const data = await fetchData(`auth/reset-password?token=${token}&newPassword=${newPassword}`, "PUT", null, true);
            setMessage(data.message || "Lösenordet har återställts.");
            setIsSuccess(true);
            setTimeout(() => {
                window.location.href = "/login";
            }, 3000);
        } catch (error) {
            setMessage(error.message || "Lösenordsåterställning misslyckades. Var vänlig försök igen.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", pt: 2 }}>
            <Typography variant="h1" sx={{ textAlign: "center", mb: 4, color: "primary.main" }}>
                SmartCalendar
            </Typography>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5">Reset Your Password</Typography>
                <Box component="div" sx={{ width: "300px", mt: 2 }}>
                    <TextField
                        label="Nytt Lösenord"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Bekräfta Lösenord"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Återställ Lösenord"}
                    </Button>
                </Box>
                {message && (
                    <Typography variant="body1" sx={{ mt: 2, color: isSuccess ? "green" : "red" }}>
                        {message}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

export default ResetPassword;