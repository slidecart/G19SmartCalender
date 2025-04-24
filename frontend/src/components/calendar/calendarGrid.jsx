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
                            sx={{ verticalAlign: "top", borderRight:"1px solid #ccc", borderTop:"1px solid #ccc"}}
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
                    <TableRow key={time}>
                        <TableCell sx={{ borderRight:"1px solid #ccc"}}>
                            {time}
                        </TableCell>

                        {weekdays.map((day) => {
                            const activity = activities
                                .filter((activity) => {
                                    const activityDate = dayjs(activity.date);
                                    const activityTime = dayjs(`1970-01-01T${activity.startTime}`);
                                    return (
                                        activityDate.format("YYYY-MM-DD") === day.date &&
                                        activityTime.format("HH:mm") === time
                                    );
                                })

                                .sort((a,b) => dayjs(a.startTime).diff(dayjs(b.startTime)));
                                
                                return(
                                    <TableCell 
                                        key={`${day.name}-${time}`} 
                                        sx={{
                                            position:"relative",
                                            align:"center"
                                        }}
                                    > 
                                        {activities.length>0 && (
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