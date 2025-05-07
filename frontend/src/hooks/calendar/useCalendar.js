import {useCallback, useEffect, useMemo, useState} from "react";
import dayjs from "dayjs";
import {fetchData} from "../FetchData";

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

    // Array with time from 08:00 to 20:00
    const timeSlots = useMemo(
        () => Array.from({ length: 13 }, (_, i) =>
            `${8 + i}:00`.padStart(5, "0")),
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

    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen]       = useState(false);
    const [dialogMode, setDialogMode]                   = useState("add"); // or "edit"

    const [selectedActivity, setSelectedActivity]       = useState(null);

    const handleCloseDialog = useCallback(() => {
        setIsAddEditDialogOpen(false);
        setIsViewDialogOpen(false);
        setFormData({});
    }, []);

    // Function to open the add dialog
    const openAddDialog = useCallback((preFill = {}) => {
        setDialogMode("add");
        setFormData({
            name:        preFill.name        || "",
            description: preFill.description || "",
            location:    preFill.location    || "",
            date:        preFill.date        || today.format("YYYY-MM-DD"),
            startTime:   preFill.startTime   || "",
            endTime:     preFill.endTime     || "",
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

    useEffect(() => {
        if (selectedActivity) {
            console.log("Selected activity:", selectedActivity);
        }
    }, [selectedActivity]);

    // Function to open the edit dialog
    const openEditDialog = useCallback((selectedActivity) => {
        setDialogMode("edit");
        // *here’s the critical bit*—you must _fill_ the formData
        // from the activity you passed in, instead of leaving it blank:
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
    }, []);

    /* ----------  Activities ---------- */
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

    const loadActivities = useCallback(async () => {
        try {
            const response = await fetchData("activities/all", "GET", ""); // Tar emot aktiviteter från backend
            setActivities(response); // Användarens aktiviteter
        } catch (error) {
            console.error("Fel vid hämtning: ", error.message);
            setError(error.message); // Visar eventuella fel
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

    useEffect(() => {
        loadActivities();
    }, [loadActivities]);


    /* ----------  Categories + UI filters ---------- */
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const loadCategories = useCallback(async () => {
        const cats = await fetchData("categories/all", "GET", "");
        setCategories(cats);
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

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    useEffect(() => {
        setSelectedCategories(prev =>
            prev.filter(id => categories.some(cat => cat.id === id))
        );
    }, [categories]);

    const filteredActivities =
        selectedCategories.length === 0
            ? activities
            : activities.filter((a) => selectedCategories.includes(a.categoryId));


    /* ---------- Form data and handlers ---------- */

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:value,
        }));
    }


    const handleCellClick = (date, time) => {
        openAddDialog({date, startTime: time});
    }

    const [currentView, setCurrentView] = useState("week");

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

        // categories & filter
        categories,
        setCategories,
        selectedCategories,
        toggleCategory,
        createCategory,
        filteredActivities,

        // form data
        handleChange,
        formData,
        setFormData,

        // view
        currentView,
        setCurrentView,

    };
}
