import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import {useState} from "react";
import CreateCategoryDialog from "../CreateCategoryDialog";

const AddActivity = ({ open, onClose, formData, handleChange, handleSubmit, mode, categories, onCreateCategory }) => {
    const isEditMode = mode === "edit";
    const [openCreateCategoryDialog, setOpenCreateCategoryDialog] = useState(false);


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
                            label="Kategori"
                            onChange={(e) => {
                                if (e.target.value === "create-category-option") {
                                    setOpenCreateCategoryDialog(true);
                                } else {
                                    handleChange(e);
                                }
                            }}
                        >
                            {categories &&
                                categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            <MenuItem value="create-category-option">
                                <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                                    Skapa ny kategori
                                </Box>
                            </MenuItem>
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
            <CreateCategoryDialog
                open={openCreateCategoryDialog}
                onClose={() => setOpenCreateCategoryDialog(false)}
                onCreate={onCreateCategory}
            />
        </Dialog>
    );
};

export default AddActivity;