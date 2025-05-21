import {
    Checkbox,
    Container,
    Typography,
    Stack,
    IconButton,
    Box,
    Card,
    CardContent 
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTodoContext } from "../../context/TodoContext";
import { useState } from "react";

export default function TodoList() {
    const {
        tasks, 
        loading,
        error,
        toggleComplete,
        openTodoDialog,
        setTaskDialogOpen
    } = useTodoContext();

    // Clicking on a task card
    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setTaskDialogOpen(true);
    };

    const handleToggleCompleted = async(task) => {
        await toggleComplete(task);
    };

    const openAddTaskDialog = () => openTodoDialog("add");

    return(
        <Container maxWidth="xs" sx={{ mt: 4 }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
                minWidth={"275px"}
            >
                <Typography variant="h1" fontWeight={"bold"} pl={1}>
                    ToDo
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
    );    
}   