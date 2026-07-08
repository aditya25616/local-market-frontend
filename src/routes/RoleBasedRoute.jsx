import { Navigate } from "react-router-dom";

function RoleBasedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RoleBasedRoute;