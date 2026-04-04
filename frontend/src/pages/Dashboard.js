import React, { useState } from "react";
import "../styles.css";
import {
  FaUpload,
  FaUsers,
  FaChartBar,
  FaPhone,
  FaBars
} from "react-icons/fa";

export default function Dashboard() {
  const username = localStorage.getItem("username") || "User";
  const [open, setOpen] = useState(false);

  const initials = username.charAt(0).toUpperCase();

  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: open ? 220 : 70,
          background: "white",
          borderRight: "1px solid #eee",
          minHeight: "100vh",
          transition: "0.3s",
          padding: "10px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          
          <FaBars
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(!open)}
          />

          {open && (
            <>
              <div
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  background: "#007bff",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}
              >
                {initials}
              </div>

              <span style={{ fontWeight: "bold" }}>{username}</span>
            </>
          )}
        </div>

        <div style={{ marginTop: 30 }}>
          <MenuItem icon={<FaUpload />} text="Upload" open={open} />
          <MenuItem icon={<FaUsers />} text="Leads" open={open} />
          <MenuItem icon={<FaChartBar />} text="Analytics" open={open} />
          <MenuItem icon={<FaPhone />} text="Call Logs" open={open} />
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: 30, flex: 1 }}>
        <h1 style={{ color: "#007bff" }}>
          Welcome, {username}
        </h1>

        {/* Cards */}
        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
          <Card title="Total Leads" value="120" />
          <Card title="Calls Made" value="80" />
          <Card title="Conversions" value="25" />
        </div>
      </div>
    </div>
  );
}

// 🔹 Menu Item
function MenuItem({ icon, text, open }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 15,
        padding: "12px 10px",
        cursor: "pointer",
        borderRadius: 8
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f6ff")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
    >
      {icon}
      {open && <span>{text}</span>}
    </div>
  );
}

// 🔹 Card Component
function Card({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 10,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        width: 200
      }}
    >
      <h4>{title}</h4>
      <h2 style={{ color: "#007bff" }}>{value}</h2>
    </div>
  );
}