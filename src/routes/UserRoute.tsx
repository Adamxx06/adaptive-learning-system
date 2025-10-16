import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default UserRoute;
