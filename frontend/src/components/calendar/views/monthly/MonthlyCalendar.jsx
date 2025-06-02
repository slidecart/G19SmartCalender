import {Box, Button, Container, Paper, TableContainer, Typography} from "@mui/material";
import dayjs from "dayjs";
import {useState} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MonthlyGrid from "./MonthlyGrid";
import { useCalendarContext } from "../../../../context/CalendarContext";

const daysInWeek =["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];

function MonthlyCalendar({ chromeHeight }) {
    const {
        currentMonth,
        setCurrentMonth,
        months, 
        currentYear
    } = useCalendarContext()

    const totalAvailable = `calc(100vh - ${chromeHeight}px - 56px)`;
    // Dates
    const today = dayjs();
    const selectedMonthIndex = today.month();
    const selectedMonth = months[selectedMonthIndex].name;

    // Dates when month start
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");

    // Day when month start
    const startDate = startOfMonth.startOf("week").add(1, "day"); // Starts on a monday
    const endDate = endOfMonth.endOf("week").add(1, "day"); // Ends on a sunday

    const totalDays = endDate.diff(startDate, "day") +1;
    const weeks = Math.ceil(totalDays/7);

    // Array over weeks
    const calendar = Array.from({length:weeks}, (_, weekIndex) => {
        return Array.from({ length:7 }, (_, dayIndex) => {
            const date = startDate.add(weekIndex * 7 + dayIndex, "day");
            return date;
        });
    });

    // Calendar title
    const title = `${selectedMonth} ${currentYear}`;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, height: totalAvailable }}>
            <Box display="flex" justifyContent={"space-between"} mb={0}>

                {/* Button changing visible month to previous */}
                <Button variant="contained" size="small" onClick={() => setCurrentMonth(prev => prev.subtract(1, "month"))}>
                    <ArrowBackIcon fontSize="small"/>
                </Button> 

                {/* Headtitle for calendar */}
                <Typography variant="h6" textAlign={"center"}>
                    {title}
                </Typography>

                {/* Button changing visible month to next */}
                <Button variant="contained" size="small" onClick={() => setCurrentMonth(prev => prev.add(1, "month"))}>
                    <ArrowForwardIcon fontSize="small"/>
                </Button>

            </Box>

            {/* Shows calendar */}
            <TableContainer component={Paper}
                elevation={2}
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    p: 0,
                }}>
                <MonthlyGrid
                    weeks={calendar}
                />
            </TableContainer>   

        </Box>
    )
}

export default MonthlyCalendar;