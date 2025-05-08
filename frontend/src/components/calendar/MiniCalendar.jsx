import React from "react";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

/**
 * Renders a vertical hourly grid from 08:00–20:00,
 * and highlights the range [startTime,endTime) on the given date.
 */
export function MiniCalendar({ date, startTime, endTime }) {
    // build 08:00–20:00 slots
    const hours = Array.from({ length: 13 }, (_, i) => 8 + i);

    // parse start/end into minutes since midnight
    const startMins = startTime
        ? dayjs(`${date}T${startTime}`).hour() * 60 + dayjs(`${date}T${startTime}`).minute()
        : null;
    const endMins = endTime
        ? dayjs(`${date}T${endTime}`).hour() * 60 + dayjs(`${date}T${endTime}`).minute()
        : null;

    return (
        <Box sx={{ position: "relative", height: "100%", border: 1, borderColor: "divider" }}>
            {hours.map((h) => (
                <Box
                    key={h}
                    sx={{
                        position: "absolute",
                        top: `${((h - 8) / 12) * 100}%`,
                        left: 0,
                        right: 0,
                        height: `${(1 / 12) * 100}%`,
                        borderTop: 1,
                        borderColor: "divider",
                        pl: 1,
                    }}
                >
                    <Typography variant="caption">{h.toString().padStart(2, "0")}</Typography>
                </Box>
            ))}

            {/* highlight the selected range */}
            {startMins != null &&
                endMins != null &&
                date &&
                (() => {
                    const totalSpan = 12 * 60; // minutes from 08:00 to 20:00
                    const offsetY = ((startMins - 8 * 60) / totalSpan) * 100;
                    const heightPct = ((endMins - startMins) / totalSpan) * 100;
                    return (
                        <Box
                            sx={{
                                position: "absolute",
                                top: `${offsetY}%`,
                                left: 0,
                                right: 0,
                                height: `${heightPct}%`,
                                bgcolor: "primary.light",
                                opacity: 0.5,
                            }}
                        />
                    );
                })()}
        </Box>
    );
}
