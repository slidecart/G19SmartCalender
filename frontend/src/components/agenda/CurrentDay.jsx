import { Box, Container, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useCalendarContext } from "../../context/CalendarContext";

const toMinutes = (timeStr) => {
    if (!timeStr) return Number.MAX_SAFE_INTEGER;
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
};

const CurrentDay = ({ startOfDay, dayOffset = 1, height = '100vh', width = '100%' }) => {
    const { filteredActivities } = useCalendarContext();

    const currentDay = dayjs(startOfDay).add(dayOffset, 'day');
    const selectedDate = currentDay.format("YYYY-MM-DD");

    const activitiesForDay = filteredActivities
        .filter(activity => dayjs(activity.date).format("YYYY-MM-DD") === selectedDate)
        .sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));

    return (
        <Box
            sx={{
                width,
                height,
                overflowY: 'auto',
                px: 2,
                py: 2,
                backgroundColor: '#fafafa',
                position: 'sticky',
                top: 0,
            }}
        >

        <Container disableGutters>
                {activitiesForDay.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        Inga aktiviteter för denna dag.
                    </Typography>
                ) : (
                    activitiesForDay.map(activity => (
                        <Paper
                            key={activity.id}
                            elevation={2}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                p: 2,
                                mb: 2,
                                borderLeft: '5px solid #1976d2',
                                backgroundColor: '#f9f9f9',
                            }}
                        >
                            <Typography variant="h6">
                                {activity.name ?? 'Ingen titel'}
                            </Typography>
                            {activity.description && (
                                <Typography variant="body2" color="text.secondary">
                                    {activity.description}
                                </Typography>
                            )}
                            <Typography variant="subtitle2" color="text.secondary">
                                {dayjs(`2000-01-01T${activity.startTime}`).format("HH:mm")}–
                                {dayjs(`2000-01-01T${activity.endTime}`).format("HH:mm")}
                            </Typography>
                        </Paper>
                    ))
                )}
            </Container>
        </Box>
    );
};

export default CurrentDay;
