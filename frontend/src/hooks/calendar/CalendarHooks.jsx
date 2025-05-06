import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { fetchData } from "../FetchData";

// —————— 1. Date & navigation ——————
export function useCalendar() {
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

    const handleCellClick = (date, time) => {
        setFormData((prev) => ({
            ...prev,
            date: date,
            startTime: time
        }));
        setDialogMode("add");
        setIsDialogOpen(true);
    }


    // Function to handle form to be able to add activities
    const handleSubmit = async () =>{
        try{
            // Checks if the user is in edit mode or not
            const apiPath = dialogMode === "edit" ? `activities/edit/${selectedActivity.id}` : "activities/create";
            const method = dialogMode === "edit" ? "PUT" : "POST";

            const response = await fetchData(apiPath, method, formData);

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

    {/* Delete function */}
    const [confirmDeleteOpen, setConfirmationDeleteOpen] = useState(false);
    const [activityToDelete, setActivityToDelete] = useState(null);
    const requestDelete = (activity) => {
        setActivityToDelete(activity);
        setConfirmationDeleteOpen(true);
    }

    const handleDelete = async () => {
        if (!activityToDelete) return;

        try {
            await fetchData(`activities/delete/${activityToDelete.id}`, "DELETE");
            setActivities(prev => prev.filter(a => a.id !== activityToDelete.id));

        } catch (error) {
            console.error("Fel vid borttagning: ", error.message);
        } finally {
            setConfirmationDeleteOpen(false);
            setActivityToDelete(null);
            setSelectedActivity(null);
        }
    };

    {/* Categories */}
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetchData("categories/all", "GET", "");
                setCategories(response);
                localStorage.setItem("categories", JSON.stringify(response));
            } catch (error) {
                console.error("Fel vid hämtning av kategorier: ", error.message);
            }
        };
        fetchCategories();
    }, []);


    const createCategory = async (name, color) => {
        try {
            // Create the category on the server
            const newCategoryData = {
                name: name,
                color: color,
            };

            const newCat = await fetchData("categories/create", "POST", newCategoryData);
            // Update the categories state and localStorage with the new category
            setCategories(cats => [...cats, newCat]);
            // 2) immediately select it in your activity form
            setFormData(fd => ({
                ...fd,
                categoryId: newCat.id
            }));
        } catch (error) {
            console.error("Error creating category: ", error.message);
        }
    };

    // —————— expose everything ——————
    return {
        // dates
        startOfWeek,
        setStartOfWeek,
        currentYear,
        weekdays,
        timeSlots,

        // activities
        activities,
        error,

        // add/edit dialog
        isDialogOpen,
        dialogMode,
        formData,
        openAddDialog,
        openEditDialog,
        handeCloseDialog,
        handleCellClick,
        handleChange,
        handleSubmit,

        // view/delete dialog
        selectedActivity,
        activityDialogOpen,
        setActivityDialogOpen,
        handleActivityClick,
        confirmDeleteOpen,
        setConfirmationDeleteOpen,
        requestDelete,
        handleDelete,

        // categories
        categories,
        createCategory,
    };
}
