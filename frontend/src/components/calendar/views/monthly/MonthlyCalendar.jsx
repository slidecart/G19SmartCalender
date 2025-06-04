import {Box, Button, Container, Paper, TableContainer, Typography} from "@mui/material";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import ArrowBackIcon  from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MonthlyGrid from "./MonthlyGrid";
import { useCalendarContext } from "../../../../context/CalendarContext";
import {useEffect, useMemo, useState} from "react";

dayjs.extend(isoWeek);

function MonthlyCalendar({ chromeHeight }) {
    /* ------------------------------------------------------------------ */
    /* 1) Local month state + navigation tie-in                            */
    /* ------------------------------------------------------------------ */
    const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

    // read the targetDate that Navbar sets via navigateToDate()
    const { targetDate } = useCalendarContext();

    // whenever somebody calls navigateToDate(), jump to that month
    useEffect(() => {
        if (targetDate) {
            setCurrentMonth(targetDate.startOf("month"));
        }
    }, [targetDate]);

    /* ------------------------------------------------------------------ */
    /* 2) Derived data – recomputed only when currentMonth changes         */
    /* ------------------------------------------------------------------ */
    const { calendarMatrix, monthLabel, startOfMonth, endOfMonth } = useMemo(() => {
        const startOfMonth = currentMonth.startOf("month");
        const endOfMonth   = currentMonth.endOf("month");

        const startDate = startOfMonth.startOf("isoWeek");
        const endDate   = endOfMonth.endOf("isoWeek");
        const totalDays = endDate.diff(startDate, "day") + 1;
        const weeks     = Math.ceil(totalDays / 7);

        const matrix = Array.from({ length: weeks }, (_, weekIndex) =>
            Array.from({ length: 7 }, (_, dayIndex) => startDate.add(weekIndex * 7 + dayIndex, "day"))
        );

        return {
            calendarMatrix: matrix,
            monthLabel: currentMonth.format("MMMM YYYY").replace(/^\w/, c => c.toUpperCase()),
            startOfMonth,
            endOfMonth
        };
    }, [currentMonth]);

    /* ------------------------------------------------------------------ */
    /* 3) Layout helpers                                                  */
    /* ------------------------------------------------------------------ */
    const totalAvailable = `calc(100vh - ${chromeHeight}px - 56px)`;

    /* ------------------------------------------------------------------ */
    /* 4) Handlers                                                        */
    /* ------------------------------------------------------------------ */
    const prevMonth = () => setCurrentMonth(m => m.subtract(1, "month"));
    const nextMonth = () => setCurrentMonth(m => m.add(1, "month"));

    /* ------------------------------------------------------------------ */
    /* 5) Render                                                          */
    /* ------------------------------------------------------------------ */
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                height: totalAvailable
            }}
        >
            {/* Header --------------------------------------------------- */}
            <Box display="flex" justifyContent="space-between" mb={0}>
                <Button variant="contained" size="small" onClick={prevMonth}>
                    <ArrowBackIcon fontSize="small" />
                </Button>

                <Typography variant="h6" textAlign="center">
                    {monthLabel}
                </Typography>

                <Button variant="contained" size="small" onClick={nextMonth}>
                    <ArrowForwardIcon fontSize="small" />
                </Button>
            </Box>

            {/* Grid ------------------------------------------------------ */}
            <TableContainer
                component={Paper}
                elevation={2}
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    p: 0
                }}
            >
                <MonthlyGrid
                    weeks={calendarMatrix}
                    startOfMonth={startOfMonth}
                    endOfMonth={endOfMonth}/>
            </TableContainer>
        </Box>
    );
}

export default MonthlyCalendar;