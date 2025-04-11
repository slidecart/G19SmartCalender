import { Box, Container, Typography } from "@mui/material";
import Body from "../components/containers/body";
import WeeklyCalendar from "../components/calendar/weeklyCalendar";

function TodaysAgenda(){

    return(
        <Body>
            <Container sx={{display:"flex", flexDirection:"row"}}>
                <Box>
                    {/*Här ska todos eller what not finnas*/}
                </Box>
                <Box>
                    <WeeklyCalendar/>
                </Box>
            </Container>
        </Body>
    )
}

export default TodaysAgenda;

