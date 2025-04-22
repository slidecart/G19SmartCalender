
import {  Routes, Route, Navigate } from "react-router-dom";

import LogIn from "./scenes/login";
import TodaysAgenda from "./scenes/todaysAgenda";
import TaskTodo from "./scenes/taskTodo";
import AuthProvider, {PrivateRoute} from "./hooks/AuthContext";

function App() {
  return (
      <AuthProvider>
          <Routes>
              <Route path="/" element={<Navigate to="/login" replace/>} />
              <Route path="/login" element={<LogIn/>} />
              <Route element={<PrivateRoute />}>
                  <Route path="/today" element={<TodaysAgenda/>} />
                  <Route path="/taskTodoPage" element={<TaskTodo/>} />
                  {/* Tillägg av andra länkar senare när sidorna har byggts på*/}
              </Route>
          </Routes>
      </AuthProvider>
  );

}

export default App;
