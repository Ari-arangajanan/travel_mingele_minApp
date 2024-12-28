import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { routeConfig } from "../Authentication/RouteConfig";
import { ROUTES } from "./Routs";

const AppRout: React.FC = () => {
  return (
    <Router>
      <Routes>
        {
          /* Public Routes */

          routeConfig.map((route, index) => {
            if (route.roles.length === 0) {
              return (
                <Route key={index} path={route.path} element={route.element} />
              );
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute
                    element={route.element}
                    allowedRoles={route.roles}
                  />
                }
              />
            );
          })
        }
        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to={ROUTES.WELCOME} replace />} />
      </Routes>
    </Router>
  );
};

export default AppRout;

{
  /* <Router>
<Routes>
  <Route path={ROUTES.WELCOME} element={<WelCome />} />
  <Route path={ROUTES.HOME} element={<Home />} />
  <Route path={ROUTES.DETAILS} element={<CardDetails />} />
  <Route path={ROUTES.DASHBOARD} element={<DashBoard />} />
  <Route path={ROUTES.ACCOUNT} element={<Account />} />
  <Route path={ROUTES.PROFILE} element={<Profile />} />

  <Route path={ROUTES.PRODUCTS} element={<Products />} />
  <Route path={ROUTES.ABOUT} element={<About />} />
</Routes>
</Router> */
}
