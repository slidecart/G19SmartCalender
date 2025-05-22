import React, {useState} from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import { useCategoryContext } from "../context/CategoryContext";

const CreateCategoryDialog = ({ open, onClose, onCreate }) => {
    const [categoryName, setCategoryName] = useState("");
    const [selectedColor, setSelectedColor] = useState("#60f085");
    const { createCategory } = useCategoryContext();

    const handleCreate = () => {
        if (!categoryName) {
            alert("Vänligen ange ett namn för kategorin.");
            return;
        }

        onCreate({ name: categoryName, color: selectedColor });

        setCategoryName("");
        setSelectedColor("#60f085");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Skapa ny kategori</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Kategorinamn"
                    fullWidth
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                />
                <Box mt={2}>
                    <TextField
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        fullWidth
                        label="Välj en färg"
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Avbryt</Button>
                <Button onClick={handleCreate} variant="contained">
                    Spara
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateCategoryDialog;