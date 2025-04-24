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
            console.log("Verification already attempted, skipping.");
            return;
        }

        if (!uid || !otp) {
            setMessage("Invalid verification link.");
            setIsVerifying(false);
            return;
        }

        console.log("Triggering email verification for uid:", uid);
        hasVerified.current = true;
        setIsVerifying(true);
        verifyEmail(uid, otp);

    }, [uid, otp]);

    const verifyEmail = async (uid, otp) => {
        try {
            const uidNumber = parseInt(uid, 10);

            if (isNaN(uidNumber)) {
                throw new Error("Invalid user ID format");
            }

            const data = await fetchData(`auth/verify?uid=${uidNumber}&otp=${otp}`, "PUT", null, true);

            setUserEmail(data.email || "");
            setMessage(data.message || "Email verified successfully");

            if (data.message === "Email verified successfully") {
                setShowRedirect(true);
                setTimeout(() => {
                    handleLoginRedirect();
                }, 2000);
            }

        } catch (error) {
            console.error("Verification failed", error);

            let errorData;
            try {
                errorData = JSON.parse(error.message.split("HTTP 400: ")[1] || "{}");
            } catch (parseError) {
                console.error("Failed to parse error response", parseError);
                errorData = {};
            }

            setUserEmail(errorData.email || "");

            // Handle specific error messages
            if (error.message.includes("Email already verified")) {
                setMessage("Email already verified. Please log in.");
            } else if (error.message.includes("Invalid or expired OTP")) {
                setMessage("Invalid or expired OTP. Please request a new verification email.");
            } else if (error.message.includes("Invalid user ID format")) {
                setMessage("Invalid verification link.");
            } else {
                setMessage("Verification failed. Please try again.");
            }
        } finally {
            setIsVerifying(false);
        }
    };

    const resendVerificationEmail = async () => {

        if (!userEmail) {
            setMessage("Unable to resend verification email: Email address not available.");
            return;
        }

        setIsResending(true);
        try {
            const data = await fetchData(`auth/resend-verification?email=${encodeURIComponent(userEmail)}`, "POST", null, true);
            setMessage(data.message || "Verification email resent successfully");
        } catch (error) {
            console.error("Resend verification failed", error);
            setMessage("Failed to resend verification email: " + error.message);
        } finally {
            setIsResending(false);
        }
    };

    const handleRetry = () => {
        if (uid && otp) {
            setIsVerifying(true);
            setMessage("Verifying your email...");
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
                        <Typography variant="h5">Email verified successfully</Typography>
                        <CircularProgress sx={{ mt: 2 }} />
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Redirecting to login page...
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="h5">{message}</Typography>
                        {message.includes("Email already verified") ? (
                            <Button variant="contained" onClick={handleLoginRedirect} sx={{ mt: 2 }}>
                                Log in
                            </Button>
                        ) : message.includes("Invalid") ? (
                            <Button variant="contained" onClick={resendVerificationEmail} sx={{ mt: 2 }}>
                                Resend Verification Email
                            </Button>
                        ) : message.includes("Verification failed") ? (
                            <Button variant="contained" onClick={handleRetry} sx={{ mt: 2 }}>
                                Retry Verification
                            </Button>
                        ) : null}
                    </>
                )}
            </Box>
        </Box>
    );
}

export default VerifyEmail;