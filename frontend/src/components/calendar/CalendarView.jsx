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
        openAddDialog,
        openEditDialog,
        deleteActivity,
        isAddEditDialogOpen,
        isViewDialogOpen,

    } = useCalendarContext();

    const [currentView, setCurrentView] = useState("week");


    return (
        <Paper elevation={3} sx={{ p:2 }}>
            <Box display="flex" justifyContent={"flex-end"} mb={2}>

                {/* Buttons for changing views */}
                <ButtonGroup variant="contained" size="small">
                    <Button onClick={() => setCurrentView("week")} color={currentView === "week" ? "primary" : "inherit"}>
                        Veckovy
                    </Button>
                    <Button onClick={() => setCurrentView("month")} color={currentView === "month" ? "primary" : "inherit"}>
                        Månadsvy
                    </Button>
                </ButtonGroup>
            </Box>

            {/* Sets view to week */}
            {currentView === "week" && (
                <WeeklyCalendar

                />
            )}


            {currentView === "month" && (
                <MonthlyCalendar

                />
            )}

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
        </Paper>
    )
}

export default CalendarView;