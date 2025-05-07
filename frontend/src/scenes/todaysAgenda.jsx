import { Box, Container, Typography } from "@mui/material";
import Body from "../components/containers/body";
import CalendarView from "../components/calendar/calendarView";

function TodaysAgenda(){

    return(
        <Body>
            <CalendarView/>
        </Body>
    )
}

export default TodaysAgenda;

