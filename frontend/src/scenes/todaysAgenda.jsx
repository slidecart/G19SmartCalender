import { Box, Container, Typography } from "@mui/material";
import Body from "../components/containers/body";
import WeeklyCalendar from "../components/calendar/weeklyCalendar";

function TodaysAgenda(){

    return(
        <Body>
            <WeeklyCalendar/>
        </Body>
    )
}

export default TodaysAgenda;

