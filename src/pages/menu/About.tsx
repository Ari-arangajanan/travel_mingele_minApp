import React, { Fragment } from "react";
import { ROUTES } from "../../router/Routs";
import { NavigationUtils } from "../../router/NavigationUtils";
import { AppBar, Box } from "@mui/material";
import NavBar from "../../Components/NavBar";

const About = () => {
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
      <Box>About</Box>
    </Fragment>
  );
};

export default About;
