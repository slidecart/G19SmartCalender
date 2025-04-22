import { Box } from "@mui/material";
import Header from "./../containers/header";
import Footer from "./../containers/footer";

function Body({children}){

    {/* 
        Base structure used for everypage. 
        Allows every page to have the header with navbar and footer
        while still allowing children inside the structure.
    */}

    return(
        <Box sx={{display:"flex", justifyContent:"space-between", flexDirection:"column", minHeight:"108vh"}}> 
            <Header/>
            {children}
            
            <Footer/>
        </Box>
    )
    
}

export default Body;