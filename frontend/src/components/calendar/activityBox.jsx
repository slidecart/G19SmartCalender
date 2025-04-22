import { Box, Typography, Card, CardContent } from "@mui/material";
import dayjs from "dayjs";

const ActivityBox = ({ activities }) => {
    {/* */}

    return (
        <Box sx={{display: "flex", gap:2, mb:3 }}>

            {activities.map((activity, i) => (
                <Card key={i} sx={{ mb:1, maxWidth: 200, position:"absolute" }}>
                    <CardContent>

                        <Typography variant="subtitle2">
                            {activity.name}
                        </Typography>
                        <Typography variant="caption">
                            {dayjs(`1970-01-01T${activity.startTime}`).format("HH:mm")} - {dayjs(`1970-01-01T${activity.endTime}`).format("HH:mm")}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
            {/*{weekdays.map((day) => {
                const dayActivities = activities

                    // Filters activities by date
                    .filter((activity) => dayjs(activity.startTime).format("YYYY-MM-DD") === day.date)

                    // Sorts activites by time
                    .sort((a, b) => dayjs(a.startTime).diff(dayjs(b.startTime)));

                    // If there is no activites, no activites returns 
                    if (dayActivities.length === 0) return null;

                    return (
                        <Card key = {day.name} sx={{ maxWidth: 200 }}>
                            <CardContent>

                                //{/* Maps out every activity over the calendar 
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
                })} */}
        </Box>
    );
};

export default ActivityBox;