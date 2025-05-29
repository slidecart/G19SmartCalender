import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Box, Button, CircularProgress, TextField, Typography, Snackbar, Alert} from "@mui/material";
import {fetchData} from "../hooks/FetchData";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

    useEffect(() => {
        if (!token) {
            setSnackbar({
                open: true,
                message: "Ogiltig eller saknad token. Vänligen försök återställa ditt lösenord igen.",
                severity: "error"
            })
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            setSnackbar({
                open: true,
                message: "Ogiltig eller saknad token. Vänligen försök återställa ditt lösenord igen.",
                severity: "error"
            });
            return;
        }
        if (newPassword !== confirmPassword) {
            setSnackbar({
                open: true,
                message: "Lösenorden matchar inte. Vänligen försök igen.",
                severity: "error"
            })
            return;
        }
        if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
            setSnackbar({
                open: true,
                message: "Lösenordet måste vara minst 8 tecken långt och innehålla minst en stor bokstav och en siffra.",
                severity: "error"
            })
            return;
        }

        setIsLoading(true);
        try {
            const data = await fetchData(`auth/reset-password?token=${token}&newPassword=${newPassword}`, "PUT", null, true);
            setSnackbar({
                open: true,
                message: "Lösenordet har återställts. Du kommer att omdirigeras till inloggningssidan.",
                severity: "success"
            })
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Ett fel inträffade vid återställning av lösenordet. Vänligen försök igen.",
                severity: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh"
            }}
        >
            <Typography variant="h1" sx={{ textAlign: "center", mb: 4, color: "primary.main" }}>
                SmartCalendar
            </Typography>
            <Box sx={{ width: "300px", textAlign: "center", mb: 2 }}>
                <Typography variant="h5" sx={{ textAlign: "center", }}>Återställ Ditt Lösenord</Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: "350px", mt: 2 }}>
                <TextField
                    label="Nytt Lösenord"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    sx={{ mb: 3 }}
                />
                <TextField
                    label="Bekräfta Lösenord"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    sx={{ mb: 3 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : "Återställ Lösenord"}
                </Button>
            </Box>
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

export default ResetPassword;