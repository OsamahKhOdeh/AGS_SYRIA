import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const roles = useAuth().roles;
  // console.log("roles", roles);
  // console.log("allowedRoles", allowedRoles);
  console.log(roles.some((role) => allowedRoles.includes(role)));
  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
  return content;
};
export default RequireAuth;
