import { Fragment } from "react";
import { NavigationUtils } from "../utils/NavigationUtils";
import { ROUTES } from "../router/Routs";
import { AppBar, Box } from "@mui/material";
import NavBar from "../Components/NavBar";

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
      <Box>Dashboard under construction</Box>
    </Fragment>
  );
};

export default DashBoard;
