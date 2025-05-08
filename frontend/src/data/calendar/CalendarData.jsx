import dayjs from "dayjs";

/**
 * The default shape for "add/edit activity" form.
 * Import this into your hooks or components
 * to initialize or reset form state.
 */
export const defaultFormData = {
    name: "",
    description: "",
    location: "",
    date: dayjs().format("YYYY-MM-DD"),  // default to today
    startTime: "08:00",                   // earliest slot
    endTime: "09:00",                     // one hour later
    categoryId: "",
};

/**
 * Localized weekday names, starting with Monday.
 * Used by `makeWeekdays()` below.
 */
export const weekdayLabels = [
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "Söndag"
];

/**
 * Given a dayjs instance for the start of the week (Monday),
 * returns an array of 7 objects:
 *
 *   [
 *     { name: "Måndag", date: "2025-04-21" },
 *     { name: "Tisdag", date: "2025-04-22" },
 *     …etc…
 *   ]
 *
 * Import this into hook to generate `weekdays`.
 */
export function makeWeekdays(startOfWeek) {
    return weekdayLabels.map((name, idx) => ({
        name,
        date: startOfWeek.clone().add(idx, "day").format("YYYY-MM-DD")
    }));
}

/**
 * A simple array of time‑slot strings from 08:00 to 20:00:
 *
 *   [ "08:00", "09:00", …, "20:00" ]
 *
 * Import this directly into a hook or component.
 */
export const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = 8 + i;
    return `${String(hour).padStart(2, "0")}:00`;
});
