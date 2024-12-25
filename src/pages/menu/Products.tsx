import React, { Fragment } from "react";
import { NavigationUtils } from "../../router/NavigationUtils";
import { ROUTES } from "../../router/Routs";
import { AppBar, Box } from "@mui/material";
import NavBar from "../../Components/NavBar";

const Products = () => {
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
      <Box>Products</Box>
    </Fragment>
  );
};

export default Products;
