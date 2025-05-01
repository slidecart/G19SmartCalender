import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import {
    Dialog,
    DialogContent,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton,
    Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ProfilePopUpFrame({ open, onClose, anchorEl }) {
    const { logoutAction } = useAuth();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        onClose();
        navigate(path);
    };

    const handleLogout = () => {
        onClose();
        logoutAction();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    minWidth: "200px",
                    position: "absolute",
                    top: anchorEl ? anchorEl.getBoundingClientRect().bottom + 10 : 0,
                    right: anchorEl
                        ? window.innerWidth - anchorEl.getBoundingClientRect().right + 10
                        : 0,
                    margin: 0,
                    borderRadius: "4px 0 4px 4px",
                    backgroundColor: "white",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                },
            }}
        >
            <DialogContent sx={{ p: 0 }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation("/account-settings")}>
                            <ListItemText primary="Account settings" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation("/system-settings")}>
                            <ListItemText primary="System settings" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemText primary="Log out" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    );
}

function ProfileIcon() {
    const [open, setOpen] = useState(false);
    const iconRef = useRef(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <IconButton
                onClick={handleOpen}
                ref={iconRef}
                sx={{ p: 0 }}
            >
                <AccountCircleIcon sx={{ fontSize: 40, color: "#444444" }} />
            </IconButton>
            <ProfilePopUpFrame
                open={open}
                onClose={handleClose}
                anchorEl={iconRef.current}
            />
        </Box>
    );
}

export default ProfileIcon;