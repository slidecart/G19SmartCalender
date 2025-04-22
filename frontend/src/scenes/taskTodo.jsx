import { Container, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function TaskTodo(){
    return (
        <Container maxWidth="xs" sx={{ bgcolor: "#0077ff7e", p: 2, mt: 2, borderRadius: 2 }}>
            <Typography variant="h1" align="center" sx={{ fontweight: "bold", textDecoration: "underline", color: "black"}}>
                TASKS
            </Typography>

            <Accordion disableGutters sx={{ bgcolor: "white", mb: 1}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ fontweight: "bold" }}>Kurser</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Systemutveckling</Typography>
                    <Typography>Databasteknik</Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
    );
}

export default TaskTodo;