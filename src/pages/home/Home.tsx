import { AppBar, Box } from "@mui/material";
import React, { Fragment } from "react";
import NavBar from "../../Components/NavBar";
import Button from "../../Components/Button";

const Home: React.FC = () => {
  return (
    <>
      <Fragment>
        <AppBar position="fixed">
          <NavBar />
        </AppBar>
        <Button children="Button" onClick={() => console.log("clocked")} />
        <Box>
          <h1>sample</h1>
        </Box>
      </Fragment>
    </>
  );
};

export default Home;
