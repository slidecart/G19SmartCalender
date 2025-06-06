import { Box, Container, Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import dayjs from "dayjs";
import { useCalendarContext } from "../../context/CalendarContext";




const toMinutes = (timeStr) => {
    if (!timeStr) return Number.MAX_SAFE_INTEGER;
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
};

const CurrentDay = ({ startOfDay, dayOffset = 1, title }) => {

    const { filteredActivities, categories } = useCalendarContext();

    const currentDay = dayjs(startOfDay).add(dayOffset, 'day');
    const selectedDate = currentDay.format("YYYY-MM-DD");
    const now = dayjs();


    const activitiesForDay = filteredActivities
        .filter(activity => {
            const isSameDay = dayjs(activity.date).format("YYYY-MM-DD") === selectedDate;

            const activityEndDateTime = dayjs(`${activity.date}T${activity.endTime}`);

            const isFuture = activityEndDateTime.isAfter(now);
            return isSameDay && isFuture;
        })
        .sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));

    return (
        <Box
            sx={{
                overflowY: 'auto',
                backgroundColor: '#fafafa',
                position: 'sticky',
                top: 0,
                m:0.5
            }}
        >

        <Container disableGutters>
            <Typography fontSize={"18px"} align="center" p={0.5}>
                {title}
            </Typography>
                {activitiesForDay.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" p={2} align="center">
                        Inga aktiviteter för denna dag.
                    </Typography>
                ) : (
                    activitiesForDay.map((activity, i) => {
                    const category = categories?.find(cat => cat.id === activity.categoryId);
                    const borderLeftColor = category ? category.color : "#60f085";
                    const backgroundColor = category ? alpha(category.color, 0.1) : alpha("#60f085", 0.1);
                    return(
                        <Paper
                            key={i}
                            elevation={2}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                p:1,
                                m: 1,
                                borderLeft: '5px solid',
                                borderLeftColor,
                                backgroundColor,
                                maxWidth:"95%",
                                transition: "background-color 0.3s ease",
                                    "&:hover":{
                                        backgroundColor: category ? alpha(category.color, 0.4) : alpha("#60f085", 0.2),
                                    },
                            }}
                        >
                            <Typography variant="h7">
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
                        )
                    })
                )}
            </Container>
        </Box>
    );
};

export default CurrentDay;
