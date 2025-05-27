import {Box, Container, Typography, Paper, Button} from "@mui/material";
import CurrentDay from "./CurrentDay";
import NextDay from "./NextDay";
import {useCalendarContext} from "../../context/CalendarContext";
import AddActivity from "../calendar/AddActivity";
import ActivityDialog from "../calendar/ActivityDialog";
import ConfirmationDialog from "../ConfirmationDialog";
import dayjs from "dayjs";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {timeSlots} from "../../data/calendar/CalendarData";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useCalendar} from "../../hooks/calendar/useCalendar";
import {useState} from "react";

function AgendaView() {
    const {
        /* activities */
        selectedActivity,
        setSelectedActivity,
        filteredActivities,
        weekdays,
        targetDate,
        timeSlots,
        setDay,
        handleCloseDialog,
        handleClosePopover,
        dialogMode,
        confirmDeleteOpen,
        setConfirmDeleteOpen,
        openEditDialog,
        deleteActivity,
        isAddEditDialogOpen,
        anchorEl,
        placement,
        formData,
    } = useCalendarContext();


    const [startOfWeek, setStartOfWeek] = useState(dayjs().startOf("week").add(1,"day"));

    const selectedDayIndex = (startOfWeek.day() + 7) % 7;
    const selectedDayName = weekdays[selectedDayIndex].name;



    const handlePrevDay = () => {
        setStartOfWeek(prev => dayjs(prev).subtract(1, 'day'));
    }
    const handleNextDay = () => {
        setStartOfWeek(prev => dayjs(prev).add(1, 'day'));
    }



    return(
            <Paper>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1
                    }}
                >
                    {/* Button changing visible day to previous */}
                    <Button variant="contained" size="small" onClick={handlePrevDay}>
                        <ArrowBackIcon fontSize="small"/>
                    </Button>

                    {/* Headtitle for agenda */}
                    <Typography variant="h6">
                        Vecka {startOfWeek.week()}, {selectedDayName}
                    </Typography>

                    {/* Button changing visible day to next */}
                    <Button variant ="contained" size="small" onClick={handleNextDay}>
                        <ArrowForwardIcon fontSize="small"/>
                    </Button>
                </Box>
                <Paper sx={{ height: '100vh', display: 'flex', overflow: 'hidden' }}>
                    {/* LEFT COLUMN */}
                    <Box sx={{ width: '40%', overflowY: 'auto', backgroundColor: '#f5f5f5' }}>
                        <CurrentDay startOfDay={startOfWeek} />
                    </Box>

                    {/* RIGHT COLUMN */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

                        {/* FIXED HEIGHT TOP ROW (two boxes) */}
                        <Box sx={{ height: '40%', display: 'flex' }}>
                            <Box sx={{ flex: 1, p: 2 }}>
                                <Typography variant="h6">Top Left</Typography>
                            </Box>
                            <Box sx={{ flex: 1, p: 2 }}>
                                <Typography variant="h6">Top Right</Typography>
                            </Box>
                        </Box>

                        {/* REMAINING HEIGHT BOTTOM ROW (scrollable NextDay) */}
                        <Box
                            sx={{
                                flex: 1,
                                overflowY: 'auto',
                                p: 2,
                                backgroundColor: '#fafafa',
                            }}
                        >
                            <NextDay startOfDay={startOfWeek} />

                        </Box>
                    </Box>
                </Paper>



                {/* dialogs */}
                <AddActivity
                    open={isAddEditDialogOpen}
                    formData={formData}
                    mode={dialogMode}
                    onClose={handleCloseDialog}
                />

                <ActivityDialog
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    placement={placement}
                    activity={selectedActivity}
                    onClose={handleClosePopover}
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

export default AgendaView;
