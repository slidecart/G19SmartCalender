import { Box, Typography, TableContainer, Paper, Button, Container } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CalendarGrid from "./../calendar/calendarGrid"
import AddActivity from "./../calendar/addActivity";
import {fetchData} from "../../hooks/FetchData";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";



function WeeklyCalendar() {

    // Constant variables for dates
    const today = dayjs();
    const currentYear = today.year();
    const [startOfWeek, setStartOfWeek] = useState(dayjs().startOf("week").add(1,"day")); //First day of the week is monday

    //const startOfWeek = today.startOf("week").add(1, "day"); // First day of the week is monday

    // Activity permissions and error handling
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

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

    const [openDialog, setOpenDialog] = useState(false); // Handling of form to add activities
    const [formData, setFormData] = useState({
        name:"",
        description:"",
        location:"",
        date:"",
        startTime:"",
        endTime:"",
        categoryId:"",
        userId:""
    });

    // Function to handle form to be able to add activities
    const handleSubmit = async () =>{
        try{

            const response = await fetchData("activities/create", "POST", formData);
            console.log(response);

            // Closes the dialog och resets the form
            setOpenDialog(false);
            setFormData({
                name:"",
                description:"",
                location:"",
                date:"",
                startTime:"",
                endTime:"",
            });
        } catch (error){
            console.error(error);
        }
    };

    // Function to handle edits for activities
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:value,
        }));
    }

    // Recieves activities from API 
    useEffect(() => {
        const fetchActivities = async() => {
            try {
                const response = await fetchData("activities/all", "GET", ""); // Tar emot aktiviteter från backend


                setActivities(response); // Användarens aktiviteter
            } catch (error) {
                console.error("Fel vid hämtning: ", error.message);
                setError(error.message); // Visar eventuella fel
            }
        };
        fetchActivities();
    }, []);
        
    return(
        <Container sx={{my:2}}>
            <Box display="flex" justifyContent={"space-between"} mb={1}>
                {/* Button changing visible week to previous */}
                <Button variant="contained"  size="small" onClick={() => setStartOfWeek(prev => prev.subtract(1, "week"))}>
                    <ArrowBackIcon fontSize="small"/>
                </Button>

                {/* Headtitle for calender */}
                <Typography variant="h6" sx={{textAlign:"center"}}>
                    Veckokalender - {startOfWeek.format("YYYY")} {/* Shows year based on week */}
                </Typography>

                {/* Button changing visible week to next */}
                <Button variant ="contained" size="small" onClick={() => setStartOfWeek(prev => prev.add(1, "week"))}>
                    <ArrowForwardIcon fontSize="small"/>
                </Button>

            </Box>


            {/* Shows calendar */}
            <TableContainer component ={Paper} elevation="2" sx={{height:"fit-content"}}>
                <CalendarGrid
                    activities = {activities}
                    weekdays = {weekdays}
                    timeSlots = {timeSlots}
                />
            </TableContainer>

            {/* Button for adding activites */}
            <Box display="flex" justifycontent="flex-end" mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenDialog(true)} // Dialog appears 
                >
                    Lägg till
                </Button>
            </Box>

            {/* Shows dialog */}
            <AddActivity
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </Container>
    );
};

export default WeeklyCalendar;