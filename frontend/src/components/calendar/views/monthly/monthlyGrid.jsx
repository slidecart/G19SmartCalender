import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import MonthlyActivityBox from "./monthlyActivityBox";

dayjs.extend(weekOfYear);
const weekdays = ["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];

const MonthlyGrid = ({ activities = [], weeks = [], onActivityClick }) => {

    return (
        <Table>

            {/* TableHead for all the weekdays */}
            <TableHead>
                <TableRow>

                    {/* Empty cell, only for the week-column */}
                    <TableCell sx={{ verticalAlign:"top", borderRight:"1px solid #ccc", borderTop:"1px solid #ccc"}}/>

                    {/* Weekdays as titles */}
                    {weekdays.map((day) => (
                        <TableCell
                            key={day}
                            align="center"
                            sx={{ fontWeight:"bold", border:"1px solid #ccc", maxWidth:"145px"}}
                        >
                            {day}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>

            {/* TableBody for the weeks and cells */}
            <TableBody>
                {weeks.map((week, rowIndex) => (
                    <TableRow key={rowIndex}>

                        {/* Empty cell for week */}
                        <TableCell sx={{ border:"1px solid #ccc", fontWeight:"bold", height:"80px"}}>
                            V.{week[0].week()}
                        </TableCell>
                        {week.map((day, colIndex) => {
                            const formattedDate = day.format("YYYY-MM-DD");

                            const dailyActivities = activities.filter(
                                (a) => dayjs(a.date).format("YYYY-MM-DD") === formattedDate
                            );

                            return (
                                <TableCell
                                    key={`${rowIndex}-${colIndex}`}
                                    sx= {{
                                        verticalAlign:"top",
                                        p:1,
                                        height: 100,
                                        width:"145px",
                                        overflow:"hidden",
                                        border:"1px solid #ccc"
                                    }}
                                >
                                    {/* Date title for every cell */}
                                    <Typography variant="caption" sx={{ display:"block", mb:0.5}}>
                                        {day.format("DD")}
                                    </Typography>

                                    {/* Activities displayed if any */}
                                    {dailyActivities.length > 0 && (
                                        <MonthlyActivityBox
                                            activities={dailyActivities}
                                            onClick={() => onActivityClick(dailyActivities)}
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

export default MonthlyGrid;