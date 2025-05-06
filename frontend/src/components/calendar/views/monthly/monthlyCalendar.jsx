import { Box, Typography, TableContainer, Paper, Button, Container } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ActivityBox from "../../activityBox";

const daysInWeek =["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];

function MonthlyCalendar({ activities, onActivityClick, openAddDialog}) {
    const [currentMonth, setCurrentMonth] = useState(dayjs().currentMonth("month"));


}