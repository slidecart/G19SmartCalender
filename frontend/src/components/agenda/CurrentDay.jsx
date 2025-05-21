import { Box, Container, Typography, Card } from "@mui/material";
import { useCalendarContext } from "../../context/CalendarContext";
import dayjs from "dayjs";


const CurrentDay = () => {
    const {
        categories,
    } = useCalendarContext();
    if(!filteredActivities || filteredActivities.length === 0){
        return(
            <Card>
                <Typography variant="caption2">
                    Inga aktiviteter!
                </Typography>
            </Card>
        )
    }

    return (
        <>
        
        </>

    )
}

export default CurrentDay;