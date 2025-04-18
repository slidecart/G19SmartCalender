
import { Routes, Route, Navigate } from "react-router-dom";

import LogIn from "./scenes/login";
import TodaysAgenda from "./scenes/todaysAgenda";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace/>} />
      <Route path="/login" element={<LogIn/>} />
      <Route path="/today" element={<TodaysAgenda/>} />
      {/* Tillägg av andra länkar senare när sidorna har byggts på*/}
    </Routes>
  );

}

export default App;
