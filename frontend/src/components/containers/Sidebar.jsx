import React from "react";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        { label: "Hem", icon: <HomeOutlinedIcon />, path: "/" },
        { label: "Dagens agenda", icon: <CalendarTodayOutlinedIcon />, path: "/today" },
        { label: "Uppgifter", icon: <ListAltOutlinedIcon />, path: "/taskTodoPage" },
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
            {items.map((item) => {
                const active = location.pathname === item.path;
                return (
                    <Tooltip key={item.path} title={item.label} placement="left">
                        <IconButton
                            color={active ? "primary" : "default"}
                            onClick={() => navigate(item.path)}
                            sx={{ mb: 1 }}
                        >
                            {item.icon}
                        </IconButton>
                    </Tooltip>
                );
            })}
        </Box>
    );
}
