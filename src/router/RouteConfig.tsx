import React from "react";
import Home from "../pages/home/Home";
import CardDetails from "../pages/Details/CardDetails";
import Welcome from "../pages/welcome/WelCome";
import DashBoard from "../pages/settings/DashBoard";
import About from "../pages/menu/About";
import Products from "../pages/menu/Products";
import Account from "../pages/settings/Account";
import Profile from "../pages/settings/Profile";
import { ROUTES } from "../router/Routs";

// Define the RouteConfig interface
interface RouteConfig {
  path: string;
  element: React.ReactElement;
  roles: string[]; // Define roles as an array of strings
}

export const routeConfig: RouteConfig[] = [
  { path: ROUTES.WELCOME, element: <Welcome />, roles: [] }, // Public
  { path: ROUTES.HOME, element: <Home />, roles: ["SERVICE_PROVIDER", "USER"] },
  {
    path: ROUTES.DETAILS,
    element: <CardDetails />,
    roles: ["SERVICE_PROVIDER", "USER"],
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashBoard />,
    roles: ["serviceProvider"],
  },
  {
    path: ROUTES.ACCOUNT,
    element: <Account />,
    roles: ["SERVICE_PROVIDER", "USER"],
  },
  {
    path: ROUTES.PROFILE,
    element: <Profile />,
    roles: ["SERVICE_PROVIDER", "USER"],
  },
  {
    path: ROUTES.PRODUCTS,
    element: <Products />,
    roles: ["SERVICE_PROVIDER"],
  },
  { path: ROUTES.ABOUT, element: <About />, roles: [] }, // Public
];
