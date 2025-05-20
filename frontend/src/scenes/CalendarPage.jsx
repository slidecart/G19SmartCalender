import Body from "../components/containers/Body";
import CalendarView from "../components/calendar/CalendarView";
import {useCalendarContext} from "../context/CalendarContext";
import ToDoPage from "./ToDoPage";

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

