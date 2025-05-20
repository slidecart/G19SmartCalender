import {Box, Button, Container, Paper, TableContainer, Typography} from "@mui/material";
import dayjs from "dayjs";
import {useEffect, useRef, useState} from "react";
import WeeklyGrid from "./WeeklyGrid"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useCalendarContext} from "../../../../context/CalendarContext";


function WeeklyCalendar() {

    // Constant variables for dates
    const today = dayjs();
    const currentYear = today.year();
    const [startOfWeek, setStartOfWeek] = useState(dayjs().startOf("week").add(1,"day")); //First day of the week is monday

    //const startOfWeek = today.startOf("week").add(1, "day"); // First day of the week is monday

    // Array over weekdays from monday to sunday with actual dates from local computer
    const weekdays = Array.from ({ length: 7 }, (_, i) => ({
        name: ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"][i],
        date: startOfWeek.clone().add(i, "day").format("YYYY-MM-DD") //Format from JSON-file
    }));

    // Set visible hours
    const {timeSlots, targetDate} = useCalendarContext();
    const ROW_HEIGHT_PX = 60;
    const PRE_HOURS = 3;

    const scrollRef = useRef(null);

    // On mount, scroll so current hour row is PRE_HOURS rows from the top
    useEffect(() => {
        const nowHour = dayjs().hour();
        const index = timeSlots.findIndex((time) => parseInt(time, 10) === nowHour);
        if (index > 0 && scrollRef.current) {
            const offSet = (index - PRE_HOURS) * ROW_HEIGHT_PX;
            scrollRef.current.scrollTop = offSet > 0 ? offSet : 0;
        }
    }, [timeSlots]);

    // whenever someone calls navigateToDate(date), jump the week
    useEffect(() => {
        if (targetDate) {
            setStartOfWeek(dayjs(targetDate).startOf("week").add(1, "day"));
        }
    }, [targetDate]);


    return(
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, overflow: "hidden" }}>
            <Box display="flex" justifyContent={"space-between"} mb={1}>
                {/* Button changing visible week to previous */}
                <Button variant="contained"  size="small" onClick={() => setStartOfWeek(prev => prev.subtract(1, "week"))}>
                    <ArrowBackIcon fontSize="small"/>
                </Button>

                {/* Headtitle for calender */}
                <Typography variant="h6" sx={{textAlign:"center"}}>
                    Vecka {startOfWeek.week()} - {currentYear} {/* Shows year based on week */}
                </Typography>

                {/* Button changing visible week to next */}
                <Button variant ="contained" size="small" onClick={() => setStartOfWeek(prev => prev.add(1, "week"))}>
                    <ArrowForwardIcon fontSize="small"/>
                </Button>

            </Box>


            {/* Shows calendar */}
            <TableContainer
                component ={Paper}
                elevation="2"
                sx={{height:"visibleHeight" + "px", overflowY:"auto"}}
                ref={scrollRef}
            >

                <WeeklyGrid
                    weekdays={weekdays}
                />
            </TableContainer>

            {/* Shows error message if any */}
        </Box>
    );
}

export default WeeklyCalendar;