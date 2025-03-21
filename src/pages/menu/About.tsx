import React, { Fragment } from "react";
import {
  AppBar,
  Box,
  Container,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import NavBar from "../../Components/NavBar";
import { ROUTES } from "../../router/Routs";
import { NavigationUtils } from "../../utils/NavigationUtils";

const About = () => {
  const { navigateTo } = NavigationUtils();

  const handleBack = () => {
    navigateTo(ROUTES.HOME);
    console.log("handleBack");
  };

  return (
    <Fragment>
      <AppBar position="fixed">
        <NavBar handleBack={handleBack} />
      </AppBar>
      <Box sx={{ mt: 10, p: 2 }}>
        <Container maxWidth="md">
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h4" gutterBottom>
              Traveler Assistant Bot for Sri Lankan Tourism
            </Typography>
            <Typography variant="body1" gutterBottom>
              This project was developed as part of the Master of Information
              Technology degree at the{" "}
              <strong>University of Colombo School of Computing (UCSC)</strong>.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Project Summary</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              The Traveler Assistant Bot is a Telegram-based platform designed
              to help tourists in Sri Lanka discover, book, and pay for local
              services—such as guides, rentals, and accommodations—without the
              need for downloading additional apps. The system supports
              real-time service booking, multilingual communication, secure
              transactions via PayHere, and offers admin-level oversight for
              service provider verification and fraud detection.
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6">Project Details</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Developer:</strong> S. Arangajanan <br />
              <strong>Index No:</strong> 2022/MIT/002 <br />
              <strong>Degree Program:</strong> Master of Information Technology{" "}
              <br />
              <strong>University:</strong> University of Colombo School of
              Computing (UCSC) <br />
              <strong>Year:</strong> 2024
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6">Technology Stack</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <ul>
                <li>Spring Boot (Backend)</li>
                <li>React.js (Admin Panel)</li>
                <li>Telegram Bot & Web App Integration</li>
                <li>MySQL & Redis for Data Management</li>
                <li>JWT Authentication & PayHere Payment Gateway</li>
              </ul>
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "gray" }}
            >
              This project aims to bridge the gap between tourists and local
              service providers, improving Sri Lanka’s tourism experience
              through technology.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Fragment>
  );
};

export default About;
