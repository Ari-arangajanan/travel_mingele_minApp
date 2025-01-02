import { AppBar, Box, Button, TablePagination } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { NavigationUtils } from "../../utils/NavigationUtils";
import { ROUTES } from "../../router/Routs";
import { GetServicesResponse } from "../../Interfaces/ServiceInterface";
import UseNetworkCalls from "../../hooks/networkCalls/UseNetworkCalls";
import { transformToCardData } from "../../utils/CommonMethods";
import Card from "../../Components/Card";
import {
  GetAllBookingsRequest,
  GetAllBookingsResponse,
} from "../../Interfaces/BookingInterface";

const DashBoard = () => {
  const { navigateTo } = NavigationUtils();
  const { getAllMyServices } = UseNetworkCalls();

  const [serviceDataData, setServiceDataData] =
    useState<GetAllBookingsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filters, setFilters] = useState<{ [key: string]: any }>({});

  const handleBack = () => {
    navigateTo(ROUTES.HOME);
    // Logic for back button (e.g., navigate back)
    console.log("handleBack");
  };

  useEffect(() => {
    const fetchServiceData = async () => {
      setLoading(true);
      try {
        const request: GetAllBookingsRequest = {
          page: page,
          limit: rowsPerPage,
          serviceId: 0,
          serviceTypeId: 0,
          serviceProvider: 0,
          userTelegramIdId: 0,
          userId: 0,
          bookingDateFrom: "",
          bookingDateTo: "",
          bookingId: 0,
          ...filters,
        };
        const response = await getAllMyServices(request);
        console.log("responce", response.content);

        setServiceDataData(response);
        console.log(serviceDataData);

        setTotalRecords(response.totalElements);
      } catch (error: any) {
        alert("error Occurred");
        navigateTo(ROUTES.HOME);
        setError(error.message);
      }
    };
    fetchServiceData();
  }, [page, rowsPerPage, filters]);

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
