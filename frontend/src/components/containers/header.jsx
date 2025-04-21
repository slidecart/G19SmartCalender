import { Box, Typography } from "@mui/material";
import Navbar from "./navbar";

function Header(){
    
    return(
        <Box sx={{backgroundColor: "#0077ff7e", py: 0.5, display: "flex"}}>
            <Typography variant="h1" sx={{ mx: 1 }}>
                SmartCalendar
            </Typography>
            <Navbar/>
        </Box>
    )
}

export default Header;