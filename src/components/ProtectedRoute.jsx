import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading"); 

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include", 
    })
      .then((res) => {
        if (res.ok) setStatus("auth");
        else setStatus("unauth");
      })
      .catch(() => setStatus("unauth"));
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-purple-400">
        Checking authentication...
      </div>
    );
  }

  if (status === "unauth") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;