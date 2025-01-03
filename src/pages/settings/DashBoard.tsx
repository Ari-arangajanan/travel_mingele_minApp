import {
  AppBar,
  Box,
  Button,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { NavigationUtils } from "../../utils/NavigationUtils";
import { ROUTES } from "../../router/Routs";
import { GetServicesResponse } from "../../Interfaces/ServiceInterface";
import UseNetworkCalls from "../../hooks/networkCalls/UseNetworkCalls";
import { transformToCardData } from "../../utils/CommonMethods";
import Card from "../../Components/Card";
import {
  Booking,
  GetAllBookingsRequest,
  GetAllBookingsResponse,
} from "../../Interfaces/BookingInterface";
import BookingListItem from "../../Components/BookingListItem";
import DetailModel from "../../Components/DetailModel";

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

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleClick = (booking: Booking) => {
    console.log("handleClick", booking);

    // Logic for handling click on a booking
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // +++++++++++++++++++++++++++++++++

  const handleCardClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBooking(null);
  };

  // Define buttons dynamically based on booking status
  const buttons = selectedBooking
    ? [
        {
          label: "Approve",
          onClick: () => alert("Approved"),
          visible: selectedBooking.status === 0,
        },
        {
          label: "Reject",
          onClick: () => alert("Rejected"),
          visible: selectedBooking.status === 4,
        },
        {
          label: "Close",
          onClick: handleCloseModal,
        },
      ]
    : [];

  return (
    <Fragment>
      <AppBar position="fixed">
        <NavBar handleBack={handleBack} />
      </AppBar>
      <Box sx={{ marginTop: "60px" }}>
        {serviceDataData?.content.map((service) => (
          <BookingListItem
            key={service.id}
            onClick={handleCardClick}
            booking={service}
          />
        ))}
      </Box>
      <DetailModel
        open={modalOpen}
        booking={selectedBooking}
        buttons={buttons}
        onClose={handleCloseModal}
        title="Booking Details"
      />
      <Box
      // position={"fixed"}
      // bottom={0}
      // width="100%"
      // sx={{
      //   backgroundColor: "#191725", // Highlight background color from the theme
      //   // color: "white", // Text color for contrast
      //   boxShadow: 2, // Optional shadow for a more prominent look
      // }}
      >
        <TablePagination
          component="div"
          count={serviceDataData?.content.length ?? 0} // Total records
          page={page} // Current page index
          onPageChange={handlePageChange} // Handle page change
          rowsPerPage={rowsPerPage} // Records per page
          onRowsPerPageChange={handleRowsPerPageChange} // Handle rows per page change
          rowsPerPageOptions={[5, 10, 20]} // Options for records per page
        />
      </Box>
    </Fragment>
  );
};

export default DashBoard;
