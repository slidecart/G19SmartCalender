import { useTheme } from "@mui/material";
import { useState } from "react";

import TodoList from "../components/task/todoList";
import AddTask from "../components/task/AddTask";
import TaskDialog from "../components/task/TaskDialog";
import ConfirmationDialog from "../components/ConfirmationDialog";
import Body from "../components/containers/Body";
import AddActivity from "../components/calendar/AddActivity";

import { useCalendarContext } from "../context/CalendarContext";
import { useTodoContext }     from "../context/TodoContext";

export default function ToDoPage() {
    const theme = useTheme();
    const {
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

    return (
        <>
            <Body>
                <TodoList/>
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
