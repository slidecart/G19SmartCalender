import {useEffect, useRef, useState} from "react";
import { useSearchParams } from "react-router-dom";
import {Box, Button, CircularProgress, Typography} from "@mui/material";
import { fetchData } from "../hooks/FetchData";

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const uid = searchParams.get("uid");
    const otp = searchParams.get("otp");
    const [message, setMessage] = useState("Verifying your email...");
    const [isVerifying, setIsVerifying] = useState(false);
    const [showRedirect, setShowRedirect] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const hasVerified = useRef(false); // Prevent double execution

    useEffect(() => {
        if (hasVerified.current) {
            console.log("Verifiering redan försökt, hoppar över.");
            return;
        }

        if (!uid || !otp) {
            setMessage("Ogiltig verifieringslänk. Vänligen kontrollera din e-post och försök igen.");
            setIsVerifying(false);
            return;
        }

        console.log("Utlöser e-postverifiering för uid:", uid);
        hasVerified.current = true;
        setIsVerifying(true);
        verifyEmail(uid, otp);

    }, [uid, otp]);

    const verifyEmail = async (uid, otp) => {
        try {
            const uidNumber = parseInt(uid, 10);

            if (isNaN(uidNumber)) {
                throw new Error("Ogiltig användare");
            }

            const data = await fetchData(`auth/verify?uid=${uidNumber}&otp=${otp}`, "PUT", null, true);

            setUserEmail(data.email || "");
            setMessage(data.message || "E-postadressen har verifierats.");

            if (data.message === "E-postadressen har verifierats.") {
                setShowRedirect(true);
                setTimeout(() => {
                    handleLoginRedirect();
                }, 2000);
            }

        } catch (error) {
            console.error("Verifiering misslyckades", error);

            let errorData;
            try {
                errorData = JSON.parse(error.message.split("HTTP 400: ")[1] || "{}");
            } catch (parseError) {
                console.error("Misslyckades med att analysera felsvaret", parseError);
                errorData = {};
            }

            setUserEmail(errorData.email || "");

            // Handle specific error messages
            if (error.message.includes("E-postadressen är redan verifierad")) {
                setMessage("E-postadressen är redan verifierad. Du kan logga in nu.");
            } else if (error.message.includes("Ogiltig otp")) {
                setMessage("Verifieringslänken är ogiltig eller har redan använts. Vänligen begär en ny verifieringslänk.");
            } else if (error.message.includes("Ogiltig användare")) {
                setMessage("Ogiltig verifieringslänk. Vänligen kontrollera din e-post och försök igen.");
            } else {
                setMessage("Verifiering misslyckades. Vänligen försök igen.");
            }
        } finally {
            setIsVerifying(false);
        }
    };

    const resendVerificationEmail = async () => {

        if (!userEmail) {
            setMessage("Ingen e-postadress tillgänglig för att skicka verifieringslänken.");
            return;
        }

        setIsResending(true);
        try {
            const data = await fetchData(`auth/resend-verification?email=${encodeURIComponent(userEmail)}`, "POST", null, true);
            setMessage(data.message || "Verifieringslänk har skickats till din e-postadress.");
        } catch (error) {
            console.error("Verifiering av återsändning misslyckades", error);
            setMessage("Misslyckades med att skicka ett nytt verifieringsmeddelande: " + error.message);
        } finally {
            setIsResending(false);
        }
    };

    const handleRetry = () => {
        if (uid && otp) {
            setIsVerifying(true);
            setMessage("Verifierar din e-post...");
            hasVerified.current = false;
            verifyEmail(uid, otp);
        }
    };

    const handleLoginRedirect = () => {
        window.location.href = "/login";
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh" }}>
            {/* SmartCalendar Title */}
            <Typography
                variant="h1"
                sx={{
                    textAlign: "center",
                    mb: 4,
                    color: "primary.main",
                }}
            >
                SmartCalendar
            </Typography>

            {/* Verification Content */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                {isVerifying ? (
                    <CircularProgress />
                ) : showRedirect ? (
                    <>
                        <Typography variant="h5">E-postadressen har verifierats</Typography>
                        <CircularProgress sx={{ mt: 2 }} />
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Omdirigerar till inloggning...
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="h5">{message}</Typography>
                        {message.includes("E-postadressen är redan verifierad") ? (
                            <Button variant="contained" onClick={handleLoginRedirect} sx={{ mt: 2 }}>
                                Logga in
                            </Button>
                        ) : message.includes("Ogiltig") ? (
                            <Button variant="contained" onClick={resendVerificationEmail} sx={{ mt: 2 }}>
                                Skicka verifieringslänk igen
                            </Button>
                        ) : message.includes("Verifiering misslyckades") ? (
                            <Button variant="contained" onClick={handleRetry} sx={{ mt: 2 }}>
                                Försök igen
                            </Button>
                        ) : null}
                    </>
                )}
            </Box>
        </Box>
    );
}

export default VerifyEmail;