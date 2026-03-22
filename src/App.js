import { Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<AdminLogin />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/leads" element={
        <ProtectedRoute><Leads /></ProtectedRoute>
      } />
      <Route path="/analytics" element={
        <ProtectedRoute><Analytics /></ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;