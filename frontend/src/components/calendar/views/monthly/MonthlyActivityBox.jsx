import {Box, Paper, Typography} from "@mui/material";
import {useCalendarContext} from "../../../../context/CalendarContext";
import dayjs from "dayjs";

const toMinutes = (timeStr) => {
    if (!timeStr) return Number.MAX_SAFE_INTEGER;
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
};

const MonthlyActivityBox = ({ filteredActivities, onClick }) => {
    const {
        categories,
    } = useCalendarContext();

    if (!filteredActivities || filteredActivities.length === 0 ) return null;



    return (
        <Box sx={{ display:"flex", flexDirection:"column", gap:0.5 }}>
            {filteredActivities.sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime)).map((activity, i) => {
                const category = categories?.find(cat => cat.id === activity.categoryId);
                const tempBackgroundColor = category ? category.color : "#60f085";
                const combinedDateTime = new Date(`${activity.date}T${activity.endTime}`);
                const past = combinedDateTime.getTime() < Date.now();
                const backgroundColor = past ? "grey.300" : tempBackgroundColor;


                return (
                <Paper
                    key={i}
                    elevation={1}
                    sx={{
                        p: 0.5,
                        backgroundColor,
                        cursor: "pointer",
                        zIndex: 1,
                        "&:hover": {
                            backgroundColor: "primary.main",
                            color: "white"
                        }
                    }}
                    onClick={e => {
                        e.stopPropagation();
                        onClick(e, activity);
                    }}

                >
                    <Typography variant="subtitle2">
                        {activity.name}
                    </Typography>
                </Paper>
                )
            })}
        </Box>
    );
};

export default MonthlyActivityBox;