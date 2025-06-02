import React, { useRef } from "react";
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

// Extend & set locale
dayjs.extend(isoWeek);
dayjs.locale("sv");

/**
 * DailyTaskView ─ Right‑hand column that shows the tasks for one specific date
 * @param {string}   date    – selected date in YYYY‑MM‑DD
 * @param {function} setDate – setter coming from ToDoPage
 * @param {Array}    tasks   – all tasks (we filter inside)
 */
export default function DailyTaskView({ date, setDate, tasks }) {
  const { categories } = useCategoryContext();

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

  return (
    <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
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
              : selected.format("D MMMM YYYY")}
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

      <Divider sx={{ mb: 2 }} />

      {/* Task list for the selected date */}
      {tasks.filter(t => dayjs(t.date).isSame(selected, "day")).length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center">
          Inga uppgifter för detta datum.
        </Typography>
      ) : (
        tasks
          .filter(t => dayjs(t.date).isSame(selected, "day"))
          .map(task => {
            const cat = categories.find(c => c.id === task.categoryId) || null;
            return (
              <Box
                key={task.id}
                sx={{
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
  );
}
