import { AppBar, Box, Button, TablePagination } from "@mui/material";
import React, { Fragment, useState } from "react";
import NavBar from "../../Components/NavBar";
import { NavigationUtils } from "../../utils/NavigationUtils";
import { ROUTES } from "../../router/Routs";
import { GetServicesResponse } from "../../Components/Interfaces/ServiceInterface";
import UseNetworkCalls from "../../hooks/networkCalls/UseNetworkCalls";
import { transformToCardData } from "../../utils/CommonMethods";
import Card from "../../Components/Card";

const DashBoard = () => {
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
      <Box>Dash Board Will be available Soon......</Box>
    </Fragment>
  );
};

export default DashBoard;
