import React from "react";
import {
    Box,
    Button,
    Container,
    Paper,
    TableContainer,
    Typography
} from "@mui/material";
import ArrowBackIcon  from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import CalendarGrid     from "./CalendarGrid";
import AddActivity      from "./AddActivity";
import ActivityDialog   from "./ActivityDialog";
import ConfirmationDialog from "../ConfirmationDialog";
import Sidebar          from "./AppSidebar";

import { useCalendarContext } from "../../context/CalendarContext";

const WeeklyCalendar = () => {
    const {
        /* dates */
        startOfWeek,
        setStartOfWeek,


        /* activities */
        selectedActivity,
        setSelectedActivity,

        /* form data */
        formData,

        /* dialogs */
        handleCloseDialog,
        dialogMode,
        confirmDeleteOpen,
        setConfirmDeleteOpen,
        openAddDialog,
        openEditDialog,
        deleteActivity,
        isAddEditDialogOpen,
        isViewDialogOpen,

    } = useCalendarContext();


    /* ---------- render ---------- */
    return (
        <Container sx={{ my: 2 }}>
            {/* week nav */}
            <Box display="flex" justifyContent="space-between" mb={1}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => setStartOfWeek((d) => d.subtract(1, "week"))}
                >
                    <ArrowBackIcon fontSize="small" />
                </Button>

                <Typography variant="h6" textAlign="center">
                    Veckokalender – {startOfWeek.format("YYYY")}
                </Typography>

                <Button
                    variant="contained"
                    size="small"
                    onClick={() => setStartOfWeek((d) => d.add(1, "week"))}
                >
                    <ArrowForwardIcon fontSize="small" />
                </Button>
            </Box>

            {/* calendar */}
            <Box display="flex" gap={2}>
                <Box flexGrow={1}>
                    <TableContainer component={Paper} elevation={2}>
                        <CalendarGrid />
                    </TableContainer>
                </Box>
            </Box>

            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button variant="contained" onClick={() => openAddDialog()}>
                    Lägg till
                </Button>
            </Box>

            {/* dialogs */}
            <AddActivity
                open={isAddEditDialogOpen}
                formData={formData}
                mode={dialogMode}
                onClose={handleCloseDialog}
            />

            <ActivityDialog
                open={isViewDialogOpen}
                activity={selectedActivity}
                onClose={handleCloseDialog}
                onEdit={() => {openEditDialog(selectedActivity)}}
                onDelete={() => setConfirmDeleteOpen(true)}
            />

            <ConfirmationDialog
                open={confirmDeleteOpen}
                title="Bekräfta borttagning"
                content="Är du säker på att du vill ta bort aktiviteten?"
                onClose={() => setConfirmDeleteOpen(false)}
                onConfirm={() => {
                    deleteActivity(selectedActivity.id);
                    setConfirmDeleteOpen(false);
                    setSelectedActivity(null);
                }}
            />
        </Container>
    );
};

export default WeeklyCalendar;
