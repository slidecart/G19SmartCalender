import React from "react";
import {Box, Container, Stack} from "@mui/material";
import Body from "../containers/Body";
import DailyTaskView from "./DailyTaskView";
import ToDoList from "./ToDoList";

export default function ToDoPage() {
  return (
      <Body>
          <Container maxWidth="lg" sx={{ mt: 1 }}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              {/* LEFT — ToDo list */}
              <Box flex={1}>
                <ToDoList />
              </Box>

              {/* RIGHT — Daily task view */}
              <Box flex={1}>
                <DailyTaskView />
              </Box>
            </Stack>
          </Container>
      </Body>
  );
}