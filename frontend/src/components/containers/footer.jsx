import { Box, Typography } from "@mui/material";

function Footer(){

    return(
        <Box sx={{backgroundColor: "#0077ff7e", color: "white", py: 1, display: "flex", flexDirection: "column", minHeight: "10vh", textAlign: "center"}}>
            <Typography variant="h1">
            © 2025 Smartcalendar. All rights reserved.
            </Typography>

        </Box>
    )
}

export default Footer;