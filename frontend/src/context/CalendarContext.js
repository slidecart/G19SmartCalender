// src/context/CalendarContext.js
import React, {createContext, useContext, useMemo} from "react";
import { useCalendar } from "../hooks/calendar/useCalendar";
import { useAuth }     from "./AuthContext";

const CalendarContext = createContext(null);

export function CalendarProvider({ children }) {
    // 1) Always call your hooks
    const { accessToken }  = useAuth();
    const calendar= useCalendar();
    const value = useMemo(() => calendar, [calendar] )

    // 2) Now you can gate the render
    if (!accessToken)
        // Option A: render nothing until login
        return null;

    // 3) Provide the calendar data once logged in
    return (
        <CalendarContext.Provider value={value}>
            {children}
        </CalendarContext.Provider>
    );
}


export const useCalendarContext = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error("useCalendarContext must be used within a CalendarProvider");
    }
    return context;
};