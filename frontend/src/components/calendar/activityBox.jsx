import { Box, Typography, Card, CardContent } from "@mui/material";
import dayjs from "dayjs";

const ActivityBox = ({ activities, weekdays }) => {
    return (
        <Box sx={{display: "flex", gap:2, mb:3 }}>
            {weekdays.map((day) => {
                const dayActivities = activities
                    .filter((activity) => dayjs(activity.startTime).format("YYYY-MM-DD") === day.date)
                    .sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)));

                    //Om det inte finns aktiviteter ska inga aktiviteter skickas tillbaka
                    if (dayActivities.length === 0) return null;

                    return (
                        <Card key = {day.name} sx={{ maxWidth: 200 }}>
                            <CardContent>
                                {dayActivities.map((activity, i) => (
                                    <Box key={i} sx={{ mb:1 }}>
                                        <Typography variant="subtitle2">
                                            {activity.name}
                                        </Typography>
                                        <Typography variant="caption">
                                            {dayjs(`1970-01-01T${activity.startTime}`).format("HH:mm")} - {dayjs(`1970-01-01T${activity.endTime}`).format("HH:mm")}
                                        </Typography>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    );
                })}
        </Box>
    );
};

export default ActivityBox;