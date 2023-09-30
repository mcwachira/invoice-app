import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";

const AuthRequired = ({ allowedRoles }) => {
  const location = useLocation();

  const { roles } = useAuthUser();
  console.log(roles);

  //some method returns if one method return  true
  return roles?.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    //replace will prevent the user from navigating back
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthRequired;
