// frontend/src/components/task/ToDoPage.jsx
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

    setTimeout(async () => {
        await toggleComplete(task);
        setSweepingTaskId(null);
    }, 300);
  };

  const incompleteTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

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
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h1">ToDo</Typography>
            </Box>

              {/* quick‑add */}
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
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, ml: 2, overflowY:"auto"}}>
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
                      <Typography variant="caption" color="text.secondary">
                        {newTodoCategory
                            ? categories.find((cat) => cat.id === newTodoCategory)?.name || "Kategori"
                            : "Kategori"}
                      </Typography>

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
                        <Typography variant="caption" color="text.secondary">
                          {newTodoDate ? dayjs(newTodoDate).format("D MMMM YYYY") : "Datum"}
                        </Typography>
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

              {/* LISTS */}
              <Stack spacing={2}>
                {loading && <Typography>Loading…</Typography>}
                {error && <Typography color="error">{error}</Typography>}

                {/* AnimatePresence for incomplete tasks */}
                <AnimatePresence>
                  {incompleteTasks
                    .sort((a, b) => a.date?.localeCompare(b.date))
                    .map((task) => {
                      const cat = categories.find((c) => c.id === task.categoryId) || null;
                      return (
                        <motion.div
                          key={task.id}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          variants={{
                            initial: { opacity: 0, x: -50 },
                            animate: { opacity: 1, x: 0 },
                            exit: { opacity: 0, x: 50 },
                          }}
                          transition={{ duration: 0.3, delay: task.id === sweepingTaskId ? 0.5 : 0 }}
                        >
                          <Card maxHeight="500px">
                            <CardContent
                                sx={{
                                  maxHeight:"90px",
                                  minHeight:"50px",
                                  display: "flex",
                                  alignItems:"center",
                                  position: "relative",
                                  overflow: "hidden",
                                  borderLeft: cat?.color ? `4px solid ${cat.color}` : "4px solid #ccc",
                                  backgroundColor: cat?.color ? alpha(cat.color, 0.1) : "background.paper",
                                  transition: "background-color 0.3s ease",
                                  "&:hover": {
                                    backgroundColor: cat?.color
                                        ? alpha(cat.color, 0.4)
                                        : "action.hover",
                                  },
                                }}
                            >
                              {sweepingTaskId === task.id && (
                                  <Box
                                      sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: "-100%",
                                        width: "100%",
                                        height: "100%",
                                        bgcolor: cat?.color ? alpha(cat.color, 0.5) : alpha("#4BB543", 0.7 ),
                                        animation: "sweep 0.5s ease-in forwards",
                                        zIndex: 0,
                                        "@keyframes sweep": {
                                          "0%": {
                                            left: "-100%",
                                          },
                                          "100%": {
                                            left: 0,
                                          },
                                        },
                                      }}
                                  />
                              )}
                              <IconButton
                                  onClick={() => {
                                    if (task.completed) {
                                      deleteTask(task.id);
                                    } else {
                                      setTaskToDelete(task);
                                      setConfirmDeleteOpen(true);
                                    }
                                  }}
                                  sx={{ position: "absolute", top: 2, right: 2, color: "error.main", zIndex: 1 }}
                              >
                                <DeleteOutlineOutlinedIcon />
                              </IconButton>
                              <Checkbox
                                  checked={task.completed}
                                  onChange={() => handleToggleCompleted(task)}
                                  sx={{ position: "absolute", bottom: 2, right: 2, zIndex: 1 }}
                              />
                              <Box
                                  onClick={() => handleTaskClick(task)}
                                  sx={{
                                    cursor: "pointer",
                                    textDecoration: task.completed ? "line-through" : "none",
                                    color: task.completed ? "text.disabled" : "text.primary",
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-word",
                                    zIndex: 1,
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
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                </AnimatePresence>

                {/* completed */}
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
                              variants={{
                                initial: { opacity: 0, x: -50 },
                                animate: { opacity: 1, x: 0 },
                                exit: { opacity: 0, x: 50 },
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <Card variant="outlined" sx={{ overflowY:"auto"}}>
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
                                      onClick={() => handleTaskClick(task)}
                                      sx={{
                                        cursor: "pointer",
                                        p: 1.5,
                                        textDecoration: task.completed ? "line-through" : "none",
                                        color: task.completed ? "text.disabled" : "text.primary",
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
                openAddDialog(selectedTask, selectedTask.id);
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