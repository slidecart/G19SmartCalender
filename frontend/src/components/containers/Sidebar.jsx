import React, {useState} from "react";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ChecklistRtlOutlinedIcon from '@mui/icons-material/ChecklistRtlOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ConfirmationDialog from "../ConfirmationDialog";


export default function Sidebar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const { logoutAction } = useAuth();

    const [confirmLogoutOpen, setConfirmLogoutOpen] = useState(false);
    const handleLogout = () => {

        logoutAction();
    }

    const items = [
        { label: "Hem", icon: <HomeOutlinedIcon />, path: "/today" },
        { label: "Kalender", icon: <CalendarTodayOutlinedIcon />, path: "/calendar" },
        { label: "ToDo", icon: <ChecklistRtlOutlinedIcon />, path: "/toDo" },
        { label: "Inställningar", icon: <SettingsOutlinedIcon />, path: "/account-settings" }
    ];

    return (
        <Box
            component="nav"
            sx={{
                position: 'fixed',
                top: theme.mixins.toolbar.minHeight, // flush under navbar
                right: 0,
                bottom: 0,
                width: 56,
                bgcolor: theme.palette.background.paper,
                borderLeft: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                py: 0,
                zIndex: theme.zIndex.drawer // above content
            }}
        >
            <Box sx={{ flexGrow: 1, ml: 1}}>

                {items.map((item) => {
                    const active = location.pathname === item.path;
                    return (
                        <Tooltip key={item.path} title={item.label} placement="left">
                            <IconButton
                                onClick={() => navigate(item.path)}
                                sx={{
                                    mb: 2,
                                    color: active ? "primary.contrastText" : "text.secondary",
                                    backgroundColor: active ? "primary.main" : "transparent",
                                    "&:hover": {
                                        backgroundColor: active ? "primary.light" : "ccc",
                                    }
                                }}
                            >
                                {item.icon}
                            </IconButton>
                        </Tooltip>
                    );
                })}
            </Box>
            {/* Logout button at the bottom */}
            <Box sx={{ mb: 2 }}>
                <Tooltip title="Logga ut" placement="left">
                    <IconButton
                        onClick={() => setConfirmLogoutOpen(true)}
                        sx={{
                            color: "text.secondary",
                            "&:hover": {
                                color: "error.main",
                            }
                        }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            <ConfirmationDialog
                open={confirmLogoutOpen}
                onClose={() => setConfirmLogoutOpen(false)}
                onConfirm={async () => {
                    handleLogout();
                    setConfirmLogoutOpen(false);
                }}
                title="Logga ut"
                content="Är du säker på att du vill logga ut?"
                buttonText="Logga ut"
            />

        </Box>
    );
}
