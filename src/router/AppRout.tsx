import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import CardDetails from "../Components/CardDetails";
import WelCome from "../pages/welcome/WelCome";

const AppRout: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelCome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:id" element={<CardDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRout;
