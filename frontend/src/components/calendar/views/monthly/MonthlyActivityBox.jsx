import {Box, Paper, Typography} from "@mui/material";
import {useCalendarContext} from "../../../../context/CalendarContext";
import {alpha} from "@mui/material/styles";

const MonthlyActivityBox = ({ filteredActivities, onClick }) => {
    const { categories } = useCalendarContext();

    if (!filteredActivities || filteredActivities.length === 0 ) return null;



    return (
        <Box sx={{ display:"flex", flexDirection:"column", gap:0.5 }}>
            {filteredActivities.map((activity, i) => {
                const category = categories?.find(cat => cat.id === activity.categoryId);
                const backgroundColor = category ? category.color : "#013e87";

                return (
                    <Paper
                        key={i}
                        elevation={1}
                        sx={{
                            p: 0.5,
                            backgroundColor,
                            cursor: "pointer",
                            color: "white",
                            zIndex: 1,
                            "&:hover": {
                                backgroundColor: alpha(backgroundColor, 0.6), // 60% opacity
                            },
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