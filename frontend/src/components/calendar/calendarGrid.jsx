import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from "@mui/material";
import dayjs from "dayjs";
import ActivityBox from "./activityBox";

const CalendarGrid = ({ activities = [], weekdays = [], timeSlots = [] }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {/* Empty cell, only for the time-column */}
                    <TableCell sx={{ verticalAlign:"top", borderRight:"1px solid #ccc", borderTop:"1px solid #ccc" }}/>

                    {/* Weekdays as titles */}
                    {weekdays.map((day) => (
                        <TableCell
                            key={day.name}
                            align="center"
                            sx={{ height:"30px", verticalAlign: "top", borderRight:"1px solid #ccc", borderTop:"1px solid #ccc"}}
                        >
                            <Typography variant="subtitle1">
                                {day.name} {dayjs(day.date).format("DD/MM")}
                            </Typography>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {/* Maps out times from 08:00 - 20:00 for every row in the first column */ }
                {timeSlots.map((time) => (
                    <TableRow key={time} sx={{ height:"30px" }}>
                        <TableCell sx={{  borderRight:"1px solid #ccc", padding:"15px"}}>
                            {time}
                        </TableCell>

                        {weekdays.map((day) => {
                            // Filters and sets every date & time for each
                            const activity = activities.filter((a) => {
                                const activityDate = dayjs(a.date).format("YYYY-MM-DD");
                                const startTime = dayjs(`1970-01-01T${a.startTime}`).format("HH:mm");
                                return activityDate === day.date && startTime === time;
                            })

                            return(
                                    <TableCell 
                                        key={`${day.name}-${time}`} 
                                        sx={{
                                            position:"relative",
                                            padding:"0",
                                            align:"center"
                                        }}
                                    > 
                                        {activity.length>0 && (
                                            <ActivityBox activities={activity}/>
                                        )}
                                    </TableCell>
                                );
                        })}

                        {/* One cell for every weekday and checks if any activity exists in this time-span */}
                        {/* {weekdays.map((day) => {
                            const matchingActivity = activities.find((activity) => {
                                const startTime = dayjs(`1970-01-01T${activity.startTime}`);
                                const startDate = dayjs(activity.date);
                                return (
                                    startDate.format("YYYY-MM-DD") === day.date &&
                                    startTime.format("HH:mm") === time

                                );
                            });

                            console.log(matchingActivity); 
                            return (
                                <TableCell 
                                    key={`${day.name}-${time}`}
                                    align="center"

                                >
                                    <Box>
                                        <Typography>
                                            hej
                                        </Typography>
                                    </Box>
                                </TableCell>
                            );
                        })} */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CalendarGrid;