import {
  AppBar,
  Box,
  Container,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import NavBar from "../../Components/NavBar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavigationUtils } from "../../utils/NavigationUtils";
import { ROUTES } from "../../router/Routs";
import { GetServicesCardResponse } from "../../Interfaces/CardDetailsInterface";
import { useLocation } from "react-router-dom";
import DateTimePickerComponent from "../../Components/DateTimePickerComponent";
import UseNetworkCalls from "../../hooks/networkCalls/UseNetworkCalls";
import { CreateBookingRequest } from "../../Interfaces/BookingInterface";

const CardDetails = () => {
  const { navigateTo } = NavigationUtils();
  const location = useLocation();
  const cardData = location.state
    ?.cardData as GetServicesCardResponse["content"][0];

  const [bookingDateFrom, setBookingDateFrom] = useState<Date | null>(null);
  const [bookingDateTo, setBookingDateTo] = useState<Date | null>(null);

  const { submitBooking } = UseNetworkCalls();

  const handleBack = () => {
    navigateTo(ROUTES.HOME);
    console.log("Navigating back to Home");
  };

  const handleBooking = async (serviceTypeId: number) => {
    if (!bookingDateFrom || !bookingDateTo) {
      alert("Please select both booking start and end dates.");
      return;
    }
    try {
      const submitBookingReq: CreateBookingRequest = {
        serviceTypeId,
        bookingDateFrom: bookingDateFrom.toISOString(),
        bookingDateTo: bookingDateTo.toISOString(),
        status: "PENDING",
      };
      const responce = await submitBooking(submitBookingReq);
      alert(responce.message);
      navigateTo(ROUTES.MYHIRES);
    } catch (error: any) {
      alert("Error Occurred");
    }
  };

  if (!cardData) {
    return (
      <Fragment>
        <AppBar position="fixed">
          <NavBar handleBack={handleBack} />
        </AppBar>
        <Box sx={{ marginTop: "80px", padding: "20px" }}>
          <Typography variant="h4" gutterBottom>
            No data found
          </Typography>
        </Box>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {/* AppBar with NavBar */}
      <AppBar position="fixed">
        <NavBar handleBack={handleBack} />
      </AppBar>

      {/* Main Container */}
      <Container sx={{ marginTop: "80px", padding: "20px" }}>
        {/* Service Image */}
        <Box
          sx={{
            height: "300px",
            width: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundImage: `url(${
              cardData.imageUrl || "https://via.placeholder.com/800x300"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginBottom: "20px",
          }}
        />
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "justify", color: "rgb(231, 229, 229)" }}
        >
          {cardData.serviceName}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          gutterBottom
          sx={{ textAlign: "justify", color: "rgb(231, 229, 229)" }}
        >
          {cardData.description}
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          gutterBottom
          sx={{ textAlign: "justify", color: "rgb(231, 229, 229)" }}
        >
          Base Price: {cardData.basePrice} LKR
        </Typography>

        {/* Service Types */}
        {/* Service Types */}
        <Grid container spacing={2}>
          {cardData.ServiceType.map((type) => (
            <Grid item xs={12} sm={6} key={type.id}>
              <Box
                sx={{
                  borderRadius: "12px",
                  padding: "16px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "justify",
                    color: "black",
                    paddingBottom: "10px",
                  }}
                >
                  {type.typeName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: "justify",
                    color: "black",
                    paddingBottom: "10px",
                  }}
                >
                  {type.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: "justify",
                    color: "black",
                    paddingBottom: "10px",
                  }}
                >
                  Price: {type.price} LKR
                </Typography>

                {/* Attributes */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Attributes</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {type.serviceAttributes.map((attr) => (
                      <Typography key={attr.id} variant="body2">
                        {attr.attributeName}: {attr.attributeValue}
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>

                {/* Pricing Rules */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Seasonal Pricing</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {type.pricingRuleRegistrations.map((rule) => (
                      <Typography key={rule.id} variant="body2">
                        {rule.pricingType}: ${rule.price} (From{" "}
                        {new Date(rule.startDate).toLocaleDateString()} to{" "}
                        {new Date(rule.endDate).toLocaleDateString()})
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>

                <Box
                  sx={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  {/* Date Pickers */}
                  <DateTimePickerComponent
                    label="Booking Start"
                    value={bookingDateFrom}
                    onChange={setBookingDateFrom}
                    height="50px"
                  />
                  <DateTimePickerComponent
                    label="Booking End"
                    value={bookingDateTo}
                    onChange={setBookingDateTo}
                    height="50px"
                  />
                </Box>
                {/* Booking Button */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    marginTop: "10px",
                    marginBottom: "10px",
                    backgroundColor: "rgb(25, 23, 37)",
                  }}
                  onClick={() => handleBooking(type.id)}
                >
                  Book Now
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default CardDetails;
