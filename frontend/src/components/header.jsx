import { Box, Typography } from "@mui/material";
import Navbar from "./navbar";

function Header(){
    
    return(
        <Box sx={{backgroundColor: "#0077ff7e", py: 1.5, display: "flex"}}>
            <Typography variant="h1" sx={{ mx: 1 }}>
                Smartcalendar
            </Typography>
            <Navbar/>
        </Box>
    )
}

export default Header;