import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import CardDetails from "../pages/Details/CardDetails";
import WelCome from "../pages/welcome/WelCome";
import DashBoard from "../pages/settings/DashBoard";
import { ROUTES } from "../router/Routs";
import About from "../pages/menu/About";
import Products from "../pages/menu/Products";
import Account from "../pages/settings/Account";
import Profile from "../pages/settings/Profile";

const AppRout: React.FC = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default AppRout;
