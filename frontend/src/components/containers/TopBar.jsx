import React, { useState } from "react";
import {
    Box,
    ToggleButtonGroup,
    ToggleButton,
    IconButton,
    Menu,
    MenuItem,
    Checkbox,
    ListItemIcon,
    ListItemText,
    Button,
    Tooltip,
    useTheme, Divider
} from "@mui/material";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { useCalendarContext } from "../../context/CalendarContext";
import CreateCategoryDialog from "../CreateCategoryDialog";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {grey} from "@mui/material/colors"; // change

export default function TopBar() {
    const theme = useTheme();
    const {
        categories,
        selectedCategories,
        toggleCategory,
        currentView,
        setCurrentView,
        openAddDialog,
        resetFilter,
    } = useCalendarContext();

    const [openCreateCategoryDialog, setOpenCreateCategoryDialog] = useState(false);
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);

    const handleFilterOpen = (e) => setFilterAnchorEl(e.currentTarget);
    const handleFilterClose = () => setFilterAnchorEl(null);
    const handleViewChange = (_e, nextView) => nextView && setCurrentView(nextView);

    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 0,
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
                gap: 2,
                overflowX: 'auto'
            }}
        >
            {/* View toggle */}
            <ToggleButtonGroup
                value={currentView}
                exclusive
                onChange={handleViewChange}
                size="small"
            >
                <ToggleButton value="week" aria-label="Veckovy">
                    <CalendarTodayOutlinedIcon fontSize="small" />
                    <Box component="span" sx={{ ml: 0.5 }}>Veckovy</Box>
                </ToggleButton>
                <ToggleButton value="month" aria-label="Månadsvy">
                    <CalendarMonthOutlinedIcon fontSize="small" />
                    <Box component="span" sx={{ ml: 0.5 }}>Månadsvy</Box>
                </ToggleButton>
            </ToggleButtonGroup>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            {/* Categories filter menu */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Filter Categories" arrow>
                    <IconButton onClick={handleFilterOpen}>
                        <FilterListOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={filterAnchorEl}
                    open={Boolean(filterAnchorEl)}
                    onClose={handleFilterClose}
                >
                    <MenuItem
                        onClick={resetFilter}
                        sx={{
                            color: grey[600],
                        }}>
                        <ListItemIcon>
                            <CancelOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Rensa filter" />
                    </MenuItem>
                    <Divider />
                    {categories.map((cat) => (
                        <MenuItem key={cat.id} onClick={() => toggleCategory(cat.id)}>
                            <IconButton sx={{ p: 0 }}>
                                <Checkbox
                                    icon={<RadioButtonUncheckedOutlinedIcon sx={{ color: cat.color }} />}
                                    checkedIcon={<CheckCircleOutlinedIcon sx={{ color: cat.color }} />}
                                    checked={selectedCategories.includes(cat.id)}
                                    size="small"
                                    sx={{
                                        pl: 0,
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        display: "flex",
                                    }}
                                />
                            </IconButton>
                            <ListItemText primary={cat.name} />
                        </MenuItem>
                    ))}
                    <MenuItem
                        onClick={() => {
                            setOpenCreateCategoryDialog(true);
                            handleFilterClose();
                        }}
                    >
                        <ListItemIcon>
                            <AddCircleOutlineOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Skapa kategori" />
                    </MenuItem>
                </Menu>
                Filter
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Add Activity button */}
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutlineOutlinedIcon />}
                onClick={openAddDialog}
            >
                Lägg till
            </Button>

            <CreateCategoryDialog
                open={openCreateCategoryDialog}
                onClose={() => setOpenCreateCategoryDialog(false)}
            />
        </Box>
    );
}
