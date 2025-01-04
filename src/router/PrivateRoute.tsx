import React from "react";
import { getUserDetail } from "../utils/CommonMethods";
import { Navigate } from "react-router-dom";
import { ROUTES } from "./Routs";

interface PrivateRouteProps {
  element: React.ReactElement;
  allowedRoles: string[]; // Roles allowed to access the route
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  allowedRoles,
}) => {
  // get role from Local Router
  const userRole = getUserDetail()?.userType;
  console.log("userRole", userRole);

  if (!userRole) {
    // Redirect to login or welcome page if no role is found
    return <Navigate to={ROUTES.WELCOME} replace />;
  }
  if (allowedRoles.includes(userRole)) {
    // If role matches, allow access
    return element;
  }
  // Redirect to unauthorized page if role doesn't
  return <Navigate to="/unauthorized" replace />;
};

export default PrivateRoute;
