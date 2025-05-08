import {useState} from "react";
import {Box, Button, ButtonGroup, Paper} from "@mui/material";
import WeeklyCalendar from "./views/weekly/WeeklyCalendar";
import MonthlyCalendar from "./views/monthly/MonthlyCalendar";
import AddActivity from "./AddActivity";
import ActivityDialog from "./ActivityDialog";
import ConfirmationDialog from "../ConfirmationDialog";
import {useCalendarContext} from "../../context/CalendarContext";

function CalendarView(){
    const {
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
        openEditDialog,
        deleteActivity,
        isAddEditDialogOpen,
        isViewDialogOpen,

        //view
        currentView,

    } = useCalendarContext();

    const chromeHeight = 48 + 56; // Navbar + TopBar height

    return (
        <Paper
            elevation={3}
            sx={{
                height: `calc(100vh - ${chromeHeight}px)`,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}>

            {/* Sets view to week */}
            {currentView  === "week" ? (
                <WeeklyCalendar containerHeight={8} chromeHeight={chromeHeight}/>
            ) : (
                <MonthlyCalendar chromeHeight={chromeHeight} />
            )}


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
        </Paper>
    )
}

export default CalendarView;