import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import { useCategoryContext } from "../../context/CategoryContext";
import dayjs from "dayjs";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function TaskDialog({ open, onClose, task, onEdit, onDelete, onConvert}){
    const { categories } = useCategoryContext();
    const category = categories.find((c) => c.id === task?.categoryId);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: "background.paper", // Matches theme background
                    borderRadius: 2, // Rounded corners
                    boxShadow: 3, // Subtle shadow
                },
            }}
        >

      {/* Delete button in the top right */}
        <Button
            onClick={onDelete}
            variant="text"
            sx={{
                position: "absolute",
                top: 8,
                right: 8,
                textTransform: "none",
                color: "error.main",
                display: "flex",
                alignItems: "center",
                p: 0.5,
                transition: "all 0.3s ease",
                "& .hoverText": {
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: 0,
                    opacity: 0,
                    transition: "all 0.3s ease",
                },
                "&:hover .hoverText": {
                    width: "auto",
                    opacity: 1,
                    mr: 1,
                },
            }}
        >
            <span className="hoverText">Ta bort</span>
            <DeleteOutlineOutlinedIcon />
        </Button>

            <Box sx={{ display: "flex", flexDirection: "column", p: 3 }}>
                {/* Title Section */}
                <DialogTitle
                    sx={{
                        textAlign: "left",
                        fontWeight: "bold",
                        fontSize: "1.8rem",
                        color: "text.primary", // Matches theme text color
                        pb: 1,
                    }}
                >
                    {task?.name || "Titel"}
                </DialogTitle>

                {/* Content Section */}
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography variant="body1" sx={{ color: "text.secondary" }}>
                            <strong>Beskrivning:</strong> {task?.description || "Ingen beskrivning tillgänglig."}
                        </Typography>

                        <Typography variant="body1" sx={{ color: "text.secondary" }}>
                            <strong>Plats:</strong> {task?.location || "Ingen plats angiven."}
                        </Typography>

                        <Typography variant="body1" sx={{ color: "text.secondary" }}>
                            <strong>Kategori:</strong> {category ? category.name : "Ingen kategori angiven."}
                        </Typography>

                        <Typography variant="body1" sx={{ color: "text.secondary" }}>
                            <strong>Datum:</strong> {task?.date ? dayjs(task.date).format("YYYY-MM-DD") : "Ingen deadline."}
                        </Typography>
                    </Box>
                </DialogContent>

                {/* Actions Section */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
                <Button
                        onClick={onConvert}
                        variant="outlined"
                        color="primary"
                        sx={{ textTransform: "none", px: 3 }}
                    >
                        Gör om till aktivitet 
                    </Button>
                    <Button
                        onClick={onEdit}
                        variant="outlined"
                        color="primary"
                        sx={{ textTransform: "none", px: 3 }}
                    >
                        Redigera
                    </Button>
                    <Button
                        onClick={onClose}
                        variant="contained"
                        color="primary"
                        sx={{ textTransform: "none", px: 3 }}
                    >
                        Stäng
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}

export default TaskDialog;