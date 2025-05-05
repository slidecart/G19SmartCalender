import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from "@mui/material";
import dayjs from "dayjs";
import ActivityBox from "./activityBox";



const CalendarGrid = ({ activities = [], weekdays = [], timeSlots = [], onActivityClick, onCellClick }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {/* Empty cell, only for the time-column */}
                    <TableCell sx={{ verticalAlign:"top", borderRight:"1px solid #ccc", borderTop:"1px solid #ccc" }}/>

                    {/* Weekdays as titles */}
                    {weekdays.map((day) => {
                      const isToday = dayjs(day.date).isSame(dayjs(), "day");
                      return (
                        <TableCell
                          key={day.name}
                          align="center"
                          sx={{
                            height: "30px",
                            verticalAlign: "top",
                            borderRight: "1px solid #ccc",
                            borderTop: "1px solid #ccc",
                            backgroundColor: isToday ? "primary.light" : "inherit",
                          }}
                        >
                          <Typography variant="subtitle1">
                            {day.name} {dayjs(day.date).format("DD/MM")}
                          </Typography>
                        </TableCell>
                      );
                    })}
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
                            const isToday = dayjs(day.date).isSame(dayjs(), "day");
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
                                            padding:"0",

                                            cursor: "pointer",
                                            backgroundColor: isToday ? "grey.200" : "inherit",

                                        }}
                                        onClick={() => {
                                            if (hits.length === 0) {
                                                onCellClick(day.date, time);
                                            }

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
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CalendarGrid;