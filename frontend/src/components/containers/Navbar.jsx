import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import ProfileIcon from "./ProfilePopUpFrame";

export default function Navbar() {
    const theme = useTheme();

    return (
        <Box
            component="header"
            sx={{
                display: "flex",
                alignItems: "center",
                height: 48,
                px: 2,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                boxShadow: `0 1px 2px ${theme.palette.divider}`,
                zIndex: theme.zIndex.appBar
            }}
        >
            {/* Smaller title */}
            <Typography
                variant="h6"
                noWrap
                sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    letterSpacing: ".05rem"
                }}
            >
                SmartCalendar
            </Typography>

            {/* Spacer pushes profile icon to the right */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Profile icon stays on right */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <ProfileIcon />
            </Box>
        </Box>
    );
}
