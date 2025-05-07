import { Box, Container, Typography } from "@mui/material";
import Body from "../components/containers/body";
import WeeklyCalendar from "../components/calendar/weeklyCalendar";
import Sidebar from "../components/calendar/AppSidebar";

function TodaysAgenda(){

    return(
        <Body>
            <WeeklyCalendar/>
            {/* <Sidebar/> */} TODO: coming soon
        </Body>
    )
}

export default TodaysAgenda;

