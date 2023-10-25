import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthService from "../services/AuthService";

const RequireAuth = () => {
  const location = useLocation();

  return AuthService.isLoggedIn() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
