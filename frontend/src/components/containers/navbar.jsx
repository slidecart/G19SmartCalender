import {Box, List, ListItem, Button, IconButton} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "./ProfilePopUpFrame";
import {useAuth} from "../../hooks/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const navItems = [
        { name: "Dagens agenda", link: "/today" },
        { name: "Kalender", link: "/today" },
        { name: "Task & ToDo", link: "#" },
        { name: "Inställningar", link: "#" },
    ];

    return (
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <List sx={{ display: "flex", gap: 5, padding: 0 }}>
                {navItems.map((item, index) => (
                    <ListItem
                        button
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            transition: "none",
                            "&:hover": { backgroundColor: "transparent" },
                        }}
                        onClick={() => navigate(item.link)}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                textDecoration: "none",
                                whiteSpace: "nowrap",
                                textAlign: "center",
                                backgroundColor: "transparent",
                                color: "#444444",
                                transition: "all 0.5s",
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "transparent",
                                    color: "black",
                                    fontSize: "18px",
                                },
                            }}
                        >
                            {item.name}
                        </Box>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ marginLeft: "auto", marginRight: 2 }}>
                <ProfileIcon />
            </Box>
        </Box>
    );
}

export default Navbar;