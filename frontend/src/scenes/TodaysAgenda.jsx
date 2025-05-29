import { Box, Typography, Container } from "@mui/material";
import Body from "../components/containers/Body";
import CalendarView from "../components/calendar/CalendarView";
import {useCalendarContext} from "../context/CalendarContext";
import AgendaView from "./../components/agenda/AgendaView";

function TodaysAgenda(){



    return (
        <Body
            withSidebar
        >

            <AgendaView/>

        </Body>
    );
}

export default TodaysAgenda;

