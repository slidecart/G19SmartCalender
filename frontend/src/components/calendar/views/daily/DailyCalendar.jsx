// In DailyCalendar.jsx
import React, {
    useEffect,
    useRef
} from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import dayjs from "dayjs";
import { useCalendarContext } from "../../../../context/CalendarContext";
import WeeklyActivityBox from "../weekly/WeeklyActivityBox";

export function DailyCalendar({ date, draftActivity }) {
    const {
        activities,
        handleCellClick,
        handleActivityClick,
        categories,
        currentTime,
    } = useCalendarContext();

    const containerRef = useRef(null);
    const ROW_HEIGHT = 60;
    const VISIBLE_ROWS = 8;

    const currentDate = dayjs();
    const targetHour = currentDate.isSame(date, "day") ? currentDate.hour() : 12;

    useEffect(() => {
        if (containerRef.current) {
            const targetScroll = targetHour * ROW_HEIGHT - (VISIBLE_ROWS * ROW_HEIGHT) / 2;
            containerRef.current.scrollTop = Math.max(0, targetScroll);
        }
    }, [targetHour]);

    const timeSlots = Array.from({ length: 24 }, (_, hour) =>
        hour.toString().padStart(2, "0") + ":00");

    // Filter activities for the given day
    const dayActivities = activities.filter(activity =>
        dayjs(activity.date).isSame(date, "day"));

    // If a draft exists, add it temporarily (ensuring it does not conflict with saved data)
    const activitiesToRender = draftActivity
        ? [...dayActivities, draftActivity]
        : dayActivities;

    const isToday = currentTime.isSame(date, "day");
    const minutesSinceMidnight = currentTime.hour() * 60 + currentTime.minute();
    const topPx = (minutesSinceMidnight / 60) * ROW_HEIGHT;

    return (
        <Box
            ref={containerRef}
            sx={{
                position: "relative",
                height: VISIBLE_ROWS * ROW_HEIGHT,
                overflowY: "scroll",
                border: 1,
                borderColor: "divider",
                mt: 1,
            }}
        >

            {isToday && (
                <>
                    {/* Solid line */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: `${topPx}px`,
                            left: "45px",
                            width: "100%",
                            height: "2px",
                            bgcolor: "error.main",
                            zIndex: 2,
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                        }}
                    />
                </>
            )}

            <Table sx={{ tableLayout: "fixed" }}>
                <TableBody>
                    {timeSlots.map(time => {
                        const cellStart = dayjs(`1970-01-01T${time}`);
                        const cellEnd = cellStart.add(1, "hour");
                        // Find activities overlapping current timeslot.
                        const hits = activitiesToRender.filter(activity => {
                            const actStart = dayjs(`1970-01-01T${activity.startTime}`);
                            const actEnd = actStart.add(1, "minute")

                            return actEnd.isAfter(cellStart) && actStart.isBefore(cellEnd);
                        });
                        return (
                            <TableRow key={time} sx={{ height: ROW_HEIGHT }}>
                                <TableCell
                                    sx={{
                                        width: "20px",
                                        borderRight: "1px solid #ccc",
                                        pl: 1,
                                        verticalAlign: "top",
                                    }}
                                >
                                    <Typography variant="caption">{time}</Typography>
                                </TableCell>
                                <TableCell
                                    sx={{
                                        position: "relative",
                                        p: 0,
                                        cursor: hits.length === 0 ? "pointer" : "default",
                                    }}
                                    onClick={() => {
                                        if (hits.length === 0) {
                                            handleCellClick(date, time);
                                        }
                                    }}
                                >
                                    {hits.length > 0 && (
                                        <WeeklyActivityBox
                                            filteredActivities={hits}
                                            onClick={(e) => handleActivityClick(e, hits[0])}
                                            categories={categories}
                                        />
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Box>
    );
}