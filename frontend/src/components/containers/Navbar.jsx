// language: JavaScript
import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Popper,
    Paper,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    ClickAwayListener,
    useTheme,
    InputAdornment
} from "@mui/material";
import ProfileIcon from "./ProfilePopUpFrame";
import SearchIcon from "@mui/icons-material/Search";
import { useCalendarContext } from "../../context/CalendarContext";
import {fetchData} from "../../hooks/FetchData";

export default function Navbar({ onNavigate }) {
    const theme = useTheme();
    const { navigateToDate } = useCalendarContext();

    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openPopper, setOpenPopper] = useState(false);

    const anchorRef = useRef(null);
    const debounceRef = useRef();

    // fire search 500ms after last keystroke
    useEffect(() => {
        if (!searchText) {
            setResults(null);
            setOpenPopper(false);
            return;
        }

        setLoading(true);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            fetchData(`user/search?query=${encodeURIComponent(searchText)}`)
                .then(data => {
                    // your backend returns either { searchText, activity, task }
                    // or { message: "Search results not found" }
                    if (data.searchText) {
                        setResults(data);
                    } else {
                        setResults({ activity: [], task: [], message: data.message });
                    }
                    setOpenPopper(true);
                })
                .catch(() => {
                    setResults({ activity: [], task: [], message: "No results." });
                    setOpenPopper(true);
                })
                .finally(() => setLoading(false));
        }, 500);

        return () => clearTimeout(debounceRef.current);
    }, [searchText]);

    const handleSelect = (item) => {
        // item might be { name, date, ... }
        // assume date is an ISO string: "YYYY-MM-DD"
        if (item.date) {
            navigateToDate(item.date);
        }
        // close dropdown & clear
        setOpenPopper(false);
        setSearchText("");
    };

    return (
        <Box
            component="header"
            sx={{
                display: "flex",
                alignItems: "center",
                height: 48,
                px: 2,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                boxShadow: `0 1px 2px ${theme.palette.divider}`,
                zIndex: theme.zIndex.appBar
            }}
        >
            {/* Title */}
            <Typography
                variant="h6"
                noWrap
                sx={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    letterSpacing: ".05rem"
                }}
            >
                SmartCalendar
            </Typography>

            {/* Search Bar */}
            <Box sx={{ mx: 2, position: "relative" }}>
                <TextField
                    size="small"
                    placeholder="Sök"
                    variant="outlined"
                    value={searchText}
                    inputRef={anchorRef}
                    onChange={e => setSearchText(e.target.value)}
                    InputProps={{
                        endAdornment: loading ? (
                            <CircularProgress color="inherit" size={16} />
                        ) : null
                    }}
                    sx={{
                        bgcolor: theme.palette.background.paper,
                        borderRadius: 1,
                        width: 200
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                        endAdornment: loading ? (
                            <CircularProgress color="inherit" size={16} />
                        ) : null,
                        sx: {
                            height: 32,
                            "& .MuiOutlinedInput-input": {
                                padding: "4px 8px",
                                /* "& fieldset": {
                                    borderColor: theme.palette.divider
                                },
                                "&:hover fieldset": {
                                    borderColor: theme.palette.primary.main
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: theme.palette.primary.main

                                }
                                 */
                            }
                        }
                    }}
                    sx={{
                        bgcolor: theme.palette.background.paper,
                        borderRadius: 1,
                        width: 300,
                    }}

                />

                <Popper
                    open={openPopper}
                    anchorEl={anchorRef.current}
                    placement="bottom-start"
                    sx={{ zIndex: theme.zIndex.modal }}
                >
                    <ClickAwayListener onClickAway={() => setOpenPopper(false)}>
                        <Paper sx={{ mt: 1, width: 200, maxHeight: 300, overflow: "auto" }}>
                            <List dense disablePadding>
                                {results &&
                                    (results.activity.length || results.task.length ? (
                                        <>
                                            {results.activity.map((act, i) => (
                                                <ListItem
                                                    button
                                                    key={`act-${i}`}
                                                    onClick={() => handleSelect(act)}
                                                >
                                                    <ListItemText
                                                        primary={act.name}
                                                        secondary={act.date}
                                                    />
                                                </ListItem>
                                            ))}
                                            {results.task.map((tsk, i) => (
                                                <ListItem
                                                    button
                                                    key={`task-${i}`}
                                                    onClick={() => handleSelect(tsk)}
                                                >
                                                    <ListItemText
                                                        primary={tsk.name}
                                                        secondary={tsk.dueDate || tsk.date}
                                                    />
                                                </ListItem>
                                            ))}
                                        </>
                                    ) : (
                                        <ListItem>
                                            <ListItemText primary="No results." />
                                        </ListItem>
                                    ))}
                            </List>
                        </Paper>
                    </ClickAwayListener>
                </Popper>
            </Box>

            {/* Spacer */}

            <Box sx={{ flexGrow: 1 }} />

            {/* Profile Icon */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <ProfileIcon />
            </Box>
        </Box>
    );
}