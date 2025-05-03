import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from "@mui/material";

const AddActivity = ({ open, onClose, formData, handleChange, handleSubmit, mode }) => {
    const isEditMode = mode === "edit";

    return(
        <Dialog open={open} onClose={onClose}>

            {/* Title for the dialog */}
            <DialogTitle m={1}>
                {isEditMode ? "Redigera aktivitet" : "Lägg till aktivitet"}
            </DialogTitle>

            {/* Dialog content allowing the user to enter information about created activity */}
            <DialogContent sx={{width:"400px", ml:1}}>
                <Box mb ={2}>
                    <TextField 
                        name="name" 
                        label="Titel" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required
                    />
                </Box>
                <Box mb ={2}>
                    <TextField 
                        name="description" 
                        label="Beskrivning" 
                        value={formData.description} 
                        onChange={handleChange}
                    />
                </Box>
                <Box mb ={2}>
                    <TextField
                        name="location"
                        label="Plats"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </Box>
                <Box mb ={2}>
                    <TextField 
                        name="date" 
                        label="Datum" 
                        type="date" 
                        InputLabelProps={{shrink: true}} 
                        value={formData.date} 
                        onChange={handleChange} 
                        required
                    />
                </Box>                
                <Box mb ={2}>
                    <TextField 
                        name="startTime" 
                        label="Starttid"   
                        type="time" 
                        InputLabelProps={{shrink: true}} 
                        value={formData.startTime} 
                        onChange={handleChange} 
                        required
                    />
                </Box>                
                <Box mb ={2}>
                    <TextField
                        name="endTime"
                        label="Sluttid"
                        type="time"
                        InputLabelProps={{ shrink: true }} 
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                    />
                </Box>                
            </DialogContent>

            <DialogActions>
                <Button onClick = {onClose}>Avbryt</Button>
                <Button onClick = {handleSubmit} variant="contained">Spara</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddActivity;