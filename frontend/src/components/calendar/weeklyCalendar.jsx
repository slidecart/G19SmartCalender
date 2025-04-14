import { Box, Typography, TableContainer, Paper, Button, Container } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CalendarGrid from "./../calendar/calendarGrid"
import AddActivity from "./../calendar/addActivity";



function WeeklyCalendar() {

    // Satta variabler för datum
    const today = dayjs();
    const currentYear = today.year();
    const startOfWeek = today.startOf("week").add(1, "day"); // Första dagen i veckan är Måndag

    // Tillstånd för aktiviteter och felhanteirng 
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

    // Lista över veckodagar från måndag till söndag med aktuella datum
    const weekdays = Array.from ({ length: 7 }, (_, i) => ({
        name: ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"][i],
        date: startOfWeek.add(i, "day").format("YYYY-MM-DD") //Formatet från JSON-fil 
    }));

    // Lista för tider från 08:00 till 20:00 
    const timeSlots = Array.from({ length: 13}, (_,i) => {
        const hour = 8 + i;
        return `${hour.toString().padStart(2, '0')}:00`;
    });

    const [openDialog, setOpenDialog] = useState(false); // Hanterar formuläret för att lägga till aktiviteter
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

    // Funktion för att hantera formuläret för att lägga till aktiviter
    const handleSubmit = async () =>{
        try{
            const token = localStorage.getItem("jwt"); // Tar emot token från localstorage
            if (!token){
                console.error("No JWT found in localStorage. User might not be logged in");
                return;
            }

            const response = await fetch("http://localhost:8080/api/activity/create",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Autorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok){
                throw new error("Kunder inte skapa aktivitet");
            }

            // Stänger dialogen och tömmer formuläret
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

    // Funktioner för att hantera ändringar i formuläret
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:value,
        }));
    }

    // Hämtar aktiviteter från API 
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
                setError(error.message); // Visar eventuella fel
            }
        };
        fetchActivites();
    }, []);
        
    return(
        <Container sx={{my:2}}>
            <Typography variant="h6" sx={{textAlign:"center", mb: 1}}>
                Veckokalender - {currentYear}
            </Typography>

            {/* Kalendern visas */}
            <TableContainer component ={Paper} elevation="2" sx={{height:"fit-content"}}>
                <CalendarGrid
                    activities = {activities}
                    weekdays = {weekdays}
                    timeSlots = {timeSlots}
                />
            </TableContainer>
            <Box display="flex" justifycontent="flex-end" mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenDialog(true)}
                >
                    Lägg till
                </Button>
            </Box>
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