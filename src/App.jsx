import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./_root/pages/login";
import Dashboard_layout from "./_root/layout";
import Dashboard from "./_root/pages/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard_layout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
