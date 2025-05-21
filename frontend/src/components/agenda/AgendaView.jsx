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
        setStartOfWeek,
        startOfWeek,
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


    const today = dayjs();
    const todayDate = today.format("YYYY-MM-DD");
    const todayIndex = weekdays.findIndex(w => w.date === todayDate);
    const todayTime = timeSlots.findIndex(time => parseInt(time, 10) === today.hour());
    const currentDay = dayjs(targetDate).startOf("day");


    const handlePrevDay = () => {
        setStartOfWeek(prev => prev.subtract(1, 'day'));
    }
    const handleNextDay = () => {
        setStartOfWeek(prev => prev.add(1, 'day'));
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
                        Vecka {startOfWeek.week()}, {todayIndex}
                    </Typography>

                    {/* Button changing visible day to next */}
                    <Button variant ="contained" size="small" onclick={handleNextDay}>
                        <ArrowForwardIcon fontSize="small"/>
                    </Button>
                </Box>
                <Container>

                </Container>
                <Container>
                    <Container>
                        <Container>

                        </Container>
                        <Container>

                        </Container>
                    </Container>
                    <Container>

                    </Container>

                </Container>

                <CurrentDay>

                </CurrentDay>
                <NextDay>

                </NextDay>

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
