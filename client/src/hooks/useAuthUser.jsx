import React from "react";
import { decodeToken } from "react-jwt";
import { useSelector } from "react-redux";
import {
  selectCurrentUserToken,
  selectCurrentUserGoogleToken,
} from "../features/auth/authSlice";

export const useAuthUser = () => {
  const token = useSelector(selectCurrentUserToken);
  const googleToken = useSelector(selectCurrentUserGoogleToken);
  console.log(token);
  let isAdmin = false;
  let accessRight = "User";

  if (token) {
    const decodedToken = decodeToken(token);
    const { roles } = decodedToken;
    console.log(roles);

    isAdmin = roles?.includes("Admin");

    if (isAdmin) accessRight = "Admin";

    return { roles, isAdmin, accessRight };
  } else if (googleToken) {
    const googleDecodedToken = decodeToken(googleToken);
    const { roles } = googleDecodedToken;
    console.log(roles);

    isAdmin = roles?.includes("Admin");

    if (isAdmin) accessRight = "Admin";

    return { roles, isAdmin, accessRight };
  }

  return { roles: [], isAdmin, accessRight };
};

export default useAuthUser;
