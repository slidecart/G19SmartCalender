import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, Checkbox, FormControlLabel } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";


/** TODO: Change and implement the sidebar to be a filter for the calendar */
export default function AppSidebar({ categories, selectedCategories, onCategoryToggle }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sidebar rtl collapsed={collapsed}>
            <Menu iconShape="square">

                {/* Single toggle */}
                <MenuItem onClick={() => setCollapsed(!collapsed)}>
                    {!collapsed ? (
                        <MenuOutlinedIcon />
                    ) : (
                        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                            <Typography variant="h6">Filters</Typography>
                            <IconButton size="small"><MenuOutlinedIcon /></IconButton>
                        </Box>
                    )}
                </MenuItem>

                <SubMenu title="Categories" icon={<FilterListIcon />}>
                    {categories.map(cat => (
                        <FormControlLabel
                            key={cat.id}
                            control={
                                <Checkbox
                                    checked={selectedCategories.includes(cat.id)}
                                    onChange={() => onCategoryToggle(cat.id)}
                                    size="small"
                                />
                            }
                            label={cat.name}
                            sx={{ pl: 2 }}
                        />
                    ))}
                </SubMenu>
            </Menu>
        </Sidebar>
    );
}
