import {Box, Typography} from "@mui/material";
import dayjs from "dayjs";
import {useCalendarContext} from "../../../../context/CalendarContext";

const WeeklyActivityBox = ({ filteredActivities, onClick }) => {
    const {
        categories,
    } = useCalendarContext();
    {/* */}
    if (!filteredActivities || filteredActivities.length === 0 ) return null;


    // Height of every cell in calendarGrid
    const cellHeight = 60;
    return (
        <>
            {filteredActivities.map((activity, i) => {
                // Get start- and endtime
                const start = dayjs(`1970-01-01T${activity.startTime}`);
                const end = dayjs(`1970-01-01T${activity.endTime}`);

                // Convert start- and endtime to minutes from 08:00
                const startMinutes = (start.hour() - 8)* 60  + start.minute();
                const endMinutes = (end.hour() -8 ) * 60+ end.minute();

                // Where activity box is going to start and end based on time from calendarGrid
                const startTime = (start.minute());
                const duration = (endMinutes - startMinutes)*(cellHeight/60);

                const category = categories?.find(cat => cat.id === activity.categoryId);
                const tempBackgroundColor = category ? category.color : "#60f085";
                const combinedDateTime = new Date(`${activity.date}T${activity.endTime}`);
                const past = combinedDateTime.getTime() < Date.now();
                const backgroundColor = past ? "grey.300" : tempBackgroundColor;

                return (
                    <Box key={i}
                         onClick={onClick}
                         sx={{
                            position:"absolute", 
                            top:`${startTime}px`,
                            height: `${duration}px`,
                            backgroundColor,
                            boxShadow:1,
                            width:"80%",
                            cursor:"pointer",
                            zIndex:1,
                             transition: "background-color 0.3s ease",
                             "&:hover": {
                                backgroundColor: "primary.main", // Slightly darkens the background
                                color:"white"
                             },
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

export default WeeklyActivityBox;