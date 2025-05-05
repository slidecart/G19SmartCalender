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
import AddTask from "../scenes/addTask";
import {fetchData} from "../hooks/FetchData";

function TaskTodo(){

    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);


    const [openDialog, setOpenDialog] = useState(false);
    const [formData, setFormData] = useState({
        name:"",
        description:"",
        location:"",
        date:"",
        categoryId:"",
        id:"",
        completed:false
    })

    const handleSubmit = async () =>{
        try{
            const response = await fetchData("tasks/create", "POST", formData);
            console.log(response);

            setOpenDialog(false);
            setFormData({
                name:"",
                description:"",
                location:"",
                date:"",
                categoryId:"",
                userId:"",
                completed:false
            });
            setTasks((prevTasks) => [...prevTasks, response]);
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

    const handleDelete = async (taskId) => {
        try {
            await fetchData(`tasks/delete/${taskId}`, "DELETE", null); 
            setTasks((prev) => prev.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error("Fel vid borttagning: ", error.message);
        }
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

    return (
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
                    onClick={() => setOpenDialog(true)}
                >
                    <AddIcon />
                    Ny Task
                </IconButton>
            </Box>


            <AddTask
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <Stack spacing={2}>
                {tasks.map((task, index) => (
                <Card key={task.id} sx={{ bgcolor: "white", p: 2, borderRadius: 2, mb: 1 }}>
                    <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{task.name}</Typography>
                                <Typography>{task.description}</Typography>
                            </Box>
                            <IconButton onClick={() => handleDelete(task.id)} aria-label="delete" sx={{ color: "red" }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
                ))}
            </Stack>

        </Container>
    );
}

export default TaskTodo;