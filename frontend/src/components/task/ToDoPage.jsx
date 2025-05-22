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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

import AddTask from "./AddTask";
import TaskDialog from "./TaskDialog";
import ConfirmationDialog from "../ConfirmationDialog";
import Body from "../containers/Body";
import AddActivity from "../calendar/AddActivity";

import { useCalendarContext } from "../../context/CalendarContext";
import { useTodoContext } from "../../context/TodoContext";
import DailyTaskView from "./DailyTaskView";
import dayjs from "dayjs";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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
        dialogMode: calendarDialogMode
    } = useCalendarContext();

    // Local UI state for the TaskDialog & delete confirmation
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskDialogOpen, setTaskDialogOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (todoDialogMode === "add") {
            await createTask(formData);
        } else {
            await updateTask(formData.id, formData);
        }
        closeTodoDialog();
    };

    // Clicking on a task card
    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setTaskDialogOpen(true);
    };

    // From TaskDialog → open AddTask in edit mode
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
        await toggleComplete(task);
    };

    const openAddTaskDialog = () => openTodoDialog("add");

    const incompleteTasks = tasks.filter((t) => !t.completed);
    const completedTasks  = tasks.filter((t) => t.completed);

    return (
        <Body>
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box display="flex" gap={4}>
                    {/* Left Column: ToDo List */}
                    <Box flex={1}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h1">ToDo</Typography>
                            <IconButton onClick={openAddTaskDialog}>
                                <AddIcon />
                            </IconButton>
                        </Box>

                        <Stack spacing={2}>
                            {loading && <Typography>Loading…</Typography>}
                            {error && <Typography color="error">{error}</Typography>}

                            {/* --- Incomplete tasks --- */}
                            {incompleteTasks
                                .sort((a, b) => a.date?.localeCompare(b.date))
                                .map((task) => (
                                    <Card key={task.id}>
                                        <CardContent sx={{ position: "relative", ":hover" : { backgroundColor: "action.hover" }}}>
                                            <IconButton
                                                onClick={() => {
                                                    if (task.completed) {
                                                    deleteTask(task.id);
                                                    } else {
                                                    setTaskToDelete(task);
                                                    setConfirmDeleteOpen(true);
                                                    }
                                                }}

                                                sx={{
                                                    position: "absolute",
                                                    top: 2,
                                                    right: 2,
                                                    color: "error.main",
                                                }}

                                            >
                                                <DeleteOutlineOutlinedIcon />
                                            </IconButton>
                                            <Checkbox
                                                checked={task.completed}
                                                onChange={() => handleToggleCompleted(task)}
                                                sx={{ position: "absolute", bottom: 2, right: 2 }}
                                            />
                                            <Box onClick={() => handleTaskClick(task)} sx={{ cursor: "pointer", p:1.5, textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "text.disabled" : "text.primary", }}>
                                                <Typography variant="h6">{task.name}</Typography>
                                                <Typography variant="body2">{task.description}</Typography>
                                                {task.date && (
                                                    <Typography variant="caption">
                                                        Ska utföras innan: {task.date}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}

                            {/* --- Collapsible completed tasks --- */}
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>
                                        Slutförda ({completedTasks.length})
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack spacing={1}>
                                        {completedTasks.map((task) => (
                                            <Card key={task.id} variant="outlined">
                                                <CardContent
                                                    sx={{
                                                        opacity: 0.7,
                                                        textDecoration: "line-through",
                                                        position: "relative",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            cursor: "pointer",
                                                            p: 1,
                                                            color: "text.disabled",
                                                        }}
                                                        onClick={() => handleTaskClick(task)}
                                                    >
                                                    </Box>
                                                    <IconButton
                                                        onClick={() => deleteTask(task.id)}
                                                        sx={{
                                                            position: "absolute",
                                                            top: 2,
                                                            right: 2,
                                                            color: "error.main",
                                                        }}
                                                    >
                                                        <DeleteOutlineOutlinedIcon/>
                                                    </IconButton>
                                                    <Checkbox
                                                        checked={task.completed}
                                                        onChange={() => handleToggleCompleted(task)}
                                                        sx={{ position: "absolute", bottom: 2, right: 2 }}
                                                    />
                                                    <Box onClick={() => handleTaskClick(task)} sx={{ cursor: "pointer", p:1.5, textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "text.disabled" : "text.primary", }}>
                                                        <Typography variant="h6">{task.name}</Typography>
                                                        <Typography variant="body2">{task.description}</Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </Box>

                    {/* Right Column: Daily View */}
                    <Box flex={1}>
                        <DailyTaskView date={selectedDate} setDate={setSelectedDate} tasks={tasks} />
                    </Box>
                </Box>

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
                        openAddDialog(selectedTask, selectedTask.id);
                    }}
                />

                <ConfirmationDialog
                    open={confirmDeleteOpen}
                    onClose={() => setConfirmDeleteOpen(false)}
                    onConfirm={handleDelete}
                    title="Ta bort ToDo"
                    description="Är du säker på att du vill radera denna ToDo?" //Denna syns inte fixa detta!
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