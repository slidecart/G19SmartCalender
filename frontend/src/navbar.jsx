import { Box, List, ListItem } from "@mui/material";


function Navbar() {
    //Skapa en array med objekten för navbar-alternativen
    const navItems = [
        {name: "Dagens agenda", link:"#"},
        {name: "Kalender", link:"#"},
        { name: "Task & ToDo", link: "#" },
        { name: "Inställningar", link: "#" }
    ];

    return(
        <Box sx={{ display:"flex", width:"27vw"}}>
            <List sx={{ display: "flex"}}>
                {navItems.map((item,index) => (
                    <ListItem button key={index} sx={{display:"flex", justifyContent:"Center", width: "10vw", paddingLeft:"8px", paddingRight:"8px"}}>
                        <Box component="a" href={item.link} sx={{backgroundColor: "#0077ff7e", display:"flex", textDecoration:"none", color:"black", backgroundColor:"none"}}>
                            {item.name}
                        </Box>
                    </ListItem>
                ))}
            </List>

        </Box>
    )
}

export default Navbar;