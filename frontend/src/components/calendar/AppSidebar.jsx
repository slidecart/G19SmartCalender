import {Menu, MenuItem, Sidebar as ProSidebar, SubMenu} from "react-pro-sidebar";
import {Box, Checkbox, FormControlLabel, IconButton, Typography} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import {useCalendarContext} from "../../context/CalendarContext";
import React from "react";

const Sidebar = () => {
    const {
        categories,
        selectedCategories,
        toggleCategory
    } = useCalendarContext();

    const [open, setOpen] = React.useState(true);

    return (
        <Box
            sx={{
                position: "fixed",
                right: 0,
                top: 64,          /* height of navbar */
                height: "calc(100% - 64px)",
                zIndex: 1200,
                boxShadow: 3
            }}
        >
            <ProSidebar collapsed={!open} rtl>
                <Menu>
                    <MenuItem onClick={() => setOpen((o) => !o)}>
                        <IconButton size="small"><MenuOutlinedIcon /></IconButton>
                        {open && <Typography ml={1}>Filter</Typography>}
                    </MenuItem>

                    <SubMenu title={open ? "Kategorier" : ""} icon={<FilterListIcon />}>
                        {categories.map((cat) => (
                            <FormControlLabel
                                key={cat.id}
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={selectedCategories.includes(cat.id)}
                                        onChange={() => toggleCategory(cat.id)}
                                    />
                                }
                                label={open ? cat.name : ""}
                                sx={{ pl: open ? 2 : 0 }}
                            />
                        ))}
                    </SubMenu>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
