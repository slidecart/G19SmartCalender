import { Box, List, ListItem, Button } from "@mui/material";
import {useAuth} from "../../hooks/AuthContext";


function Navbar() {
    const { logoutAction } = useAuth();
    // Creates an array for every object inside the navbar
    const navItems = [
        { name: "Dagens agenda", link:"#"},
        { name: "Kalender", link:"#"},
        { name: "Task & ToDo", link: "#" },
        { name: "Inställningar", link: "#" }
    ];

    return(
        <Box sx={{ display:"flex"}}>

            {/* Creates a list of every object inside the navbar using the array NavItems */}
            <List sx={{ display: "flex", gap: 5}}>
                {navItems.map((item,index) => (
                    <ListItem button key={index} sx={{display:"flex", justifyContent:"Center", transition: "none", "&:hover":{
                        backgroundColor: "transparent"
                    }}}>

                        {/* Box as a component "a" to allow user to enter pages using links */}
                        <Box component="a" href={item.link} sx={{ display:"flex", textDecoration:"none",
                            whiteSpace:"nowrap", textAlign:"center", backgroundColor:"transparent", color: "#444444", transition:"all 0.5s",
                            "&:hover":{ backgroundColor: "transparent", color:"black", fontSize:"18px"
                        }}}>
                            {item.name}
                        </Box>
                    </ListItem>
                ))}

                {/*Logout button*/}
                <ListItem>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={logoutAction}
                        sx={{ textTransform: "none" }}
                    >
                        Logga ut
                    </Button>
                </ListItem>
            </List>
        </Box>
    )
}

export default Navbar;