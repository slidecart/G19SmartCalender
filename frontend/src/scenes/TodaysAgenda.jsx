import Body from "../components/containers/Body";
import CalendarView from "../components/calendar/CalendarView";
import {useCalendarContext} from "../context/CalendarContext";

function TodaysAgenda(){



    return (
        <Body
            withSidebar
        >
            <CalendarView/>
        </Body>
    );
}

export default TodaysAgenda;

