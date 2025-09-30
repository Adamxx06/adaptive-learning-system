// AdminRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const isAdmin = localStorage.getItem("role") === "admin";

  return isAdmin ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default AdminRoute;
