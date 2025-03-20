import React from "react";
import Home from "../pages/home/Home";
import CardDetails from "../pages/Details/CardDetails";
import Welcome from "../pages/welcome/WelCome";
import DashBoard from "../business/DashBoard";
import About from "../pages/menu/About";
import Products from "../pages/menu/Products";
import Account from "../pages/settings/Account";
import Profile from "../pages/profile/Profile";
import { ROUTES } from "./Routs";
import { COMMON_ROLES } from "../Authentication/RoleAccess";
import MyHires from "../business/MyHires";
import MyClients from "../business/MyClients";
import Payment from "../pages/payment/Payment";
import AddServiceForm from "../pages/serviceRegister/AddServiceForm";
import UpdateService from "../pages/approvedServices/UpdateService";
import ViewService from "../pages/approvedServices/ViewService";

// Define the RouteConfig interface
interface RouteConfig {
  path: string;
  element: React.ReactElement;
  roles: string[]; // Define roles as an array of strings
  name: string;
  category?: "page" | "setting"; // New category field to separate pages and settings
}

export const routeConfig: RouteConfig[] = [
  {
    path: ROUTES.WELCOME,
    element: <Welcome />,
    roles: COMMON_ROLES.PUBLIC,
    name: "Welcome",
  }, // Public
  {
    path: ROUTES.HOME,
    element: <Home />,
    roles: COMMON_ROLES.AUTHENTICATED,
    name: "Home",
  },
  {
    path: ROUTES.DETAILS,
    element: <CardDetails />,
    roles: COMMON_ROLES.AUTHENTICATED,
    name: "Details",
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashBoard />,
    roles: COMMON_ROLES.AUTHENTICATED,
    name: "Dashboard",
    category: "setting",
  },
  {
    path: ROUTES.MYHIRES,
    element: <MyHires />,
    roles: COMMON_ROLES.AUTHENTICATED,
    name: "My Hires",
    category: "setting",
  },
  {
    path: ROUTES.MYCLIENT,
    element: <MyClients />,
    roles: COMMON_ROLES.SERVICE_ONLY,
    name: "My Clients",
    category: "setting",
  },
  {
    path: ROUTES.ACCOUNT,
    element: <Account />,
    roles: COMMON_ROLES.AUTHENTICATED,
    name: "Account",
    category: "setting",
  },
  {
    path: ROUTES.PROFILE,
    element: <Profile />,
    roles: COMMON_ROLES.AUTHENTICATED,
    name: "Profile",
    category: "setting",
  },
  {
    path: ROUTES.PRODUCTS,
    element: <Products />,
    roles: COMMON_ROLES.SERVICE_ONLY,
    name: "Products",
    category: "page",
  },
  {
    path: `${ROUTES.PAYMENT}/:orderId`,
    element: <Payment />,
    roles: COMMON_ROLES.AUTHENTICATED,
    name: "payment",
  },
  {
    path: `${ROUTES.ADD_SERVICE}`,
    element: <AddServiceForm />,
    roles: COMMON_ROLES.SERVICE_ONLY,
    name: "addService",
  },
  {
    path: `${ROUTES.UPDATE_SERVICE}`,
    element: <UpdateService />,
    roles: COMMON_ROLES.SERVICE_ONLY,
    name: "updateService",
  },
  {
    path: `${ROUTES.VIEW_SERVICE}`,
    element: <ViewService />,
    roles: COMMON_ROLES.SERVICE_ONLY,
    name: "viewService",
  },

  // public Routes
  {
    path: ROUTES.ABOUT,
    element: <About />,
    roles: COMMON_ROLES.PUBLIC,
    name: "About",
    category: "page",
  }, // Public
];
