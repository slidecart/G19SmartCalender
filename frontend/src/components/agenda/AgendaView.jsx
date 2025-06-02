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
        currentYear,
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


    const [startOfWeek, setStartOfWeek] = useState(
        dayjs().subtract(1, 'day')
    );

    const selectedDayIndex = startOfWeek.day();
    const selectedDayName = weekdays[selectedDayIndex].name;
    const currentDay = dayjs(startOfWeek).add(1, "day");
    const selectedDate = currentDay.format("DD/MM");

    const nextDayIndex = (selectedDayIndex + 1) % 7;
    const nextDayName = weekdays[nextDayIndex].name;
    const nextDay = currentDay.add(1, "day");
    const nextDate = nextDay.format("DD/MM");



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
                    Vecka {startOfWeek.week()} - {currentYear}
                </Typography>

                {/* Button changing visible day to next */}
                <Button variant ="contained" size="small" onClick={handleNextDay}>
                    <ArrowForwardIcon fontSize="small"/>
                </Button>
            </Box>
            <Paper sx={{ height: '76vh', display: 'flex', overflow: 'hidden' }}>
                {/* LEFT COLUMN */}
                <Box sx={{ width: '35%', overflowY: 'auto', backgroundColor: '#fcfcfc', height:"510px", m:1, borderRadius:"3px" }}>
                    <CurrentDay startOfDay={startOfWeek} title={`${selectedDayName} ${selectedDate}`} />
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

                    <Box sx={{ height: '40%', display: 'flex', justifyContent:"space-evenly"}}>
                    {/* REMAINING HEIGHT BOTTOM ROW (scrollable NextDay) */}
                        <Box
                            sx={{
                                overflowY: 'auto',
                                backgroundColor: '#fcfcfc',
                                flex: 1,
                                m:1,
                                height:"297px",
                                borderRadius:"3px" 
                            }}
                        >
                            <NextDay startOfDay={startOfWeek} title={`${nextDayName} ${nextDate}`} />

                        </Box>
                        <Box
                            sx={{
                                overflowY: 'auto',
                                backgroundColor: '#fcfcfc',
                                flex: 1,
                                m:1,
                                height:"297px",
                                borderRadius:"3px" 
                            }}
                        >
                            <Typography>
                                inkommande
                            </Typography>
                        </Box>
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
