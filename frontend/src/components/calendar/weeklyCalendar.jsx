import { Box, Typography,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container } from "@mui/material";
import dayjs from "dayjs";

{/*Komponent för kalendern. Ska även finnas funktioner till backend som ska lägga till, redigera och ta bort aktiviteter*/}



function WeeklyCalendar() {

    const today = dayjs();
    const currentYear = today.year();

    const startOfWeek = today.startOf("week");

    const weekdays = Array.from ({ length: 7 }, (_, i) => ({
        name: ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"][i],
        date: startOfWeek.add(i, "day").format("DD/MM") 
    }));

    return(
        <Container sx={{my:5}}>
            <Typography variant="h5" sx={{textAlign:"center", mb: 3}}>
                Veckokalender - {currentYear}
            </Typography>
            <TableContainer component ={Paper} elevation="2" sx={{height:"450px"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {weekdays.map((day) => (
                                <TableCell key={day.name} align="center" sx={{ fontWeight:"bold"}}>
                                    {day.name} {day.date}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center" sx={{verticalAlign:"top", borderStyle:"solid", borderWidth:"0.5px"}}>
                                <Box>
                                    <Typography variant="p">
                                        hej hej
                                    </Typography>
                                </Box>
                            </TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default WeeklyCalendar;