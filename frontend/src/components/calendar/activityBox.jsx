import { Box, Typography, Card, CardContent } from "@mui/material";
import dayjs from "dayjs";

const ActivityBox = ({ activities }) => {
    {/* */}
    if (!activities || activities.length === 0 ) return null;

    // Height of every cell in calendarGrid
    const cellHeight = 60;
    return (
        <>
            {activities.map((activity, i) => {
                // Get start- and endtime
                const start = dayjs(`1970-01-01T${activity.startTime}`);
                const end = dayjs(`1970-01-01T${activity.endTime}`);

                // Convert start- and endtime to minutes from 08:00
                const startMinutes = (start.hour() - 8)* 60  + start.minute();
                const endMinutes = (end.hour() -8 ) * 60+ end.minute();

                // Where activity box is going to start and end based on time from calendarGrid
                const startTime = (start.minute());
                const duration = (endMinutes - startMinutes)*(cellHeight/60);

                return (
                    <Box key={i} sx={{ 
                            position:"absolute", 
                            top:`${startTime}px`,
                            height: `${duration}px`,
                            backgroundColor:"#60f085",
                            boxShadow:1,
                            width:"80%",
                            align:"center"
                        }}>
                            <Typography variant="subtitle2">
                                {activity.name}
                            </Typography>
                            <Typography variant="caption">
                                {dayjs(`1970-01-01T${activity.startTime}`).format("HH:mm")} - {dayjs(`1970-01-01T${activity.endTime}`).format("HH:mm")}
                            </Typography>
                    </Box>
                )
            })}
        </>
    );
};

export default ActivityBox;