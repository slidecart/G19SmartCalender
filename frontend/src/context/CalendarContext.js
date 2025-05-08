import {createContext, useContext, useMemo} from "react";
import {useCalendar} from "../hooks/calendar/useCalendar";


const CalendarContext = createContext(null);

export const CalendarProvider = ({children}) => {
    const calendar = useCalendar();

    // avoid re-rendering when not needed
    const value = useMemo(() => calendar, [calendar]);

    return (
        <CalendarContext.Provider value={value}>
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendarContext = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error("useCalendarContext must be used within a CalendarProvider");
    }
    return context;
};