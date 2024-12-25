import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import CardDetails from "../pages/Details/CardDetails";
import WelCome from "../pages/welcome/WelCome";
import DashBoard from "../pages/dashBoard/DashBoard";
import { ROUTES } from "../router/Routs";

const AppRout: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.WELCOME} element={<WelCome />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.DETAILS} element={<CardDetails />} />
        <Route path={ROUTES.DASHBOARD} element={<DashBoard />} />
      </Routes>
    </Router>
  );
};

export default AppRout;
