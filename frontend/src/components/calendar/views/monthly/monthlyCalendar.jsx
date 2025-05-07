import { Box, Typography, TableContainer, Paper, Button, Container } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MonthlyGrid from "./monthlyGrid";

const daysInWeek =["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];

function MonthlyCalendar({ activities, onActivityClick, openAddDialog}) {

    // Dates
    const today = dayjs();
    const currentYear = today.year();
    const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

    // Dates when month start
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");

    // Day when month start
    const startDate = startOfMonth.startOf("week").add(1, "day"); // Starts on a monday
    const endDate = endOfMonth.endOf("week").add(1, "day"); // Ends on a sunday

    const totalDays = endDate.diff(startDate, "day") +1;
    const weeks = Math.ceil(totalDays/7);

    // Array over 
    const calendar = Array.from({length:weeks}, (_, weekIndex) => {
        return Array.from({ length:7 }, (_, dayIndex) => {
            const date = startDate.add(weekIndex * 7 + dayIndex, "day");
            return date;
        });
    });

    return (
        <Container sx={{ my:2 }}>
            <Box display="flex" justifyContent={"space-between"} mb={2}>

                {/* Button changing visible month to previous */}
                <Button variant="contained" size="small" onClick={() => setCurrentMonth(prev => prev.subtract(1, "month"))}>
                    <ArrowBackIcon fontSize="small"/>
                </Button> 

                {/* Headtitle for calendar */}
                <Typography variant="h6" textAlign={"center"}>
                    {currentMonth.format("MMMM YYYY")}
                </Typography>

                {/* Button changing visible month to next */}
                <Button variant="contained" size="small" onClick={() => setCurrentMonth(prev => prev.add(1, "month"))}>
                    <ArrowForwardIcon fontSize="small"/>
                </Button>

            </Box>

            {/* Shows calendar */}
            <TableContainer component={Paper} elevation={2} sx={{height:"650px"}}>
                <MonthlyGrid
                    activities={activities}
                    weeks={calendar}
                    onActivityClick={onActivityClick}
                />
            </TableContainer>   

        </Container>
    )
}

export default MonthlyCalendar;