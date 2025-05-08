import React, { useState } from "react";
import {
    Box,
    ToggleButtonGroup,
    ToggleButton,
    FormControlLabel,
    Checkbox,
    Button,
    IconButton,
    Tooltip,
    useTheme
} from "@mui/material";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { useCalendarContext } from "../../context/CalendarContext";
import CreateCategoryDialog from "../CreateCategoryDialog";

export default function TopBar() {
    const theme = useTheme();
    const {
        categories,
        selectedCategories,
        toggleCategory,
        currentView,
        setCurrentView,
        openAddDialog
    } = useCalendarContext();

    const [openCreateCategoryDialog, setOpenCreateCategoryDialog] = useState(false);

    const handleViewChange = (_e, nextView) => {
        if (nextView) setCurrentView(nextView);
    };

    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 1,
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

            {/* Categories filter */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexWrap: 'nowrap'
                }}
            >
                {categories.map(cat => (
                    <FormControlLabel
                        key={cat.id}
                        control={
                            <Tooltip title={cat.name} arrow>
                                <Checkbox
                                    checked={selectedCategories.includes(cat.id)}
                                    onChange={() => toggleCategory(cat.id)}
                                    sx={{
                                        color: cat.color,
                                        '&.Mui-checked': { color: cat.color }
                                    }}
                                />
                            </Tooltip>
                        }
                        label={cat.name}
                        sx={{ whiteSpace: 'nowrap' }}
                    />
                ))}
                <Button
                    startIcon={<FilterListOutlinedIcon />}
                    onClick={() => setOpenCreateCategoryDialog(true)}
                    size="small"
                >
                    Skapa kategori
                </Button>
            </Box>

            {/* Spacer pushes add button to the right */}
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
