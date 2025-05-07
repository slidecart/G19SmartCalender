import {Navigate, Route, Routes} from "react-router-dom";

import LogIn from "./scenes/LogIn";
import TodaysAgenda from "./scenes/TodaysAgenda";
import ToDoPage from "./components/task/ToDoPage";
import AuthProvider, {PrivateRoute} from "./context/AuthContext";
import VerifyEmail from "./scenes/VerifyEmail";
import ResetPassword from "./scenes/ResetPassword";
import Register from "./scenes/Register";
import AccountSettings from "./scenes/AccountSettings";

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
                  <Route path="/today" element={<TodaysAgenda/>} />
                  <Route path="/taskTodoPage" element={<ToDoPage/>} />
                  <Route path="/account-settings" element={<AccountSettings/>} />
                  {/* Tillägg av andra länkar senare när sidorna har byggts på*/}
              </Route>
          </Routes>
      </AuthProvider>
  );

}

export default App;
