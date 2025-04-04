import { Box, Typography,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container } from "@mui/material";
import dayjs from "dayjs";

{/*Komponent för kalendern. Ska även finnas funktioner till backend som ska lägga till, redigera och ta bort aktiviteter*/}



function WeeklyCalendar() {

    const weekdays = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];

    return(
        <Container sx={{my:5}}>
            <TableContainer component ={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {weekdays.map((day) => (
                                <TableCell key={day} align="center" sx={{ fontWeight:"bold"}}>{day}</TableCell>
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