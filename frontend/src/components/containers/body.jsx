import { Box } from "@mui/material";

function Body({children}){
    return(
        <Box sx={{display:"flex", justifyContent:"space-between", flexDirection:"column", minHeight:"108vh"}}>
            {children}
        </Box>
    )
    
}

export default Body;