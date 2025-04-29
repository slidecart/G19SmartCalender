import { Container, Accordion, AccordionSummary, AccordionDetails, Typography, Stack, Button, IconButton, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

function TaskTodo(){
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
                <IconButton size="small" sx={{ color: "black" }}>
                    <AddIcon />
                    Ny Task
                </IconButton>
            </Box>
            {/* kurser */}
            <Accordion disableGutters sx={{ bgcolor: "white", mb: 1}}>
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
            </Accordion>
        </Container>
    );
}

export default TaskTodo;