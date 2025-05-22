import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { fetchData } from "../FetchData";

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);

export function useCalendar() {
  /* ---------- Dates ---------- */
  const today = dayjs();
  const currentYear = today.year();

  // First day of week is now Monday
  const [startOfWeek, setStartOfWeek] = useState(
    dayjs().startOf("isoWeek")
  );

  // Weekdays Monday→Sunday
  const weekdays = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        name: [
          "Måndag",
          "Tisdag",
          "Onsdag",
          "Torsdag",
          "Fredag",
          "Lördag",
          "Söndag",
        ][i],
        date: startOfWeek.clone().add(i, "day").format("YYYY-MM-DD"),
      })),
    [startOfWeek]
  );

  // Hours 00:00→23:00
  const timeSlots = useMemo(
    () => Array.from({ length: 24 }, (_, i) => `${i}:00`.padStart(5, "0")),
    []
  );

  /* ---------- Dialog states ---------- */
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    categoryId: "",
  });
  const [currentView, setCurrentView] = useState("week");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");

  /* ---------- Popover & Activity selection ---------- */
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [placement, setPlacement]           = useState("right");
  const [taskID, setTaskID]                 = useState(null);

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
  }, []);

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
  }, [today]);

  const openViewDialog = useCallback(activity => {
    setSelectedActivity(activity);
    setIsAddEditDialogOpen(false);
    setIsViewDialogOpen(true);
  }, []);

  const openEditDialog = useCallback(activity => {
    setDialogMode("edit");
    setFormData({
      name:        activity.name,
      description: activity.description,
      location:    activity.location,
      date:        activity.date,
      startTime:   activity.startTime,
      endTime:     activity.endTime,
      categoryId:  activity.categoryId
    });
    setIsViewDialogOpen(false);
    setIsAddEditDialogOpen(true);
  }, []);

  /* ---------- Activities CRUD ---------- */
  const [activities, setActivities] = useState([]);
  const [error, setError]           = useState(null);

  const loadActivities = useCallback(async () => {
    try {
      const response = await fetchData("activities/all", "GET", "");
      setActivities(response || []);
    } catch (err) {
      console.error("Fel vid hämtning: ", err.message);
      setError(err.message);
      setActivities([]);
    }
  }, []);

  const createOrUpdateActivity = useCallback(
    async (formData, mode) => {
      const path   = mode === "edit"
        ? `activities/edit/${selectedActivity.id}`
        : "activities/create";
      const method = mode === "edit" ? "PUT" : "POST";
      const saved  = await fetchData(path, method, formData);

      setActivities(prev =>
        mode === "edit"
          ? prev.map(a => (a.id === saved.id ? saved : a))
          : [...prev, saved]
      );
      return saved;
    },
    [selectedActivity]
  );

  const deleteActivity = useCallback(async id => {
    await fetchData(`activities/delete/${id}`, "DELETE", "");
    setActivities(prev => prev.filter(a => a.id !== id));
    handleCloseDialog();
  }, [handleCloseDialog]);

  const convertTaskToActivity = useCallback(
    async (formData, taskID) => {
      const path = `tasks/convert/${taskID}`;
      const saved = await fetchData(path, "POST", formData);
      setActivities(prev => [...prev, saved]);
      return saved;
    },
    []
  );

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  /* ---------- Categories + Filters ---------- */
  const [categories, setCategories]               = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const loadCategories = useCallback(async () => {
    try {
      const cats = await fetchData("categories/all", "GET", "");
      setCategories(cats || []);
    } catch (err) {
      console.error("Error fetching categories:", err.message);
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    setSelectedCategories(categories.map(cat => cat.id));
  }, [categories]);

  const toggleCategory = useCallback(id => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  // — Newly re-added: createCategory —
  const createCategory = useCallback(async (name, color) => {
    const category = { name, color };
    const newCategory = await fetchData("categories/create", "POST", category);
    setCategories(prev => [...prev, newCategory]);
    setSelectedCategories(prev => [...prev, newCategory.id]);
  }, []);

  const resetFilter = useCallback(() => {
    setSelectedCategories(categories.map(cat => cat.id));
  }, [categories]);

  const filteredActivities = useMemo(
    () =>
      activities.filter(
        a => !a.categoryId || selectedCategories.includes(a.categoryId)
      ),
    [activities, selectedCategories]
  );

  /* ---------- Form handlers ---------- */
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === "startTime") {
        updated.endTime = dayjs(value, "HH:mm").add(1, "hour").format("HH:mm");
      }
      return updated;
    });
  };

  const handleCellClick = (date, time) => {
    const defaultEnd = dayjs(time, "HH:mm").add(1, "hour").format("HH:mm");
    openAddDialog({ date, startTime: time, endTime: defaultEnd });
  };

  /* ---------- Timeline indicator ---------- */
  const [currentTime, setCurrentTime] = useState(dayjs());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(dayjs()), 60000);
    return () => clearInterval(timer);
  }, []);
  const currentMinutes = useMemo(
    () => currentTime.hour() * 60 + currentTime.minute(),
    [currentTime]
  );
  const currentTimePosition = useMemo(
    () => (currentMinutes / (24 * 60)) * 100,
    [currentMinutes]
  );

  return {
    // navigation
    startOfWeek,
    setStartOfWeek,
    weekdays,
    timeSlots,

    // activities
    activities,
    filteredActivities,
    selectedActivity,
    createOrUpdateActivity,
    deleteActivity,
    convertTaskToActivity,
    handleCellClick,

    // dialogs
    isAddEditDialogOpen,
    isViewDialogOpen,
    openAddDialog,
    openViewDialog,
    openEditDialog,
    confirmDeleteOpen,
    setConfirmDeleteOpen,
    handleCloseDialog,
    handleClosePopover,
    handleActivityClick,
    anchorEl,
    placement,
    taskID,

    // categories
    categories,
    selectedCategories,
    toggleCategory,
    createCategory,
    resetFilter,

    // form
    formData,
    handleChange,

    // view switch
    currentView,
    setCurrentView,

    // timeline
    currentTime,
    currentTimePosition,
  };
}