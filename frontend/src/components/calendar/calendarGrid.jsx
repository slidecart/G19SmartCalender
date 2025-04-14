import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from "@mui/material";
import dayjs from "dayjs";

const CalendarGrid = ({ activities, weekdays, timeSlots }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {/* Tom cell endast för tids-kolumnen*/ }
                    <TableCell sx={{ verticalAlign:"top", borderRight:"1px solid #ccc", borderTop:"1px solid #ccc" }}/>

                    {/* Veckodagar som rubriker */}
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
                {/* Mappar ut tiderna för 08:00 - 20:00 för varje första kolumn*/ }
                {timeSlots.map((time) => (
                    <TableRow key={time}>
                        <TableCell>
                            {time}
                        </TableCell>

                        {/* En cell för varje veckodag och kontrollerar om en aktivitet finns i denna tidslucka */}
                        {weekdays.map((day) => {
                            const matchingAcitivty = activities.find((activity) => {
                                const start = dayjs(activity.startTime);
                                return (
                                    start.format("YYYY-MM-DD") === day.date &&
                                    start.format("HH:mm") === time
                                );
                            });
                            
                            return (
                                <TableCell 
                                    key={`${day.name}-${time}`}
                                    align="center"

                                >
                                    {/* Om en aktivitet matchas visas den*/}
                                    {matchingAcitivty && (
                                        <Box>
                                            {/* Aktivitetens rubrik */}
                                            <Typography variant="subtitle2">
                                                {matchingAcitivty.title} 
                                            </Typography>

                                            {/* Aktivitetens starttid och sluttid */}
                                            <Typography variant="caption">
                                                {dayjs(matchingAcitivty.startTime).format("HH:mm")} - {dayjs(matchingAcitivty.endtTime).format("HH:mm")}
                                            </Typography>
                                        </Box>
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