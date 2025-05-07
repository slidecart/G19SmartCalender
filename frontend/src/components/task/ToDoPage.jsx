import {
    Container,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Stack,
    Button,
    IconButton,
    Box,
    Card, CardContent
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {useEffect, useState} from "react";
import AddTask from "./AddTask";
import {fetchData} from "../../hooks/FetchData";
import TaskDialog from "./TaskDialog";
import ConfirmationDialog from "../ConfirmationDialog";
import Body from "../containers/body"

function ToDoPage(){

    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name:"",
        description:"",
        location:"",
        date:"",
        categoryId:"",
        id:"",
        completed:false
    })

    const [selectedTask, setSelectedTask] = useState(null);
    const [taskDialogOpen, setTaskDialogOpen] = useState(false);


    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setTaskDialogOpen(true);
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState(null); // "add" or "edit"

    const openAddDialog = () => {
        setDialogMode("add");
        setIsDialogOpen(true);
    };

    const openEditDialog = (task) => {
        setFormData(task);
        setDialogMode("edit");
        setIsDialogOpen(true);
        setTaskDialogOpen(false);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setFormData({
            name:"",
            description:"",
            location:"",
            date:"",
            categoryId:"",
            id:"",
            completed:false
        });
    };


    const handleSubmit = async () =>{
        try{
            console.log(selectedTask);
            // Checks if the user is in edit mode or not
            const apiPath = dialogMode === "edit" ? `tasks/edit/${selectedTask.id}` : "tasks/create";
            const method = dialogMode === "edit" ? "PUT" : "POST";

            const response = await fetchData(apiPath, method, formData);
            console.log(response);

            setIsDialogOpen(false);
            setFormData({
                name:"",
                description:"",
                location:"",
                date:"",
                categoryId:"",
                userId:"",
                completed:false
            });

            if (method === "POST") {
                setTasks((prevTasks) => [...prevTasks, response]); // Adds the new task to the list
            } else {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === response.id ? response : task
                    )
                ); // Updates the existing task in the list
            }
        } catch (error){
            console.error(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:value,
        }));
    }
    
    useEffect(() => {
        const fetchTasks = async() => {
            try {
                const response = await fetchData("tasks/all", "GET", "");


                setTasks(response);
            } catch (error) {
                console.error("Fel vid hämtning: ", error.message);
                setError(error.message); // Visar eventuella fel
            }
        };
        fetchTasks();
    }, []);


    {/* Delete function */}
    const [confirmDeleteOpen, setConfirmationDeleteOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const requestDelete = (task) => {
        setTaskToDelete(task);
        setConfirmationDeleteOpen(true);
    }

    const handleDelete = async () => {
        if (!taskToDelete) return;

        try {
            await fetchData(`tasks/delete/${taskToDelete.id}`, "DELETE");
            setTasks(prev => prev.filter(a => a.id !== taskToDelete.id));

        } catch (error) {
            console.error("Fel vid borttagning: ", error.message);
        } finally {
            setConfirmationDeleteOpen(false);
            setTaskToDelete(null);
            setSelectedTask(null);
        }
    };

    return (
        <Body>
            <Container maxWidth="xs" sx={{ bgcolor: "#0077ff7e", p: 2, mt: 2, borderRadius: 2, fontFamily: "'Fira Code', 'Consolas', 'monospace'"}}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                    mb={2}>

                    <Typography variant="h1" align="center" sx={{ fontWeight: "bold", textDecoration: "underline", color: "black"}}>
                        TASKS
                    </Typography>
                    <IconButton
                        size="small"
                        sx={{ color: "black" }}
                        onClick={() => openAddDialog()}
                    >
                        <AddIcon />
                        Ny Task
                    </IconButton>
                </Box>

                <Stack spacing={2}>
                    {tasks.map((task, index) => (
                    <Card key={task.id} sx={{ bgcolor: "white", p: 2, borderRadius: 2, mb: 1 }}>
                        <CardContent>
                            <Box
                                onClick={() => handleTaskClick(task)}
                                display="flex" justifyContent="space-between" alignItems="center">
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>{task.name}</Typography>
                                    <Typography>{task.description}</Typography>
                                </Box>


                            </Box>
                        </CardContent>
                    </Card>
                    ))}
                </Stack>

                <AddTask
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />


                {/* Shows task when clicked */}
                {selectedTask && (
                    <TaskDialog
                        open={taskDialogOpen}
                        onClose={() => setTaskDialogOpen(false)} // Closes task dialog
                        task={selectedTask}
                        onEdit={() => openEditDialog(selectedTask)} // Opens edit dialog
                        onDelete={() => requestDelete(selectedTask)} // Deletes task
                    />
                )}


                {/* Shows confirmation dialog for delete */}
                {confirmDeleteOpen && (
                    <ConfirmationDialog
                        open={confirmDeleteOpen}
                        onClose={() => setConfirmationDeleteOpen(false)}
                        onConfirm={handleDelete}
                        title="Bekräfta borttagning"
                        content="Är du säker på att du vill ta bort ToDo?"
                    />
                )}
            </Container>
        </Body>
    );
}

export default ToDoPage;