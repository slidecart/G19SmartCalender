import React, { useMemo, useRef, useState } from "react";
import {
    Box,
    Typography,
    Divider,
    Button,
    Stack
} from "@mui/material";
import {
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
    CalendarToday as CalendarTodayIcon
} from "@mui/icons-material";
import dayjs from "dayjs";
import "dayjs/locale/sv"; // Swedish locale
import isoWeek from "dayjs/plugin/isoWeek";
import { alpha } from "@mui/material/styles";
import { useCategoryContext } from "../../context/CategoryContext";
import { useTodoContext } from "../../context/TodoContext";

// Extend & set locale
dayjs.extend(isoWeek);
dayjs.locale("sv");

/**
 * DailyTaskView ─ Right‑hand column that shows the tasks for one specific date
 */
export default function DailyTaskView() {

    const { categories } = useCategoryContext();
    const { tasks } = useTodoContext(); // All tasks from your context

    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

    const selected = dayjs(date);
    const today = dayjs().startOf("day");
    const tomorrow = today.add(1, "day");

    const isToday = selected.isSame(today, "day");
    const isTomorrow = selected.isSame(tomorrow, "day");

    const inputRef = useRef(null);

    const goToPreviousDay = () =>
        setDate(selected.subtract(1, "day").format("YYYY-MM-DD"));

    const goToNextDay = () =>
        setDate(selected.add(1, "day").format("YYYY-MM-DD"));

    // Memoized filtered tasks for the selected date
    const tasksForSelectedDate = useMemo(
        () => tasks.filter(t => dayjs(t.date).isSame(selected, "day")),
        [tasks, selected]
    );

    return (
        <Box sx={{ p: 2}}>
            {/* Header with date controls */}
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                sx={{ mb: 2 }}
            >
                <Button variant="contained" size="small" onClick={goToPreviousDay}>
                    <ArrowBackIcon fontSize="small" />
                </Button>

                {/* Date button + hidden input native date‑picker */}
                <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Button
                        variant="text"
                        size="large"
                        startIcon={<CalendarTodayIcon />}
                        sx={{
                            border: 1,
                            textTransform: "none",
                            px: 2,
                            fontSize: "1rem"
                        }}
                        onClick={() => {
                            if (inputRef.current?.showPicker) {
                                inputRef.current.showPicker();
                            } else {
                                inputRef.current.click();
                            }
                        }}
                    >
                        {isToday
                            ? "Idag"
                            : isTomorrow
                                ? "Imorgon"
                                : selected.format("dddd, D MMMM YYYY")}
                    </Button>

                    <input
                        ref={inputRef}
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            opacity: 0,
                            pointerEvents: "none"
                        }}
                    />
                </Box>

                <Button variant="contained" size="small" onClick={goToNextDay}>
                    <ArrowForwardIcon fontSize="small" />
                </Button>
            </Stack>
            <Box sx={{border: "1px solid #ccc", borderRadius: 2, height: "61.5vh" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 1}}>
                    {isToday ? (
                        <>
                            <Typography>Dagens ToDo's</Typography>
                            <Divider sx={{my: 1, width: "100%"}} />
                        </>
                    ) : isTomorrow && (
                        <>
                            <Typography>Morgondagens ToDo's</Typography>
                            <Divider sx={{my: 1, width: "100%"}} />
                        </>
                    )}
                </Box>

                <Box sx={{pl: 2, pb: 4, pr: 2, overflowY: "auto", maxHeight: "50vh"}}>

                    {/* Task list for the selected date */}
                    {tasksForSelectedDate.length === 0 ? (
                        <Typography variant="body1" color="text.secondary" align="center">
                            Inga ToDo's för detta datum.
                        </Typography>
                    ) : (
                        tasksForSelectedDate.map(task => {
                            const cat = categories.find(c => c.id === task.categoryId) || null;
                            return (
                                <Box
                                    key={task.id}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        minHeight: 40,
                                        maxHeight: 40,
                                        mb: 2,
                                        p: 2,
                                        border: "1px solid #ccc",
                                        borderRadius: 2,
                                        borderLeft: cat?.color
                                            ? `4px solid ${cat.color}`
                                            : "1px solid #ccc",
                                        backgroundColor: cat?.color
                                            ? alpha(cat.color, 0.1)
                                            : "background.paper",
                                        /* --- prevent super‑long words from stretching layout --- */
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-word"
                                    }}
                                >
                                    <Typography variant="h6">{task.name}</Typography>
                                    <Typography variant="body2">{task.description}</Typography>
                                </Box>
                            );
                        })
                    )}
                </Box>
            </Box>
        </Box>
    );
}