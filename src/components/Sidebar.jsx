import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaChartBar, FaUsers, FaThLarge, FaPhone } from "react-icons/fa";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const username = localStorage.getItem("username") || "User";
  const initials = username.charAt(0).toUpperCase();

  return (
    <div
      className={`${open ? "w-64" : "w-20"
        } min-h-screen bg-gray-900 text-white p-4 transition-all duration-300 flex flex-col`}
    >
      {/* Top Header: Toggle & Avatar */}
      <div className="flex items-center gap-3 mb-8">
        <FaBars
          className="cursor-pointer text-gray-400 hover:text-white transition"
          size={22}
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
              {initials}
            </div>
            <span className="font-semibold text-lg truncate">{username}</span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        <SidebarLink
          to="/dashboard"
          icon={<FaThLarge />}
          label="Dashboard"
          open={open}
        />
        <SidebarLink
          to="/leads"
          icon={<FaUsers />}
          label="Leads"
          open={open}
        />
        <SidebarLink
          to="/analytics"
          icon={<FaChartBar />}
          label="Analytics"
          open={open}
        />
        <SidebarLink
          to="/call-logs"
          icon={<FaPhone />}
          label="Call Logs"
          open={open}
        />
      </nav>
    </div>
  );
}

// Avtar code
function SidebarLink({ to, icon, label, open }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-gray-800 transition text-gray-300 hover:text-white"
    >
      <div className="text-xl flex-shrink-0">{icon}</div>
      {open && <span className="font-medium whitespace-nowrap">{label}</span>}
    </Link>
  );
}

export default Sidebar;