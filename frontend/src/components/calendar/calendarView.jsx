import { useEffect, useState } from "react";
import { Box, ButtonGroup, Button, Paper } from "@mui/material";
import WeeklyCalendar from "./views/weekly/weeklyCalendar";
import AddActivity from "./addActivity";
import ActivityDialog from "./ActivityDialog";
import { fetchData } from "../../hooks/FetchData";

function CalendarView(){

    // State for view and activities
    // Activity permissions and error handling
    const [currentView, setCurrentView] = useState("week");
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

    return (
        <Paper elevation={3} sx={{ p:2 }}>
            <Box display="flex" justifyContent={"flex-end"} mb={2}>

                {/* Buttons for changing views */}
                <ButtonGroup variant="contained" size="small">
                    <Button onClick={() => setCurrentView("week")} color={currentView === "week" ? "primary" : "inherit"}>
                        Veckovy
                    </Button>
                    <Button onClick={() => setCurrentView("month")} color={currentView === "month" ? "primary" : "inherit"}>
                        Månadsvy
                    </Button>
                </ButtonGroup>
            </Box>

            {/* Sets view to week */}
            {currentView === "week" && (
                <WeeklyCalendar
                    activities={activities}
                    onActivityClick={handleActivityClick}
                    openAddDialog={openAddDialog}
                />
            )}

            {/* SKA LÄGGAS TILL
            {currentView === "month" && (
                <MonthlyCalendar
                    activities={activities}
                    onActivityClick={handleActivityClick}
                    openAddDialog={openAddDialog}
                />
            )} */}

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
        </Paper>
    )
}

export default CalendarView;