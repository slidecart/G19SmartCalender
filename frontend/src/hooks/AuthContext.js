import {createContext, useContext, useState} from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    //const [user, setUser] = useState(null);
    const [accessToken, setAccToken] = useState(localStorage.getItem("accessToken") || "");
    const [refreshToken, setRefToken] = useState(localStorage.getItem("refreshToken") || "");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const loginAction = async (data) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                setErrorMessage("Fel användarnamn eller lösenord.");

                // Clear the error message after 5 seconds
                setTimeout(() => {
                    setErrorMessage("");
                }, 10000);
                return;
            }

            const res = await response.json();
            //setUser(res.user);
            setAccToken(res.accessToken);
            setRefToken(res.refreshToken);
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            navigate("/today");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const errorBox = () => {
        if (!errorMessage) {
            return null;
        }

        return (
            <Box sx={{ maxWidth: "350px", width: "100%" }}>
                <Paper elevation={2} sx={{ padding: 1.5, backgroundColor: "#FFECB3", color: "#795548" }}>
                    <Typography variant="body1">{errorMessage}</Typography>
                </Paper>
            </Box>
        );
    }

    const logoutAction = () => {
        setAccToken("");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");

    }
    return <AuthContext.Provider value ={{ accessToken, refreshToken, loginAction, logoutAction, errorBox}}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};

export const PrivateRoute = () => {
    const { accessToken } = useAuth();
    return accessToken
        ? <Outlet />
        : <Navigate to="/login" replace />;
};