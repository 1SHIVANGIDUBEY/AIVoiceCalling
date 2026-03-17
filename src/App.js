import { Routes, Route } from "react-router-dom";

import AdminLogin from "./components/AdminLogin";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Analytics from "./pages/Analytics";

function App(){

  return(

    <Routes>

      <Route path="/" element={<AdminLogin />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/leads" element={<Leads />} />

      <Route path="/analytics" element={<Analytics />} />

    </Routes>

  );

}

export default App;