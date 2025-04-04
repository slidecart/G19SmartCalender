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
            <Typography variant="h4" sx={{textAlign:"center", mb: 3}}>
                Veckokalender - {currentYear}
            </Typography>
            <TableContainer component ={Paper}>
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
                            {weekdays.map((day) => (
                                <TableCell key={day} align="center" sx={{ verticalAlign:"top" }}>
                                    <Box>
                                        <Typography>
                                            hej hej
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {/*Här ska det finnas aktiviteter taget från backend*/}
                                    </ul>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default WeeklyCalendar;