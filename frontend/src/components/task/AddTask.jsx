import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";


const AddTask = ({ open, onClose, formData, handleChange, handleSubmit}) => {
    return(
        <Dialog open={open} onClose={onClose}>

            <DialogTitle m={1}>
                Lägg till en task
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
                        name="location"
                        label="Plats"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </Box>
                <Box mb ={2}>
                    <TextField
                        name="category"
                        label="Kategori"
                        value={formData.categoryId}
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
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick = {onClose}>Avbryt</Button>
                <Button onClick = {handleSubmit} variant="contained">Spara</Button>
            </DialogActions>
        </Dialog>
    )
};

export default AddTask;