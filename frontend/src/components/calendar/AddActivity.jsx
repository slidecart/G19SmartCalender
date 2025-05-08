/*
 * File: frontend/src/components/calendar/AddActivity.jsx
 * Description: Component for adding or editing an activity in the calendar.
 * It provides a dialog for entering event details such as title, attendees, date, time,
 * toggles for all-day/recurring events, location and notes. It also shows a preview area.
 */

import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Grid,
    TextField,
    Box,
    Link,
    Switch,
    FormControlLabel,
    Divider,
    Menu,
    MenuItem,
    Tooltip, Paper, Icon, Typography, Collapse,
} from "@mui/material";
import {
  Save as SaveIcon,
  Close as CloseIcon,
  ReplyAll as ReplyAllIcon,
  EventBusy as BusyIcon,
  Repeat as RecurringIcon,
  Lock as PrivateIcon,
  AttachFile as AttachIcon,
  InsertEmoticon as EmoticonIcon,
} from "@mui/icons-material";
import { useCalendarContext } from "../../context/CalendarContext";
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

import {MiniCalendar} from "./MiniCalendar";
import CreateCategoryDialog from "../CreateCategoryDialog";




export default function AddActivity({ open, onClose, mode }) {
    // Destructure necessary context values and handlers from the calendar context
    const {
        formData,
        handleChange,
        createOrUpdateActivity,
        categories,
    } = useCalendarContext();
    const { date, startTime, endTime } = formData;


    // State for managing the category menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const [openCreateCategoryDialog, setOpenCreateCategoryDialog] = React.useState(false);

    // Local state for handling "all day"
    const [allDay, setAllDay] = React.useState(false);
    const handleAllDayChange = (event) => {
        setAllDay(!allDay);
        if (!allDay) {
            // If "all day" is checked, set start and end time to 00:00
            handleChange({ target: { name: "startTime", value: "00:00" } });
            handleChange({ target: { name: "endTime", value: "23:59" } });
        } else {
            // Reset to default times if unchecked
            handleChange({ target: { name: "startTime", value: "08:00" } });
            handleChange({ target: { name: "endTime", value: "17:00" } });
        }
    }


    const [recurring, setRecurring] = React.useState(false);

    // Handler for saving activity data (both add and edit)
    const handleSave = async () => {
        try {
            await createOrUpdateActivity(formData, mode, );
            onClose();           // ◀︎ only close after success
        } catch (err) {
            console.error("Couldn’t save:", err);
            alert("Något gick fel vid sparandet");
        }
    };

    return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{ sx: { height: "90vh", display: "flex", flexDirection: "column" } }}
    >
      {/* Toolbar section including save button, icon buttons for other actions, and close button */}
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar variant="dense" sx={{ justifyContent: "space-between", px: 2 }}>
          <Box>
            {/* Save button */}
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{ mr: 2 }}
            >
              Spara
            </Button>
            {/* Appbar icons*/}
            <Tooltip title="Kategorier">
              <IconButton size="small" onClick={handleMenuClick}>
                <LocalOfferOutlinedIcon />
                  Kategorier
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {categories.map((cat) => (
                <MenuItem
                  key={cat.id}
                  onClick={() => {
                    handleChange({ target: { name: "categoryId", value: cat.id } });
                    handleMenuClose();
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        backgroundColor: cat.color,
                        borderRadius: "50%",
                        mr: 1,
                      }}
                    />
                    {cat.name}
                  </Box>
                </MenuItem>
              ))}
              <Divider />
              <MenuItem
                onClick={() => {
                  setOpenCreateCategoryDialog(true);
                  handleMenuClose();
                }}
              >
                <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                  Skapa ny kategori
                </Box>
              </MenuItem>
            </Menu>

          </Box>
          {/* Close dialog button */}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
        <Divider />
      {/* Content section containing form fields and preview area */}
        <DialogContent
            sx={{
                flex: 1,
                p: 0,                    // no extra padding so our flex children touch the edges
                display: "flex",         // make it a row
                height: "100%",
            }}
        >
            {/* === LEFT: FORM PANEL  === */}
            <Box
                sx={{
                    flex: 7,
                    display: "flex",
                    flexDirection: "column",
                    borderRight: 1,
                    borderColor: "divider",
                }}
            >
                <Paper
                    sx={{
                        p: 2,
                        flex: 1,             // fill remaining height
                        overflowY: "auto",   // scroll if it overflows
                    }}
                >
                    <TextField
                        name="name"
                        fullWidth
                        placeholder="Lägg till en rubrik"
                        variant="standard"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        InputProps={{
                            disableUnderline: true,
                            sx: { fontSize: 24, fontWeight: 500, mb: 2 },
                        }}
                    />
                    <Divider />
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        my={2}
                        sx={{
                            // animate the gap shrinking when allDay = true
                            transition: "gap 300ms ease"
                        }}>
                        <TextField
                            name="date"
                            type="date"
                            label="Datum"
                            variant="outlined"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            value={formData.date}
                            onChange={handleChange}
                            required
                            sx={{ width: 150 }}
                        />
                        <Box>
                          <Collapse
                              in={!allDay}
                              orientation="horizontal"
                              timeout={300}
                              collapsedSize={0}>
                            <Box display="flex" alignItems="center" gap={1} sx={{ overflow: "hidden" }}>
                              <TextField
                                name="startTime"
                                type="time"
                                label="Från"
                                variant="outlined"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                value={formData.startTime}
                                onChange={handleChange}
                                required
                                sx={{ width: 100 }}
                              />
                              <TextField
                                name="endTime"
                                type="time"
                                label="Till"
                                variant="outlined"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                                value={formData.endTime}
                                onChange={handleChange}
                                required
                                sx={{ width: 100 }}
                              />
                            </Box>
                          </Collapse>
                        </Box>
                        <FormControlLabel
                            control={<Switch checked={allDay}
                                             onChange={(e) => handleAllDayChange(e.target.checked)} />}
                            label="Heldag"
                        />
                        <Box>

                            <FormControlLabel
                                control={
                                    <IconButton onClick={() => setRecurring(prev => !prev)}>
                                        <AutorenewOutlinedIcon color={recurring ? "primary" : "inherit"} />
                                    </IconButton>
                                }
                                label="Återkommande"
                            />

                        </Box>
                    </Box>
                    <Divider />
                    <TextField
                        name="location"
                        fullWidth
                        placeholder="Lägg till plats"
                        variant="outlined"
                        size="small"
                        value={formData.location}
                        onChange={handleChange}
                        sx={{ my: 2 }}
                    />
                    <TextField
                        name="description"
                        fullWidth
                        placeholder="Lägg till anteckningar"
                        variant="outlined"
                        multiline
                        rows={6}
                        value={formData.description}
                        onChange={handleChange}
                    />
                </Paper>
            </Box>

            {/* === RIGHT: PREVIEW PANEL === */}
            <Box
                sx={{
                    flex: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                }}
            >
                <Paper
                    sx={{
                        p: 2,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Förhandsgranskning
                        </Typography>
                        <Typography variant="body1">
                            {formData.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {date} {startTime} - {endTime}
                        </Typography>
                    </Box>
                    <MiniCalendar
                        date={date}
                        startTime={startTime}
                        endTime={endTime}
                    />
                </Paper>
            </Box>
        </DialogContent>
      {/* Footer section with additional attachment and icon buttons */}
      <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
        <Box>
          {[AttachIcon, EmoticonIcon].map((Icon, i) => (
            <Tooltip key={i} title="">
              <IconButton size="small">
                <Icon />
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </DialogActions>
        <CreateCategoryDialog
            open={openCreateCategoryDialog}
            onClose={() => setOpenCreateCategoryDialog(false)}
        />
    </Dialog>
  );
}