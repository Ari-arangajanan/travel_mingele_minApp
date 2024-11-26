import { AppBar, Box } from "@mui/material";
import React, { Fragment } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const CardDetails = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/`);
    // Logic for back button (e.g., navigate back)
    console.log("handleBack");
  };
  return (
    <Fragment>
      <AppBar position="fixed">
        <NavBar handleBack={handleBack} />
      </AppBar>
      <Box>sample</Box>
    </Fragment>
  );
};

export default CardDetails;
