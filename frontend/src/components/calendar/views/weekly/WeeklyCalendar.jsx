import {Box, Button, Container, Paper, TableContainer, Typography} from "@mui/material";
import dayjs from "dayjs";
import {useState} from "react";
import WeeklyGrid from "./WeeklyGrid"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


function WeeklyCalendar({}) {


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

    // Array with time from 08:00 to 20:00
    const timeSlots = Array.from({ length: 13}, (_,i) => {
        const hour = 8 + i;
        return `${hour.toString().padStart(2, '0')}:00`;
    });

    return(
        <Container sx={{my:2}}>
            <Box display="flex" justifyContent={"space-between"} mb={1}>
                {/* Button changing visible week to previous */}
                <Button variant="contained"  size="small" onClick={() => setStartOfWeek(prev => prev.subtract(1, "week"))}>
                    <ArrowBackIcon fontSize="small"/>
                </Button>

                {/* Headtitle for calender */}
                <Typography variant="h6" sx={{textAlign:"center"}}>
                    Veckokalender - {currentYear} {/* Shows year based on week */}
                </Typography>

                {/* Button changing visible week to next */}
                <Button variant ="contained" size="small" onClick={() => setStartOfWeek(prev => prev.add(1, "week"))}>
                    <ArrowForwardIcon fontSize="small"/>
                </Button>

            </Box>


            {/* Shows calendar */}
            <TableContainer component ={Paper} elevation="2" sx={{height:"fit-content"}}>
                <WeeklyGrid
                    weekdays = {weekdays}
                    timeSlots = {timeSlots}
                     // Shows activity when clicked
                />
            </TableContainer>

            {/* Shows error message if any */}
        </Container>
    );
};

export default WeeklyCalendar;