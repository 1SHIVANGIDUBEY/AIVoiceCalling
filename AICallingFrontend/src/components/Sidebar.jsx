import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaBullhorn, FaCog } from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/" },
    { name: "Leads", icon: <FaUser />, path: "/leads" },
    { name: "Campaigns", icon: <FaBullhorn />, path: "/campaigns" },
  ];

  return (
    <div
      className={`h-[100vh] overflow-hidden bg-blue-600 flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo */}
      <div
        className={`flex items-center justify-center border-b border-blue-900 transition-all duration-300 ${
          isOpen ? "p-5 h-auto" : "h-0 overflow-hidden"
        }`}
      >
        {isOpen && (
          <div className="text-4xl font-bold text-white">AICalling</div>
        )}
      </div>

      {/* Menu */}
      <div className="flex-1 flex flex-col justify-start p-2 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <div
              key={item.name}
              onClick={() => {
                setActive(item.name);
                navigate(item.path);
              }}
              className={`flex items-center ${
                isOpen ? "gap-4 p-4" : "justify-center p-3"
              } rounded cursor-pointer transition
                ${
                  isActive
                    ? "bg-blue-800 text-white font-bold"
                    : "text-gray-300 hover:bg-blue-700 hover:text-white"
                }`}
            >
              <span className="text-2xl">{item.icon}</span>
              {isOpen && <span className="text-xl">{item.name}</span>}
            </div>
          );
        })}
      </div>

      {/* Footer Settings */}
      <div className="p-2 border-t border-blue-700">
        <div
          className={`flex items-center ${
            isOpen ? "gap-4 p-4 justify-start" : "justify-center p-3"
          } rounded cursor-pointer text-gray-300 hover:bg-blue-700 hover:text-white transition`}
        >
          <FaCog className="text-2xl" />
          {isOpen && <span className="text-xl">Settings</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;