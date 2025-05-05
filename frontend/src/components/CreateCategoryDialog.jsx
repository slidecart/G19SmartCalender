import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from "@mui/material";

const ColorPickerInput = ({ selectedColor, onChange }) => (
    <Box mt={2}>
        <TextField
            type="color"
            value={selectedColor}
            onChange={(e) => onChange(e.target.value)}
            fullWidth
            label="Välj en färg"
            InputLabelProps={{ shrink: true }}
        />
    </Box>
);

const CreateCategoryDialog = ({ open, onClose, onCreate }) => {
    const [categoryName, setCategoryName] = useState("");
    const [selectedColor, setSelectedColor] = useState("#60f085");


    const handleCreate = () => {
        if (categoryName.trim()) {
            onCreate({name: categoryName, color: selectedColor});
            setCategoryName("");
            setSelectedColor("#ffffff");
            onClose();
        }
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
                />
                <ColorPickerInput selectedColor={selectedColor} onChange={setSelectedColor} />
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