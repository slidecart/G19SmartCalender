import {useCallback, useEffect, useMemo, useState} from "react";
import dayjs from "dayjs";
import {fetchData} from "../FetchData";

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export function useCalendar() {
    /* ---------- Dates ---------- */
    // Constant variables for dates
    const today = dayjs();
    const currentYear = today.year();
    const [startOfWeek, setStartOfWeek] = useState(
        dayjs().startOf("week").add(1,"day")
    ); //First day of the week is monday

    // Array over weekdays from monday to sunday with actual dates from local computer
    const weekdays = useMemo(
        () =>
         Array.from ({ length: 7 }, (_, i) => ({
            name: ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"][i],
            date: startOfWeek.clone().add(i, "day").format("YYYY-MM-DD") //Format from JSON-file
    })),
        [startOfWeek]
    );

    // Array with time from 00:00 to 23:00
    const timeSlots = useMemo(
        () => Array.from({ length: 24 }, (_, i) =>
            `${i}:00`.padStart(5, "0")),
        []
    );


    /* ---------- Dialog states ---------- */
    const [formData, setFormData] = useState({
        name:"",
        description:"",
        location:"",
        date:"",
        startTime:"",
        endTime:"",
        categoryId:"",
    });

    const [currentView, setCurrentView] = useState("week"); // Weekly or monthly
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen]       = useState(false);
    const [dialogMode, setDialogMode]                   = useState("add"); // or "edit"

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [placement, setPlacement] = useState("right");

    const [taskID, setTaskID] = useState(null);

    const handleActivityClick = useCallback((event, activity, index) => {
        const newPlacement = index < 4 ? "right" : "left";
        setPlacement(newPlacement);
        setSelectedActivity(activity);
        setAnchorEl(event.currentTarget);
    }, []);


    const handleCloseDialog = useCallback(() => {
        setIsAddEditDialogOpen(false);
        setSelectedActivity(null);
        setFormData({});
    }, []);

    const handleClosePopover = useCallback(() => {
        setAnchorEl(null);
    } , []);

    // Function to open the add dialog
    const openAddDialog = useCallback((preFill = {}, taskID) => {
        setDialogMode("add");
        setTaskID(taskID || null);
        setFormData({
            name:        preFill.name        || "",
            description: preFill.description || "",
            location:    preFill.location    || "",
            date:        preFill.date        || today.format("YYYY-MM-DD"),
            startTime:   preFill.startTime   || "12:00",
            endTime:     preFill.endTime     || "13:00",
            categoryId:  preFill.categoryId  || ""
        });
        setIsViewDialogOpen(false);
        setIsAddEditDialogOpen(true);
    }, []);

    // Function to open the view dialog
    const openViewDialog = useCallback((activity) => {
        setSelectedActivity(activity);
        setIsAddEditDialogOpen(false);
        setIsViewDialogOpen(true);
    }, []);


    // Function to open the edit dialog
    const openEditDialog = useCallback((selectedActivity) => {
        setDialogMode("edit");
        setFormData({
            name:        selectedActivity.name,
            description: selectedActivity.description,
            location:    selectedActivity.location,
            date:        selectedActivity.date,
            startTime:   selectedActivity.startTime,
            endTime:     selectedActivity.endTime,
            categoryId:  selectedActivity.categoryId
        });

        setIsViewDialogOpen(false);
        setIsAddEditDialogOpen(true);
    }, [selectedActivity]);

    /* ----------  Activities ---------- */
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

    const loadActivities = useCallback(async () => {
        try {
            const response = await fetchData("activities/all", "GET", ""); // Tar emot aktiviteter från backend
            setActivities(response || []); // Användarens aktiviteter
        } catch (error) {
            console.error("Fel vid hämtning: ", error.message);
            setError(error.message); // Visar eventuella fel
            setActivities([])
        }
    }, []);


    const createOrUpdateActivity = useCallback(
        async (formData, mode, ) => {
            const path =
                mode === "edit"
                    ? `activities/edit/${selectedActivity.id}`
                    : "activities/create";
            const method = mode === "edit" ? "PUT" : "POST";
            const saved = await fetchData(path, method, formData);

            setActivities((prev) =>
                mode === "edit"
                    ? prev.map((a) => (a.id === saved.id ? saved : a))
                    : [...prev, saved]
            );
            return saved;
        },
        [selectedActivity]
    );

    const deleteActivity = useCallback(async (id) => {
        await fetchData(`activities/delete/${id}`, "DELETE", "");
        setActivities(prevActivities => prevActivities.filter(activity => activity.id !== id));
        handleCloseDialog();
    }, []);

    const convertTaskToActivity = useCallback(
        async (formData, taskID) => {
            console.log("taskID", taskID);
            const path = `tasks/convert/${taskID}`;
            const method = "POST";
            const saved = await fetchData(path, method, formData);

            setActivities((prev) => [...prev, saved]);
            return saved;
        },
        []
    );


    useEffect(() => {
        loadActivities();
    }, []);


    /* ----------  Categories + UI filters ---------- */
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(categories || []);

    const loadCategories = useCallback(async () => {
        try {
            const cats = await fetchData("categories/all", "GET", "");
            // Set default empty array if no categories are fetched
            setCategories(cats || []);
        } catch (error) {
            console.error("Error fetching categories:", error.message);
            setCategories([]);
        }
    }, []);

    // Function to create a new category
    const createCategory = useCallback(async (name, color) => {
        const category = {
            name: name,
            color: color,
        }
        const newCategory = await fetchData("categories/create", "POST", category);
        setCategories(prevCategories => [...prevCategories, newCategory]);
        setSelectedCategories(prevSelected => [...prevSelected, newCategory.id]);
    }, []);

    // toggle one on/off:
    const toggleCategory = useCallback((id) => {
        setSelectedCategories(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        );
    }, []);

    const resetFilter = useCallback(() => {
        setSelectedCategories(categories.map(cat => cat.id));
    }, [categories])

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        // Default state: all categories are selected.
        setSelectedCategories(categories.map(cat => cat.id));
    }, [categories]);

    const filteredActivities = activities.filter((a) =>
        // Always show activities with no category
        !a.categoryId || selectedCategories.includes(a.categoryId)
    );

    /* ---------- Form data and handlers ---------- */

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updated = { ...prev, [name]: value };
            // When startTime changes, set default endTime to one hour later.
            if (name === "startTime") {
                updated.endTime = dayjs(value, "HH:mm").add(1, "hour").format("HH:mm");
            }
            return updated;
        });
    };

    const handleCellClick = (date, time) => {
        const defaultEndTime = dayjs(time, "HH:mm").add(1, "hour").format("HH:mm");
        openAddDialog({ date, startTime: time, endTime: defaultEndTime });
    }

    /* ----------  Timeline ---------- */
    const [currentTime, setCurrentTime] = useState(dayjs());

    // Håll koll på nuvarande tid och uppdatera varje minut
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(dayjs()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Beräkna antal minuter sedan midnatt
    const currentMinutes = useMemo(
        () => currentTime.hour() * 60 + currentTime.minute(),
        [currentTime]
    );

    // Beräkna linjens position som procentandel av dygnets totala höjd
    const currentTimePosition = useMemo(
        () => (currentMinutes / (24 * 60)) * 100,
        [currentMinutes]
    );



    // —————— expose everything ——————
    return {
        // date navigation
        startOfWeek,
        setStartOfWeek,
        weekdays,
        timeSlots,

        // activities
        activities,
        selectedActivity,
        setSelectedActivity,
        createOrUpdateActivity,
        deleteActivity,
        handleCellClick,

        // dialog
        isAddEditDialogOpen,
        isViewDialogOpen,
        openViewDialog,
        openAddDialog,
        openEditDialog,
        dialogMode,
        setDialogMode,
        confirmDeleteOpen,
        setConfirmDeleteOpen,
        handleCloseDialog,
        handleClosePopover,
        handleActivityClick,
        anchorEl,
        placement,
        taskID,
        convertTaskToActivity,

        // categories & filter
        categories,
        setCategories,
        selectedCategories,
        toggleCategory,
        createCategory,
        filteredActivities,
        resetFilter,

        // form data
        handleChange,
        formData,
        setFormData,

        // view
        currentView,
        setCurrentView,


        // timeline
        currentTime,
        currentTimePosition,

    };
}
