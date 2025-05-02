import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from "@mui/material";
import dayjs from "dayjs";
import ActivityBox from "./activityBox";


const CalendarGrid = ({ activities = [], weekdays = [], timeSlots = [], onActivityClick }) => {
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
                    <TableRow key={time} sx={{ height:"60px" }}>
                        <TableCell sx={{  borderRight:"1px solid #ccc", padding:"15px"}}>
                            {time}
                        </TableCell>

                        {weekdays.map((day) => {
                            // Filters and sets every date & time for each
                            const cellStart = dayjs(`1970-01-01T${time}`);
                            const cellEnd = cellStart.add(1, "hour");


                            const hits = activities.filter((a) => {
                                const activityDate = dayjs(a.date).format("YYYY-MM-DD");
                                const start = dayjs(`1970-01-01T${a.startTime}`);
                                const end = start.add(1, "minute")

                                return (
                                    activityDate === day.date && 
                                    end.isAfter(cellStart) &&
                                    start.isBefore(cellEnd)
                                );
                            });
                            return(
                                    <TableCell 
                                        key={`${day.name}-${time}`} 
                                        sx={{
                                            position:"relative",
                                            padding:"0"
                                        }}
                                    > 
                                        {hits.length>0 && (
                                            <ActivityBox
                                                activities={hits}
                                                onClick={() => onActivityClick(hits[0])} // Pass the first activity to the click handler
                                            />
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