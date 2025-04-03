import { Box, List, ListItem } from "@mui/material";


function Navbar() {
    //Skapa en array med objekten för navbar-alternativen
    const navItems = [
        { name: "Dagens agenda", link:"#"},
        { name: "Kalender", link:"#"},
        { name: "Task & ToDo", link: "#" },
        { name: "Inställningar", link: "#" }
    ];

    return(
        <Box sx={{ display:"flex"}}>
            <List sx={{ display: "flex", gap: 5}}>
                {navItems.map((item,index) => (
                    <ListItem button key={index} sx={{display:"flex", justifyContent:"Center", transition: "none", "&:hover":{
                        backgroundColor: "transparent"
                    }}}>
                        <Box component="a" href={item.link} sx={{ display:"flex", textDecoration:"none", whiteSpace:"nowrap", textAlign:"center", backgroundColor:"transparent", color: "#444444", transition:"all 0.5s", "&:hover":{
                            backgroundColor: "transparent", color:"black", fontSize:"18px"
                        }}}>
                            {item.name}
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default Navbar;