import { Box } from "@mui/material";
import Header from "./../containers/header";
import Footer from "./../containers/footer";

function Body({children}){
    return(
        <Box sx={{display:"flex", justifyContent:"space-between", flexDirection:"column", minHeight:"108vh"}}>
            <Header/>
            {children}
            <Footer/>
        </Box>
    )
    
}

export default Body;