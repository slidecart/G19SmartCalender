import { Box, Container, Typography, Paper } from "@mui/material";
import NextDay from "./NextDay";

function AgendaView() {
    const {
        /* activities */
        selectedActivity,
        setSelectedActivity,
        filteredActivities

    } = useCalendarContext();

    return(
        <Paper>
            <CurrentDay>

            </CurrentDay>
            <NextDay>
                
            </NextDay>
        </Paper>

    )

}