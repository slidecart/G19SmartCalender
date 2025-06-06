import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

function ConfirmationDialog({ open, onClose, onConfirm, title, content, buttonText }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{
      sx: {
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }
    }}>
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "left" }}>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ textAlign: "left", color: "text.secondary" }}>
          {content}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: "flex-end" }}>
        <Button onClick={onClose} variant="outlined" sx={{ textTransform: "none" }}>
          Avbryt
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" sx={{ textTransform: "none" }}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;