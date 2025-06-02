import Body from "../components/containers/Body";
import CalendarView from "../components/calendar/CalendarView";
import {useCalendarContext} from "../context/CalendarContext";

function CalendarPage(){



    return (
        <Body
            withSidebar
        >
            <CalendarView/>
        </Body>
    );
}

export default CalendarPage;

