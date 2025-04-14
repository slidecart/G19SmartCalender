import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from "@mui/material";

const AddActivity = ({ open, onClose, formData, handleChange, handleSubmit }) => {
    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle m={1}>
                Lägg till aktivitet
            </DialogTitle>

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
                <Box mb ={2}>
                    <TextField  
                        name="categoryId"
                        label="Kategori ID"
                        type="number"
                        value={formData.categoryId}
                        onChange={handleChange}
                    />
                </Box>                
                <Box mb ={2}>
                    <TextField
                        name="userId"
                        label="Användar-ID"
                        type="number"
                        value={formData.userId}
                        onChange={handleChange}
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