import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    useCallback
} from "react";
import dayjs from "dayjs";
import { useCalendar } from "../hooks/calendar/useCalendar";
import { useAuth }     from "./AuthContext";

const CalendarContext = createContext(null);

export function CalendarProvider({ children }) {
    // 1) Always call your hooks
    const { accessToken } = useAuth();
    const calendar = useCalendar();

    // 2) Add new navigation/view state
    const [currentView, setCurrentView] = useState("week");
    const [targetDate, setTargetDate] = useState(null);

    const navigateToDate = useCallback((isoDateString, view = null) => {
        if (view) setCurrentView(view);
        setTargetDate(dayjs(isoDateString));
    }, []);

    // 3) Combine everything into one context value
    const value = useMemo(
        () => ({
            // all existing calendar properties
            ...calendar,
            // new view/navigation props
            currentView,
            setCurrentView,
            targetDate,
            navigateToDate
        }),
        [calendar, currentView, targetDate, navigateToDate]
    );

    // 4) Gate the render until authenticated
    if (!accessToken) {
        return null;
    }

    return (
        <CalendarContext.Provider value={value}>
            {children}
        </CalendarContext.Provider>
    );
}

export const useCalendarContext = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error(
            "useCalendarContext must be used within a CalendarProvider"
        );
    }
    return context;
};