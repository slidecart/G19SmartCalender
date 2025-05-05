import {Box, Button, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";
import dayjs from "dayjs";
import React from "react";

function TaskDialog({ open, onClose, task, onEdit }){
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
                            <strong>Tid:</strong> {dayjs(`1970-01-01T${task?.startTime}`).format("HH:mm")} - {dayjs(`1970-01-01T${task?.endTime}`).format("HH:mm")}
                        </Typography>
                    </Box>
                </DialogContent>

                {/* Actions Section */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
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