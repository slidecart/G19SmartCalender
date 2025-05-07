import {Box, Typography} from "@mui/material";
import Navbar from "./Navbar";

function Header(){
    
    return(
        <Box sx={{backgroundColor: "#0077ff7e", py: 0.5, display: "flex"}}>
            {/* Page title */}
            <Typography variant="h1" sx={{ mx: 1 }}>
                SmartCalendar
            </Typography>

            {/* Navbar alongside the page title */}
            <Navbar/>
        </Box>
    )
}

export default Header;