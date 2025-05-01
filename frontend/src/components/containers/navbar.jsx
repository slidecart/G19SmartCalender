import { Box, List, ListItem } from "@mui/material";
import { useAuth } from "../../hooks/AuthContext";
import ProfileIcon from "./ProfilePopUpFrame";

function Navbar() {
    const { logoutAction } = useAuth();
    // Creates an array for every object inside the navbar
    const navItems = [
        { name: "Dagens agenda", link: "#" },
        { name: "Kalender", link: "#" },
        { name: "Task & ToDo", link: "#" },
        { name: "Inställningar", link: "#" },
    ];

    return (
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            {/* Creates a list of every object inside the navbar using the array NavItems */}
            <List sx={{ display: "flex", gap: 5, padding: 0 }}>
                {navItems.map((item, index) => (
                    <ListItem
                        button
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            transition: "none",
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                        }}
                    >
                        {/* Box as a component "a" to allow user to enter pages using links */}
                        <Box
                            component="a"
                            href={item.link}
                            sx={{
                                display: "flex",
                                textDecoration: "none",
                                whiteSpace: "nowrap",
                                textAlign: "center",
                                backgroundColor: "transparent",
                                color: "#444444",
                                transition: "all 0.5s",
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

            {/* Profile Icon */}
            <Box sx={{ marginLeft: "auto", marginRight: 2 }}>
                <ProfileIcon />
            </Box>
        </Box>
    );
}

export default Navbar;