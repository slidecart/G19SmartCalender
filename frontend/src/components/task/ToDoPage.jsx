// frontend/src/components/task/ToDoPage.jsx
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from 'lottie-react';
import confettiAnimation from '../../animations/Confetti.json';
import {
  Checkbox,
  Container,
  Typography,
  Stack,
  IconButton,
  Box,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Menu,
  MenuItem,
  Tooltip
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { alpha } from "@mui/material/styles";
import AddTask from "./AddTask";
import TaskDialog from "./TaskDialog";
import ConfirmationDialog from "../ConfirmationDialog";
import Body from "../containers/Body";
import AddActivity from "../calendar/AddActivity";
import { useCalendarContext } from "../../context/CalendarContext";
import { useTodoContext } from "../../context/TodoContext";
import { useCategoryContext } from "../../context/CategoryContext";
import ToDoList from "./ToDoList";
import DailyTaskView from "./DailyTaskView";
import dayjs from "dayjs";

export default function ToDoPage() {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    formData,
    setFormData,
    isDialogOpen,
    dialogMode: todoDialogMode,
    openTodoDialog,
    closeTodoDialog,
  } = useTodoContext();

  const {
    openAddDialog,
    isAddEditDialogOpen,
    handleCloseDialog,
    dialogMode: calendarDialogMode,
  } = useCalendarContext();

  const { categories } = useCategoryContext();

  // UI state
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [sweepingTaskId, setSweepingTaskId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // quick‑add inputs
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [newTodoCategory, setNewTodoCategory] = useState("");
  const [catMenuAnchor, setCatMenuAnchor] = useState(null);
  const dateInputRef = useRef(null);
  const [newTodoDate, setNewTodoDate] = useState("");

  /* ------------------------------------------------------------
   * helpers
   * ---------------------------------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (todoDialogMode === "add") {
      await createTask(formData);
    } else {
      await updateTask(formData.id, formData);
    }
    closeTodoDialog();
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setTaskDialogOpen(true);
  };

  const handleEdit = () => {
    openTodoDialog("edit", selectedTask);
    setTaskDialogOpen(false);
  };

  const handleDelete = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete.id);
      setConfirmDeleteOpen(false);
      setTaskDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleToggleCompleted = async (task) => {
    setSweepingTaskId(task.id);

    if (!task.completed) {
    setShowConfetti(true);
    }

    setTimeout(async () => {
        await toggleComplete(task);
        setSweepingTaskId(null);
        setShowConfetti(false);
    }, 1000);
  };

  const handleConvert = async (task) => {
    openAddDialog(task, task.id);
  };

  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const variants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  /* ------------------------------------------------------------
   * render
   * ---------------------------------------------------------- */
  return (
    <Body>
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Box display="flex" gap={4}>
          {/* ----------------------------------------------------------------
           * LEFT — list view
           * -------------------------------------------------------------- */}
          <Box flex={1} sx={{ display: "flex", flexDirection: "column", flexGrow: 1, maxHeight:"525px", minHeight: 0, overflowY:"auto"}}>
            <ToDoList />
          </Box>

          {/* RIGHT — daily view */}
          <Box flex={1} sx={{ overflowY: "auto" }}>
            <DailyTaskView date={selectedDate} setDate={setSelectedDate} tasks={tasks} />
          </Box>
        </Box>

          {/* dialogs */}
          <AddTask
              open={isDialogOpen}
              onClose={closeTodoDialog}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
          />

          <TaskDialog
              open={taskDialogOpen}
              onClose={() => setTaskDialogOpen(false)}
              task={selectedTask}
              onEdit={handleEdit}
              onDelete={() => {
                setTaskToDelete(selectedTask);
                setConfirmDeleteOpen(true);
              }}
              onConvert={() => {
                setTaskDialogOpen(false);
                handleConvert(selectedTask);
              }}
          />

          <ConfirmationDialog
              open={confirmDeleteOpen}
              onClose={() => setConfirmDeleteOpen(false)}
              onConfirm={handleDelete}
              title="Ta bort ToDo"
              description="Är du säker på att du vill radera denna ToDo?"
          />

          <AddActivity
              open={isAddEditDialogOpen}
              mode={calendarDialogMode}
              onClose={handleCloseDialog}
          />
        </Container>
      </Body>
  );
}