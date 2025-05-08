// Sidebar.jsx (in /components/containers/)
import React, { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
    Box,
    IconButton,
    Typography,
    Checkbox,
    FormControlLabel,
    useTheme, colors, Divider, ToggleButtonGroup, ToggleButton, Tooltip
} from "@mui/material";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';


import {useCalendarContext} from "../../context/CalendarContext";
import CreateCategoryDialog from "../CreateCategoryDialog";



export default function Sidebar() {
    const {
        categories,
        selectedCategories,
        toggleCategory,
        setCurrentView,
        currentView,
        openAddDialog,
    } = useCalendarContext();

    const [openCreateCategoryDialog, setOpenCreateCategoryDialog] = useState(false);

    const theme = useTheme();
    const [collapsed, setCollapsed] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const toggleSidebar = () => {
        if (!collapsed) {
            // close submenu and delay the collapse for smooth transition
            setSubmenuOpen(false);
            setTimeout(() => {
                setCollapsed(true);
            }, 100);
        } else {
            // simply expand the sidebar when collapsed
            setCollapsed(false);
        }
    };

    const handleViewChange = (_e, next) => {
        if (next) setCurrentView(next);
    };

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.blue} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={collapsed} width={"170px"} collapsedWidth={"50px"}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={toggleSidebar}
                        icon={collapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 15px 20px 0",
                            color: colors.grey[800],
                            p: 1,
                        }}
                    >
                        {!collapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="0px"
                                mr="15px"
                            >
                                <IconButton onClick={toggleSidebar}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Divider />

                    {/* View toggle */}
                    <Box sx={{ textAlign: "center", py: 1 }}>
                        <ToggleButtonGroup
                            orientation="vertical"
                            value={currentView}
                            exclusive
                            onChange={handleViewChange}
                            size="small"
                        >
                            <ToggleButton
                                value="week"
                                aria-label="Veckovy"
                                sx={{ p: 1 }}
                            >
                                <CalendarTodayOutlinedIcon />
                                {!collapsed && <Typography sx={{ ml: 1 }}>Veckovy</Typography>}
                            </ToggleButton>
                            <ToggleButton
                                value="month"
                                aria-label="Månadsvy"
                                sx={{ p: 1 }}
                            >
                                <CalendarMonthOutlinedIcon />
                                {!collapsed && <Typography sx={{ ml: 1 }}>Månadsvy</Typography>}
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Divider />

                    {/* Categories */}
                    <SubMenu
                        label={!collapsed ? "Kategorier" : ""}
                        open={submenuOpen}
                        onClick={() => setSubmenuOpen(!submenuOpen)}
                        icon={<FilterListOutlinedIcon />}
                    >
                        {categories.map(cat =>
                            collapsed ? (
                                <Tooltip key={cat.id} title={cat.name} placement="right" arrow>
                                    <IconButton
                                        onClick={() => toggleCategory(cat.id)}
                                        sx={{ p: 0 }}
                                    >
                                        <Checkbox
                                            icon={<RadioButtonUncheckedOutlinedIcon sx={{ color: cat.color }} />}
                                            checkedIcon={<CheckCircleOutlinedIcon sx={{ color: cat.color }} />}
                                            checked={selectedCategories.includes(cat.id)}
                                            size="small"
                                            sx={{ p: 0 }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <FormControlLabel
                                    key={cat.id}
                                    control={
                                        <Tooltip title={cat.name} placement="right" arrow>
                                            <Checkbox
                                                icon={<RadioButtonUncheckedOutlinedIcon sx={{ color: cat.color }} />}
                                                checkedIcon={<CheckCircleOutlinedIcon sx={{ color: cat.color }} />}
                                                checked={selectedCategories.includes(cat.id)}
                                                onChange={() => toggleCategory(cat.id)}
                                                size="small"
                                                sx={{ mr: 1 }}
                                            />
                                        </Tooltip>
                                    }
                                    label={cat.name}
                                    sx={{
                                        pl: 2,
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        display: "flex",
                                    }}
                                />
                            )
                        )}
                        <Divider />
                        <MenuItem
                            onClick={() => {
                                setOpenCreateCategoryDialog(true);
                            }}
                        >
                            <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                                Skapa ny kategori
                            </Box>
                        </MenuItem>
                    </SubMenu>
                </Menu>
                <Divider />
                {/* spacer pushes the add‐button to the bottom */}
                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ textAlign: "center",pb: 2 }}>
                    <Menu>
                        <Tooltip title="Lägg till aktivitet" placement="left" arrow>
                            <MenuItem
                                onClick={openAddDialog}
                                icon={(
                                    <AddCircleOutlineOutlinedIcon
                                        fontSize="large"
                                        sx={{ color: colors.grey[800] }}
                                    />
                                )}
                                sx={{
                                    fontSize: "1.1rem",
                                    py: 1.5,
                                    "& .pro-inner-item": {
                                        justifyContent: "center"
                                    },
                                    "&:hover": {
                                        backgroundColor: colors.grey[200]
                                    }
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: colors.grey[800], ml: 1 }}
                                >
                                    Lägg till
                                </Typography>
                            </MenuItem>
                        </Tooltip>
                    </Menu>
                </Box>
                <CreateCategoryDialog
                    open={openCreateCategoryDialog}
                    onClose={() => setOpenCreateCategoryDialog(false)}
                />
            </ProSidebar>
        </Box>
    );
}
