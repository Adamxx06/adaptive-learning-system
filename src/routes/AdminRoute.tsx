import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const role = localStorage.getItem("role");
  return role === "admin" ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default AdminRoute;
