import { Box, Typography, TableContainer, Paper, Button, Container } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CalendarGrid from "./../calendar/calendarGrid"
import AddActivity from "./../calendar/addActivity";
import {fetchData} from "../../hooks/FetchData";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ActivityDialog from "./ActivityDialog";



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

    // Array with time from 08:00 to 20:00 
    const timeSlots = Array.from({ length: 13}, (_,i) => {
        const hour = 8 + i;
        return `${hour.toString().padStart(2, '0')}:00`;
    });


    // State for activities
    // Activity permissions and error handling
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

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

    {/* Consts and functions to handle activity dialog*/}
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [activityDialogOpen, setActivityDialogOpen] = useState(false);

    const handleActivityClick = (activity) => {
        setSelectedActivity(activity);
        setActivityDialogOpen(true);
    };

    {/* Functions for adding and editing activities */}
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState(null); // "add" or "edit"

    const openAddDialog = () => {
        setDialogMode("add");
        setIsDialogOpen(true);
    };

    const openEditDialog = (activity) => {
        setFormData(activity);
        setDialogMode("edit");
        setIsDialogOpen(true);
        setActivityDialogOpen(false);
    };

    const handeCloseDialog = () => {
        setIsDialogOpen(false);
        setFormData({
            name: "",
            description: "",
            location: "",
            date: "",
            startTime: "",
            endTime: "",
            categoryId: "",
        });
    };


    // Function to handle form to be able to add activities
    const handleSubmit = async () =>{
        try{
            console.log(selectedActivity);
            // Checks if the user is in edit mode or not
            const apiPath = dialogMode === "edit" ? `activities/edit/${selectedActivity.id}` : "activities/create";
            const method = dialogMode === "edit" ? "PUT" : "POST";


            const response = await fetchData(apiPath, method, formData);
            console.log(response);

            // Closes the dialog och resets the form
            setIsDialogOpen(false);
            setFormData({
                name:"",
                description:"",
                location:"",
                date:"",
                startTime:"",
                endTime:"",
            });

            if (method === "POST") {
                setActivities((prevActivities) => [...prevActivities, response]); // Adds the new activity to the list
            } else {
                setActivities((prevActivities) =>
                    prevActivities.map((activity) =>
                        activity.id === response.id ? response : activity
                    )
                ); // Updates the existing activity in the list
            }
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

    // Receives activities from API
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
                    onActivityClick = {handleActivityClick} // Shows activity when clicked
                />
            </TableContainer>

            {/* Button for adding activites */}
            <Box display="flex" justifycontent="flex-end" mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openAddDialog()} // Dialog appears
                >
                    Lägg till
                </Button>
            </Box>

            {/* Shows dialog in create mode*/}
            <AddActivity
                open={isDialogOpen}
                onClose={handeCloseDialog}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}

            />

            {/* Shows activity when clicked */}
            {selectedActivity && (
                <ActivityDialog
                    open={activityDialogOpen}
                    onClose={() => setActivityDialogOpen(false)} // Closes activity dialog
                    activity={selectedActivity}
                    onEdit={() => openEditDialog(selectedActivity)} // Opens edit dialog
                />
            )}

            {/* Shows error message if any */}
        </Container>
    );
};

export default WeeklyCalendar;