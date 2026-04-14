import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Check if the user has a token in local storage
  const isAuthenticated = localStorage.getItem("token");

  // If there is no token, kick them back to the login page
  if (!isAuthenticated) {
    console.log("🔒 ProtectedRoute: No token found, redirecting to login.");
    return <Navigate to="/" replace />;
  }

  // If they have the token, let them into the Dashboard!
  return children;
}

export default ProtectedRoute;