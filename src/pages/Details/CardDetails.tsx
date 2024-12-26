import { AppBar, Box } from "@mui/material";
import React, { Fragment } from "react";
import NavBar from "../../Components/NavBar";
import { NavigationUtils } from "../../utils/NavigationUtils";
import { ROUTES } from "../../router/Routs";

const CardDetails = () => {
  const { navigateTo } = NavigationUtils();
  const handleBack = () => {
    navigateTo(ROUTES.HOME);
    // Logic for back button (e.g., navigate back)
    console.log("handleBack");
  };
  return (
    <Fragment>
      <AppBar position="fixed">
        <NavBar handleBack={handleBack} />
      </AppBar>
      <Box>Details</Box>
    </Fragment>
  );
};

export default CardDetails;
