import { Box, Typography,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";



function WeeklyCalendar() {

    {/* Satta variabler för datum*/}
    const today = dayjs();
    const currentYear = today.year();
    const startOfWeek = today.startOf("week").add(1, "day"); // Första dagen i veckan är Måndag

    {/* Const för aktiviteter*/}
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

    {/* Lista för veckodatum */}
    const weekdays = Array.from ({ length: 7 }, (_, i) => ({
        name: ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"][i],
        date: startOfWeek.add(i, "day").format("YYYY-MM-DD") //Formatet från JSON-fil -- ändra sedan formatet som visas
    }));

    {/* Lista för tider*/}
    const timeSlots = Array.from({ length: 13}, (_,i) => {
        const hour = 8 + i;
        return `${hour.toString().padStart(2, '0')}:00`;
    });

    {/* Funktion för att ta emot användarens aktiviteter */}
    useEffect(() => {
        const fetchActivites = async() => {
            try {
                const response = await fetch("http://localhost:8080/api/activity/all"); // Tar emot aktiviteter från backend
                if (!response.ok) {
                    throw new Error("Något gick fel vid upphämtningen av aktiviteter");
                }
    
                const data = await response.json();
                setActivities(data); // Användarens aktiviteter
            } catch (error) {
                console.error("Fel vid hämtning: ", error.message);
                setError(error.message);
            }
        };
        fetchActivites();
    }, []);
        
    return(
        <Container sx={{my:5}}>
            <Typography variant="h5" sx={{textAlign:"center", mb: 3}}>
                Veckokalender - {currentYear}
            </Typography>
            <TableContainer component ={Paper} elevation="2" sx={{height:"450px"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* Tom cell endast för tids-kolumnen*/}
                            <TableCell
                                sx={{ verticalAlign: "top", borderRight:"1px solid #ccc", borderTop:"1px solid #ccc"}}
                            />

                            {/*Resten av kolumnerna för varje veckodag*/}
                            {weekdays.map((day) => {
                                const dayActivities = activities.filter((a) =>
                                    a.startTime.startsWith(day.date)
                                );

                                return (
                                    <TableCell
                                        key={day.name}
                                        align="center"
                                        sx={{ verticalAlign: "top", borderRight:"1px solid #ccc", borderTop:"1px solid #ccc"}}
                                    >
                                        <Typography variant="subtitle1">
                                            {day.name} {dayjs(day.date).format("MM/DD")}
                                        </Typography>

                                        {dayActivities.map((activity) => 
                                            <Box key = {activity.id}>
                                                <Typography variant="subtitle2">
                                                    {activity.title}
                                                </Typography>
                                                <Typography variant="caption">
                                                    {dayjs(activity.startTime).format("HH:mm")} - {dayjs(activity.endTime).format("HH:mm")}
                                                </Typography>
                                            </Box>
                                        )}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Mappar ut tiderna 08:00 - 20:00 för varje första kolumn*/}
                        {timeSlots.map((time) => (
                            <TableRow key={time}>
                                <TableCell>
                                    {time}
                                </TableCell>

                                {/*Mappar ut */}
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
                                        {matchingAcitivty && (
                                            <Box>
                                                <Typography variant = "subtitle2">
                                                    {matchingAcitivty.title}
                                                </Typography>
                                                <Typography variant = "caption">
                                                    {dayjs(matchingAcitivty.startTime).format("HH:mm")} - {dayjs(matchingAcitivty.endTime).format("HH:mm")}
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
            </TableContainer>
        </Container>
    );
};

export default WeeklyCalendar;