import React from "react";
import { Dialog, DialogTitle, DialogContent, Box, Typography, Button } from "@mui/material";
import dayjs from "dayjs";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function ActivityDialog({ open, onClose, activity, onEdit, onDelete }) {
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


      <Box sx={{display: "flex", flexDirection: "column", p: 3}}>
        {/* Title Section */}
        <DialogTitle
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            fontSize: "1.8rem",
            color: "text.primary",
            pb: 1,
          }}
        >
          {activity?.name || "Titel"}
        </DialogTitle>

        {/* Content Section */}
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              <strong>Beskrivning:</strong> {activity?.description || "Ingen beskrivning tillgänglig."}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              <strong>Plats:</strong> {activity?.location || "Ingen plats angiven."}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              <strong>Kategori:</strong> {activity?.categoryName || "Ingen kategori angiven."}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              <strong>Datum:</strong> {activity?.date || "Inget datum angivet."}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              <strong>Tid:</strong> {dayjs(`1970-01-01T${activity?.startTime}`).format("HH:mm")} - {dayjs(`1970-01-01T${activity?.endTime}`).format("HH:mm")}
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

export default ActivityDialog;