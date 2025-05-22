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
  import { useRef } from "react";
  import dayjs from "dayjs";
  import "dayjs/locale/sv";          // ← import Swedish locale
  import isoWeek from "dayjs/plugin/isoWeek";
  
  dayjs.extend(isoWeek);
  dayjs.locale("sv");               // ← activate Swedish globally (for formatting)
  
  export default function DailyTaskView({ date, setDate, tasks }) {
    const selected  = dayjs(date);
    const today     = dayjs().startOf("day");
    const isToday   = selected.isSame(today, "day");
    const tomorrow  = today.add(1, "day");
    const isTomorrow= selected.isSame(tomorrow, "day");
    const inputRef  = useRef(null);
  
    const goToPreviousDay = () =>
      setDate(selected.subtract(1, "day").format("YYYY-MM-DD"));
  
    const goToNextDay = () =>
      setDate(selected.add(1, "day").format("YYYY-MM-DD"));
  
    return (
      <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
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
  
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Button
              variant="none"
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
                : selected.format("D MMMM YYYY")  // ← now in Swedish
              }
            </Button>
  
            <input
              ref={inputRef}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0,
                pointerEvents: "none",
              }}
            />
          </Box>
  
          <Button variant="contained" size="small" onClick={goToNextDay}>
            <ArrowForwardIcon fontSize="small" />
          </Button>
        </Stack>
  
        <Divider sx={{ mb: 2 }} />
  
        {tasks.filter(t => dayjs(t.date).isSame(selected, "day")).length === 0 ? (
          <Typography variant="body2">
            Inga uppgifter för detta datum.
          </Typography>
        ) : (
          tasks
            .filter(t => dayjs(t.date).isSame(selected, "day"))
            .map((task) => (
              <Box
                key={task.id}
                mb={2}
                p={2}
                border="1px solid #ccc"
                borderRadius={2}
                bgcolor="#f9f9f9"
              >
                <Typography variant="h6">{task.name}</Typography>
                <Typography variant="body2">{task.description}</Typography>
              </Box>
            ))
        )}
      </Box>
    );
  }