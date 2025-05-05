import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const AddActivity = ({ open, onClose, formData, handleChange, handleSubmit, mode, categories, onCreateCategory }) => {
    const isEditMode = mode === "edit";

    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle m={1}>
                {isEditMode ? "Redigera aktivitet" : "Lägg till aktivitet"}
            </DialogTitle>
            <DialogContent sx={{width:"400px", ml:1}}>
                <Box mb={2}>
                    <TextField
                        name="name"
                        label="Titel"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        name="description"
                        label="Beskrivning"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        name="location"
                        label="Plats"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </Box>
                <Box mb={2}>
                    <FormControl fullWidth>
                        <InputLabel id="category-select-label">Kategori</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            label="Kategori"
                        >
                            {categories && categories.length > 0 ?
                                categories.map(category => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))
                                :
                                <MenuItem disabled value="">
                                    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                        <span>No categories created</span>
                                        <span
                                            style={{color:"blue", textDecoration:"underline", cursor:"pointer"}}
                                            onClick={onCreateCategory}
                                        >
                                            Create a category
                                        </span>
                                    </Box>
                                </MenuItem>
                            }
                        </Select>
                    </FormControl>
                </Box>
                <Box mb={2}>
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
                <Box mb={2}>
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
                <Box mb={2}>
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
                <Button onClick={onClose}>Avbryt</Button>
                <Button onClick={handleSubmit} variant="contained">Spara</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddActivity;