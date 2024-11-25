import { AppBar, Box } from "@mui/material";
import React, { Fragment } from "react";
import NavBar from "./NavBar";

const CardDetails = () => {
  return (
    <Fragment>
      <AppBar position="fixed">
        <NavBar />
      </AppBar>
      <Box>sample</Box>
    </Fragment>
  );
};

export default CardDetails;
