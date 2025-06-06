import React from "react";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography
} from "@mui/material";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import MonthlyActivityBox from "./MonthlyActivityBox";
import { useCalendarContext } from "../../../../context/CalendarContext";

dayjs.extend(weekOfYear);
const weekdays = ["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];

/**
 * MonthlyGrid renders the month as a full-height, non-scrolling grid
 * where the last row sits flush at the bottom.
 */
const MonthlyGrid = ({ weeks=[], startOfMonth, endOfMonth })=> {
    const { filteredActivities, handleActivityClick, categories, handleCellClick} = useCalendarContext();
    // compute each row's height as a percentage of container
    const rowHeight = `${100 / weeks.length}%`;
    console.log(startOfMonth);
    console.log(endOfMonth);

    return (
        <Table
            sx={{
                tableLayout: "fixed",
                width: "100%",
                height: "100%",
                borderCollapse: "collapse"
            }}
        >
            {/* Weekday headers */}
            <TableHead>
                <TableRow sx={{ display: "flex" }}>
                    {/* Empty corner for week numbers */}
                    <TableCell sx={{
                        flex: "0 0 48px",
                        p: 1,
                        boxSizing: "border-box",
                        border: "1px solid #ccc",
                        fontWeight: "bold"
                    }} />
                    {weekdays.map((label) => (
                        <TableCell
                            key={label}
                            align="center"
                            sx={{
                                flex: 1,
                                border: "1px solid #ccc",
                                fontWeight: "bold",
                                backgroundColor: "background.paper",
                                boxSizing: "border-box"
                            }}
                        >
                            {label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>

            {/* Flex-based body: each row takes equal share of height */}
            <TableBody
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%", // subtract header height (48px)
                    p: 0,
                    m: 0
                }}
            >
                {weeks.map((week, rowIndex) => (
                    <TableRow
                        key={rowIndex}
                        sx={{
                            display: "flex",
                            height: rowHeight,
                            width: "100%",
                            boxSizing: "border-box"
                        }}
                    >
                        {/* Week-number column */}
                        <TableCell
                            component="th"
                            scope="row"
                            sx={{
                                flex: "0 0 48px",
                                border: "1px solid #ccc",
                                p: 1,
                                bgcolor: "background.paper",
                                boxSizing: "border-box"
                            }}
                        >
                            V.{(week[0].week())}
                        </TableCell>

                        {/* Day cells */}
                        {week.map((day, colIndex) => {
                            const formattedDate = day.format("YYYY-MM-DD");
                            const dailyActivities = filteredActivities.filter(
                                (a) => dayjs(a.date).format("YYYY-MM-DD") === formattedDate
                            );
                            const isToday = dayjs(day.date).isSame(dayjs(), "day");
                            const isOutsideOfMonth = day.isBefore(startOfMonth, 'day') || day.isAfter(endOfMonth, 'day');

                            return (
                                <TableCell
                                    key={colIndex}
                                    sx={{
                                        flex: 1,
                                        border: "1px solid #ccc",
                                        p: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        boxSizing: "border-box",
                                        backgroundColor: isOutsideOfMonth
                                                ? "grey.200"
                                                : "inherit",
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: isOutsideOfMonth
                                                ? "grey.300"
                                                : "grey.100",
                                            "& .date-number": {
                                                backgroundColor: "primary.main",
                                                color: "white",
                                                borderRadius: "50%",
                                                width: 22,
                                                height: 22,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }
                                        },
                                    }}
                                    onClick={() => {
                                            handleCellClick(day.format("YYYY-MM-DD"), "12:00");
                                    }}
                                >
                                    <Typography variant="caption" className="date-number" sx={{ mb: 0.5 }}>
                                        {day.format("DD")}
                                    </Typography>

                                    {dailyActivities.length > 0 && (
                                        <MonthlyActivityBox
                                            filteredActivities={dailyActivities}
                                            onClick={(e) => handleActivityClick(e, dailyActivities[0], colIndex)}
                                            categories={categories}
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
