import { AppBar, Box, TablePagination } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { NavigationUtils } from "../utils/NavigationUtils";
import UseNetworkCalls from "../hooks/networkCalls/UseNetworkCalls";
import { ROUTES } from "../router/Routs";
import {
  ApproveBooking,
  Booking,
  GetAllBookingsRequest,
  GetAllBookingsResponse,
} from "../Interfaces/BookingInterface";
import BookingListItem from "../Components/BookingListItem";
import DetailModel from "../Components/DetailModel";

export interface ButtonConfig {
  label: string;
  onClick: () => void;
  color?:
    | "success"
    | "error"
    | "warning"
    | "inherit"
    | "primary"
    | "secondary"
    | "info";
  visible?: boolean;
}

// interface ApproveBooking {
//   bookingId: number;
//   status: string;
// }

interface ApprovalResponse {
  message: string;
  bookingDateTo?: string; // Optional property
}

const MyClients = () => {
  const { navigateTo } = NavigationUtils();
  const { getAllMyBookings, approvals } = UseNetworkCalls();

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

  // +++++++++++++++++Methods+++++++++++++++++++++++++++++
  const handleBack = () => {
    navigateTo(ROUTES.HOME);
    // Logic for back button (e.g., navigate back)
    console.log("handleBack");
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
        const response = await getAllMyBookings(request);
        console.log("responce", response.content);

        setServiceDataData(response);
        console.log(serviceDataData);

        setTotalRecords(response.totalElements);
        setLoading(false);
      } catch (error: any) {
        alert("error Occurred");
        navigateTo("/");
        setError(error.message);
      }
    };
    fetchServiceData();
  }, [page, rowsPerPage, filters]);

  //++++++++++++Internal Functions and other dats++++++++++++++++++++++

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBooking(null);
  };

  const handleCardClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const sendApprovalRequest = async (
    bookingId: number,
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED"
  ): Promise<ApprovalResponse | null> => {
    const approveRequest: ApproveBooking = {
      bookingId,
      status,
    };

    try {
      const response = await approvals(approveRequest);
      return response;
    } catch (error) {
      console.error("Error in sending approval request:", error);
      return null;
    }
  };

  const handleApprove = async () => {
    if (selectedBooking?.id === undefined) {
      alert("Booking ID is undefined");
      return;
    }
    const responce = sendApprovalRequest(selectedBooking.id, "ACCEPTED");
    if (responce != null) {
      alert(responce);
    }
  };

  const handleReject = async () => {
    if (selectedBooking?.id === undefined) {
      alert("Booking ID is undefined");
      return;
    }
    const responce = sendApprovalRequest(selectedBooking.id, "REJECTED");
    if (responce != null) {
      alert(responce);
    }
  };

  const handleComplete = async () => {
    if (selectedBooking?.id === undefined) {
      alert("Booking ID is undefined");
      return;
    }
    const responce = sendApprovalRequest(selectedBooking.id, "COMPLETED");
    if (responce != null) {
      alert(responce);
    }
  };

  // Define buttons dynamically based on booking status
  const buttons: ButtonConfig[] = selectedBooking
    ? [
        {
          label: "Approve",
          onClick: handleApprove,
          visible: selectedBooking.status === 1,
          color: "success", // ✅ Valid color
        },
        {
          label: "Reject",
          onClick: handleReject,
          visible: selectedBooking.status === 1,
          color: "error", // ✅ Valid color
        },
        {
          label: "Complete",
          onClick: handleComplete,
          visible: selectedBooking.status === 2,
          color: "inherit", // ✅ Valid color
        },
        {
          label: "Close",
          onClick: handleCloseModal,
          color: "warning", // ✅ Valid color
        },
      ]
    : [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
        title="My Clients"
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
          count={totalRecords} // Total records
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

export default MyClients;
