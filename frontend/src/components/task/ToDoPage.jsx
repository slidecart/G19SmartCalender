import {
    Checkbox,
    Container,
    Typography,
    Stack,
    IconButton,
    Box,
    Card,
    CardContent,
    useTheme
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import AddTask from "./AddTask";
import TaskDialog from "./TaskDialog";
import ConfirmationDialog from "../ConfirmationDialog";
import Body from "../containers/Body";
import AddActivity from "../calendar/AddActivity";

import { useCalendarContext } from "../../context/CalendarContext";
import { useTodoContext }     from "../../context/TodoContext";

export default function ToDoPage() {
    const theme = useTheme();
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

    // Mark for deletion
    const requestDelete = () => {
        setTaskToDelete(selectedTask);
        setConfirmDeleteOpen(true);
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

    return (
        <>
            <Body>
                <Container maxWidth="xs" sx={{ mt: 4 }}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                    >
                        <Typography variant="h1">
                            TASKS
                        </Typography>
                        <IconButton onClick={openAddTaskDialog}>
                            <AddIcon />
                        </IconButton>
                    </Box>

                    <Stack spacing={2}>
                        {loading && <Typography>Loading…</Typography>}
                        {error && <Typography color="error">{error}</Typography>}
                        {tasks
                            .slice()
                            .sort((a, b) => a.completed - b.completed)
                            .map((task) => (
                                <Card key={task.id}>
                                    <CardContent sx={{ position: "relative" }}>
                                        <Checkbox
                                            checked={task.completed}
                                            onChange={() => handleToggleCompleted(task)}
                                            sx={{ position: "absolute", top: 8, right: 8 }}
                                        />
                                        <Box onClick={() => handleTaskClick(task)} sx={{ cursor: "pointer" }}>
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
                    </Stack>
                </Container>

            </Body>
            
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
                onDelete={requestDelete}
                onConvert={() => {
                    setTaskDialogOpen(false);
                    openAddDialog(selectedTask, selectedTask.id);
                }}
            />

            <ConfirmationDialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
                onConfirm={handleDelete}
                title="Ta bort task"
                description="Är du säker på att du vill radera den här tasken?"
            />

            <AddActivity
                open={isAddEditDialogOpen}
                mode={calendarDialogMode}
                onClose={handleCloseDialog}
            />
        </>
    );
}
