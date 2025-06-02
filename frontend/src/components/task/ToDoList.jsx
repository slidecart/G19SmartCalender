// src/components/task/ToDoList.jsx
import React, { useState, useRef } from "react";
import {
    Box,
    Typography,
    Stack,
    TextField,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Card,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
} from "@mui/material";
import {
    ExpandMore as ExpandMoreIcon,
    DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
    Category as CategoryIcon,
    DateRange as DateRangeIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from 'lottie-react';
import confettiAnimation from '../../animations/Confetti.json';
import { alpha } from "@mui/material/styles";
import { useTodoContext } from "../../context/TodoContext";
import { useCategoryContext } from "../../context/CategoryContext";

export default function ToDoList() {
    const {
        tasks,
        loading,
        error,
        createTask,
        deleteTask,
        toggleComplete,
    } = useTodoContext();

    const { categories } = useCategoryContext();

    const [newTodoName, setNewTodoName] = useState("");
    const [newTodoDescription, setNewTodoDescription] = useState("");
    const [newTodoCategory, setNewTodoCategory] = useState("");
    const [newTodoDate, setNewTodoDate] = useState("");
    const [catMenuAnchor, setCatMenuAnchor] = useState(null);
    const dateInputRef = useRef(null);
    const [sweepingTaskId, setSweepingTaskId] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);

    const incompleteTasks = tasks.filter((t) => !t.completed);
    const completedTasks = tasks.filter((t) => t.completed);

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

    const variants = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 50 },
    };

    return (
        <Box flex={1} sx={{ display: "flex", flexDirection: "column", flexGrow: 1, maxHeight:"525px", minHeight: 0, overflowY:"auto" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h1">ToDo</Typography>
            </Box>

            {/* Quick Add */}
            <Box mb={2}>
                <TextField
                    size="small"
                    label="Lägg till en ny ToDo"
                    placeholder="Titel"
                    value={newTodoName}
                    onChange={(e) => setNewTodoName(e.target.value)}
                    onKeyDown={async (e) => {
                        if (e.key === "Enter" && newTodoName.trim()) {
                            try {
                                await createTask({
                                    name: newTodoName.trim(),
                                    description: newTodoDescription.trim() || undefined,
                                    categoryId: newTodoCategory || undefined,
                                    date: newTodoDate || undefined,
                                });
                                setNewTodoName("");
                                setNewTodoDescription("");
                                setNewTodoCategory("");
                                setNewTodoDate("");
                            } catch (err) {
                                console.error("Error creating task:", err);
                            }
                        }
                    }}
                    fullWidth
                />
                {newTodoName.trim() !== "" && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, ml: 2, overflowY:"auto" }}>
                        <TextField
                            size="small"
                            sx={{ flex: 1 }}
                            label="Lägg till en beskrivning"
                            placeholder="Beskrivning"
                            value={newTodoDescription}
                            onChange={(e) => setNewTodoDescription(e.target.value)}
                            onKeyDown={async (e) => {
                                if (e.key === "Enter" && newTodoName.trim()) {
                                    try {
                                        await createTask({
                                            name: newTodoName.trim(),
                                            description: newTodoDescription.trim() || undefined,
                                            categoryId: newTodoCategory || undefined,
                                            date: newTodoDate || undefined,
                                        });
                                        setNewTodoName("");
                                        setNewTodoDescription("");
                                        setNewTodoCategory("");
                                        setNewTodoDate("");
                                    } catch (err) {
                                        console.error("Error creating task:", err);
                                    }
                                }
                            }}
                        />
                        <Tooltip title="Välj kategori" arrow>
                            <IconButton
                                onClick={(e) => setCatMenuAnchor(e.currentTarget)}
                                sx={{ color: newTodoCategory ? "primary.main" : "text.secondary" }}
                            >
                                <CategoryIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={catMenuAnchor}
                            open={Boolean(catMenuAnchor)}
                            onClose={() => setCatMenuAnchor(null)}
                        >
                            <MenuItem
                                onClick={() => {
                                    setNewTodoCategory("");
                                    setCatMenuAnchor(null);
                                }}
                            >
                                <em>Rensa</em>
                            </MenuItem>
                            {categories.map((cat) => (
                                <MenuItem
                                    key={cat.id}
                                    onClick={() => {
                                        setNewTodoCategory(cat.id);
                                        setCatMenuAnchor(null);
                                    }}
                                >
                                    {cat.name}
                                </MenuItem>
                            ))}
                        </Menu>
                        <Box sx={{ position: "relative" }}>
                            <Tooltip title="Välj datum" arrow>
                                <IconButton
                                    onClick={() => {
                                        if (dateInputRef.current?.showPicker) {
                                            dateInputRef.current.showPicker();
                                        } else {
                                            dateInputRef.current.click();
                                        }
                                    }}
                                    sx={{ color: newTodoDate ? "primary.main" : "text.secondary" }}
                                >
                                    <DateRangeIcon />
                                </IconButton>
                            </Tooltip>
                            <input
                                ref={dateInputRef}
                                type="date"
                                value={newTodoDate}
                                onChange={(e) => setNewTodoDate(e.target.value)}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    opacity: 0,
                                    pointerEvents: "none",
                                }}
                            />
                        </Box>
                    </Box>
                )}
            </Box>

            {/* Task List */}
            <Stack spacing={2}>
                {loading && <Typography>Loading…</Typography>}
                {error && <Typography color="error">{error}</Typography>}

                <AnimatePresence>
                    {incompleteTasks.sort((a, b) => a.date?.localeCompare(b.date)).map((task) => {
                        const cat = categories.find((c) => c.id === task.categoryId) || null;
                        return (
                            <motion.div
                                key={task.id}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={variants}
                                transition={{ duration: 0.3 }}
                            >
                                <Card>
                                    <CardContent
                                        sx={{
                                            cursor: "pointer",
                                            maxHeight:"90px",
                                            minHeight:"50px",
                                            display: "flex",
                                            alignItems:"center",
                                            position: "relative",
                                            overflow: "hidden",
                                            borderLeft: cat?.color ? `4px solid ${cat.color}` : "4px solid #ccc",
                                            backgroundColor: cat?.color ? alpha(cat.color, 0.1) : "background.paper",
                                            "&:hover": {
                                                backgroundColor: cat?.color
                                                    ? alpha(cat.color, 0.4)
                                                    : "action.hover",
                                            },
                                        }}
                                    >
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteTask(task.id);
                                            }}
                                            sx={{ position: "absolute", top: 2, right: 2, color: "error.main" }}
                                        >
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                        <Checkbox
                                            checked={task.completed}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={() => handleToggleCompleted(task)}
                                            sx={{ position: "absolute", bottom: 2, right: 2 }}
                                        />
                                        <Box
                                            sx={{
                                                textDecoration: task.completed ? "line-through" : "none",
                                                color: task.completed ? "text.disabled" : "text.primary",
                                                whiteSpace: "pre-wrap",
                                                wordBreak: "break-word",
                                            }}
                                        >
                                            <Typography variant="h6">{task.name}</Typography>
                                            <Typography variant="body2">{task.description}</Typography>
                                            {task.date && (
                                                <Typography variant="caption">
                                                    Ska utföras innan: {task.date}
                                                </Typography>
                                            )}
                                        </Box>
                                        {showConfetti && sweepingTaskId === task.id && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: 200,
                                                    height: 200,
                                                    pointerEvents: 'none',
                                                    zIndex: 10,
                                                }}
                                            >
                                                <Lottie
                                                    animationData={confettiAnimation}
                                                    loop={false}
                                                    autoplay
                                                    style={{ width: '100%', height: '100%' }}
                                                />
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Completed */}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Slutförda ({completedTasks.length})</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack spacing={1}>
                            <AnimatePresence>
                                {completedTasks.map((task) => {
                                    const cat = categories.find((c) => c.id === task.categoryId) || null;
                                    return (
                                        <motion.div
                                            key={task.id}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            variants={variants}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Card variant="outlined">
                                                <CardContent
                                                    sx={{
                                                        maxHeight:"90px",
                                                        minHeight:"50px",
                                                        display:"flex",
                                                        alignItems:"center",
                                                        opacity: 0.7,
                                                        textDecoration: "line-through",
                                                        position: "relative",
                                                        borderLeft: cat?.color ? `4px solid ${cat.color}` : "4px solid transparent",
                                                        backgroundColor: cat?.color ? alpha(cat.color, 0.1) : "background.paper",
                                                    }}
                                                >
                                                    <IconButton
                                                        onClick={() => deleteTask(task.id)}
                                                        sx={{ position: "absolute", top: 2, right: 2, color: "error.main" }}
                                                    >
                                                        <DeleteOutlineOutlinedIcon />
                                                    </IconButton>
                                                    <Checkbox
                                                        checked={task.completed}
                                                        onChange={() => handleToggleCompleted(task)}
                                                        sx={{ position: "absolute", bottom: 2, right: 2 }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            cursor: "pointer",
                                                            p: 1.5,
                                                            textDecoration: "line-through",
                                                            color: "text.disabled",
                                                            whiteSpace: "pre-wrap",
                                                            wordBreak: "break-word",
                                                        }}
                                                    >
                                                        <Typography variant="h6">{task.name}</Typography>
                                                        <Typography variant="body2">{task.description}</Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </Stack>
        </Box>
    );
}