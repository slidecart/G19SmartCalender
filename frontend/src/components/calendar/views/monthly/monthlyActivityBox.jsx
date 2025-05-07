import { Box, Typography, Paper } from "@mui/material";

const MonthlyActivityBox = ({ activities, onClick }) => {
    if (!activities || activities.length === 0 ) return null;

    return (
        <Box sx={{ display:"flex", flexDirection:"column", gap:0.5 }}>
            {activities.map((activity, i) => (
                <Paper  
                    key={i}
                    elevation={1}
                    onClick={() => onClick(activity)}
                    sx={{
                        p:0.5,
                        backgroundColor:"#60f085",
                        cursor:"pointer",
                        zIndex:1,
                        "&:hover": {
                            backgroundColor:"primary.main",
                            color:"fff"
                        }
                    }}
                >
                    <Typography variant="subtitle2">
                        {activity.name}
                    </Typography>
                </Paper>
            ))}
        </Box>
    );
};

export default MonthlyActivityBox;