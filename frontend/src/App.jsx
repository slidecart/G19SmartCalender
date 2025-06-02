import {Navigate, Route, Routes, Outlet} from "react-router-dom";

import LogIn from "./scenes/LogIn";
import TodaysAgenda from "./scenes/TodaysAgenda";
import ToDoPage from "./components/task/ToDoPage";
import AuthProvider, {PrivateRoute} from "./context/AuthContext";
import VerifyEmail from "./scenes/VerifyEmail";
import ResetPassword from "./scenes/ResetPassword";
import Register from "./scenes/Register";
import AccountSettings from "./scenes/AccountSettings";
import {CalendarProvider} from "./context/CalendarContext";
import {TodoProvider} from "./context/TodoContext";
import {CategoryProvider} from "./context/CategoryContext";
import CalendarPage from "./scenes/CalendarPage";

function App() {
  return (
      <AuthProvider>
          <Routes>
              <Route path="/" element={<Navigate to="/login" replace/>} />
              <Route path="/login" element={<LogIn/>} />
              <Route path="/verify-email" element={<VerifyEmail/>} />
              <Route path="/reset-password" element={<ResetPassword/>} />
              <Route path="/register" element={<Register/>} />
              <Route element={<PrivateRoute />}>
                  {/* Now wrap *all* calendar-backed routes in CalendarProvider */}
                  <Route
                      element={
                          <CategoryProvider>
                            <CalendarProvider>
                                <TodoProvider>
                                    {/* Outlet will render matching child route */}
                                    <Outlet />
                                </TodoProvider>
                            </CalendarProvider>
                          </CategoryProvider>

                      }
                  >
                      <Route path="/today" element={<TodaysAgenda />} />
                      <Route path="/calendar" element={<CalendarPage />} />
                      <Route path="/toDo" element={<ToDoPage />} />
                      <Route path="/account-settings" element={<AccountSettings />} />
                  </Route>
                </Route>
          </Routes>
      </AuthProvider>
  );

}

export default App;
