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




            {/*<Accordion disableGutters sx={{ bgcolor: "white", mb: 1}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: "bold" }}>Kurser</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={2}>
                        <Typography>Systemutveckling</Typography>
                        <Typography>Databasteknik</Typography>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            size="small"
                            sx={{ alignSelf: "flex-start", mt: 1}}>
                            Lägg till
                        </Button>
                    </Stack>
                </AccordionDetails>
            </Accordion>


            <Accordion disableGutters sx={{ bgcolor: "white", mb: 1}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: "bold" }}>Fritid & hobby</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={2}>
                        <Typography>Träning</Typography>
                        <Typography>Handla</Typography>
                        <Typography>Snäll</Typography>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            size="small"
                            sx={{ alignSelf: "flex-start", mt: 1}}>
                            Lägg till
                        </Button>
                    </Stack>
                </AccordionDetails>
            </Accordion>

            <Accordion disableGutters sx={{ bgcolor: "white", mb: 1}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontWeight: "bold" }}>Socialt</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={2}>
                        <Typography>Familj</Typography>
                        <Typography>Vänner</Typography>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            size="small"
                            sx={{ alignSelf: "flex-start", mt: 1}}>
                            Lägg till
                        </Button>
                    </Stack>
                </AccordionDetails>
            </Accordion>*/}

            <Stack spacing={2}>
                {tasks.map((task, index) => (
                <Card key={task.id} sx={{ bgcolor: "white", p: 2, borderRadius: 2, mb: 1 }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{task.name}</Typography>
                        <Typography>{task.description}</Typography>
                    </CardContent>
                </Card>
                ))}
            </Stack>

        </Container>
    );
}

export default TaskTodo;