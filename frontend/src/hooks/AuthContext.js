import {createContext, useContext, useState} from "react";
import {Navigate, Outlet, useNavigate} from "react-router-dom";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    //const [user, setUser] = useState(null);
    const [accessToken, setAccToken] = useState(localStorage.getItem("accessToken") || "");
    const [refreshToken, setRefToken] = useState(localStorage.getItem("refreshToken") || "");
    const navigate = useNavigate();
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
                throw new Error(`Login failed: ${response.status} – ${response.statusText}`);
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

    const logOut = () => {
        setAccToken("");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");

    }
    return <AuthContext.Provider value ={{ accessToken, refreshToken, loginAction, logOut}}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};

export const PrivateRoute = () => {
    const accessToken = useAuth();
    if (!accessToken) return <Navigate to={"/login"} />;
    return <Outlet />;
};