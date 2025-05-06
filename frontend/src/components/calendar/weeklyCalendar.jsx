import { Box, Typography, TableContainer, Paper, Button, Container } from "@mui/material";
import dayjs from "dayjs";
import {useEffect, useMemo, useState} from "react";
import CalendarGrid from "./../calendar/CalendarGrid"
import AddActivity from "./../calendar/AddActivity";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ActivityDialog from "./ActivityDialog";
import ConfirmationDialog from "../ConfirmationDialog";

import { useCalendar} from "../../hooks/calendar/CalendarHooks";


function WeeklyCalendar() {
    const {
        // dates
        startOfWeek,
        setStartOfWeek,
        currentYear,
        weekdays,
        timeSlots,

        // activities
        activities,
        error,

        // add/edit dialog
        isDialogOpen,
        dialogMode,
        formData,
        openAddDialog,
        openEditDialog,
        handeCloseDialog,
        handleCellClick,
        handleChange,
        handleSubmit,

        // view/delete dialog
        selectedActivity,
        activityDialogOpen,
        setActivityDialogOpen,
        handleActivityClick,
        confirmDeleteOpen,
        setConfirmationDeleteOpen,
        requestDelete,
        handleDelete,

        // categories
        categories,
        createCategory,
    } = useCalendar();

        
    return(
        <Container sx={{my:2}}>
            <Box display="flex" justifyContent={"space-between"} mb={1}>
                {/* Button changing visible week to previous */}
                <Button variant="contained"  size="small" onClick={() => setStartOfWeek(prev => prev.subtract(1, "week"))}>
                    <ArrowBackIcon fontSize="small"/>
                </Button>

                {/* Headtitle for calender */}
                <Typography variant="h6" sx={{textAlign:"center"}}>
                    Veckokalender - {startOfWeek.format("YYYY")} {/* Shows year based on week */}
                </Typography>

                {/* Button changing visible week to next */}
                <Button variant ="contained" size="small" onClick={() => setStartOfWeek(prev => prev.add(1, "week"))}>
                    <ArrowForwardIcon fontSize="small"/>
                </Button>

            </Box>


            {/* Shows calendar */}
            <TableContainer component ={Paper} elevation="2" sx={{height:"fit-content"}}>
                <CalendarGrid
                    activities = {activities}
                    categories = {categories}
                    weekdays = {weekdays}
                    timeSlots = {timeSlots}
                    onActivityClick = {handleActivityClick} // Shows activity when clicked
                    onCellClick={handleCellClick}
                />
            </TableContainer>

            {/* Button for adding activities */}
            <Box display="flex" justifycontent="flex-end" mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openAddDialog()} // Dialog appears
                >
                    Lägg till
                </Button>
            </Box>

            {/* Shows dialog in create mode*/}
            <AddActivity
                open={isDialogOpen}
                onClose={handeCloseDialog}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                categories={categories}
                onCreateCategory={createCategory}
                mode={dialogMode} // "add" or "edit"
            />

            {/* Shows activity when clicked */}
            {selectedActivity && (
                <ActivityDialog
                    open={activityDialogOpen}
                    onClose={() => setActivityDialogOpen(false)} // Closes activity dialog
                    activity={selectedActivity}
                    onEdit={() => openEditDialog(selectedActivity)} // Opens edit dialog
                    onDelete={() => requestDelete(selectedActivity)} // Deletes activity
                />
            )}

            {/* Shows confirmation dialog for delete */}
            {confirmDeleteOpen && (
                <ConfirmationDialog
                    open={confirmDeleteOpen}
                    onClose={() => setConfirmationDeleteOpen(false)}
                    onConfirm={handleDelete}
                    title="Bekräfta borttagning"
                    content="Är du säker på att du vill ta bort aktiviteten?"
                />
            )}
            {/* Shows error message if any */}
        </Container>
    );
}

export default WeeklyCalendar;