import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import React from "react";
import CreateCategoryDialog from "../CreateCategoryDialog";
import {useCalendarContext} from "../../context/CalendarContext";

const AddActivity = ({ open, onClose, mode, formData, }) => {
    const isEditMode = mode === "edit";
    const {
        handleChange,
        createOrUpdateActivity,
        categories,
    } = useCalendarContext();

    const [openCreateCategoryDialog, setOpenCreateCategoryDialog] = React.useState(false);

    const handleSave = async () => {
        try {
            await createOrUpdateActivity(formData, mode, );
            onClose();           // ◀︎ only close after success
        } catch (err) {
            console.error("Couldn’t save:", err);
            alert("Något gick fel vid sparandet");
        }
    };

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
                            value={formData.categoryId || ""}
                            label="Kategori"
                            onChange={(e) => {
                                if (e.target.value === "create-category-option") {
                                    setOpenCreateCategoryDialog(true);
                                } else {
                                    handleChange(e);
                                }
                            }}
                        >

                            <MenuItem value="">
                                <em>Ingen kategori</em>
                            </MenuItem>

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
                <Button
                    onClick={handleSave}
                    variant="contained">Spara</Button>
            </DialogActions>
            <CreateCategoryDialog
                open={openCreateCategoryDialog}
                onClose={() => setOpenCreateCategoryDialog(false)}
            />
        </Dialog>
    );
};

export default AddActivity;