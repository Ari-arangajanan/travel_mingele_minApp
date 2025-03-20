import { Fragment, useEffect, useState } from "react";
import { NavigationUtils } from "../utils/NavigationUtils";
import { ROUTES } from "../router/Routs";
import { AppBar, Box, CircularProgress, Typography } from "@mui/material";
import NavBar from "../Components/NavBar";
import CustomBarChart from "../Components/charts/CustomBarChart";
import InfoTile from "../Components/InfoTile";
import AccountBalanceIcon from "@mui/icons-material/AccountBalanceWallet";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  DashBoardInterfaceRequest,
  DashBoardStatisticResponse,
} from "../Interfaces/DashBoardInterface";
import UseNetworkCalls from "../hooks/networkCalls/UseNetworkCalls";

export const dataset = [
  {
    value: "2",
    name: "Sai",
  },
  {
    value: "2",
    name: "Luxury Hotel Stay",
  },
  {
    value: "1",
    name: "Luxury Vehicle Rental",
  },
];

const DashBoard = () => {
  const { navigateTo } = NavigationUtils();
  const { getDashBoard } = UseNetworkCalls();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dataset, setDataset] = useState<DashBoardStatisticResponse>();

  const handleBack = () => {
    navigateTo(ROUTES.HOME);
    // Logic for back button (e.g., navigate back)
    console.log("handleBack");
  };

  useEffect(() => {
    const fetchDashboardStatistics = async () => {
      setLoading(true);
      // Logic for fetch dashboard statistics
      const request: DashBoardInterfaceRequest = {
        // Add request parameters
      };
      try {
        const response = await getDashBoard(request);
        console.log("fetchDashboardStatistics", response);
        setDataset(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardStatistics();
  }, []);

  // loading and error handling
  if (loading) {
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 5 }}>
        {error}
      </Typography>
    );
  }
  return (
    <Fragment>
      <Box sx={{ mb: 8 }}>
        <AppBar position="fixed">
          <NavBar handleBack={handleBack} />
        </AppBar>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        gap={2}
        // alignItems={"center"}
        sx={{
          width: "100%", // Ensures full width
          maxWidth: "90vw", // Prevents horizontal overflow
          overflowX: "auto", // Enables horizontal scrolling if necessary
          overflowY: "hidden", // Hides vertical scrolling
          padding: 1,
          marginLeft: 1,
          marginRight: "auto",
          mt: 5,
        }}
      >
        <Box display={"flex"} gap={2}>
          <InfoTile
            label="Total Bookings"
            data={dataset?.totalBookings || ""}
            icon={<AssignmentIcon />}
          />
          <InfoTile
            label="Account Balance"
            data={dataset?.balance?.toFixed(2) || ""}
            icon={<AccountBalanceIcon />}
          />
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        // alignItems={"center"}
        sx={{
          width: "100%", // Ensures full width
          maxWidth: "90vw", // Prevents horizontal overflow
          overflowX: "auto", // Enables horizontal scrolling if necessary
          overflowY: "hidden", // Hides vertical scrolling
          padding: 1,
          marginLeft: 1,
          marginRight: "auto",
        }}
      >
        <CustomBarChart
          dataset={
            dataset?.bookingsGraphOfServiceProvider?.map((x) => ({
              ...x,
              value: Number(x.value),
            })) || []
          }
          xKey="name"
          yKeys={["value"]}
          labels={{
            yAxis: "booking frequency",
            series: ["Booked Services"],
          }}
          height={200}
        />
        <CustomBarChart
          dataset={
            dataset?.bookingsGraphUser?.map((x) => ({
              ...x,
              value: Number(x.value),
            })) || []
          } // Ensure it's always an array
          xKey="name"
          yKeys={["value"]}
          labels={{
            yAxis: "Hiring frequency",
            series: ["Hired Services"],
          }}
          height={200}
        />
      </Box>
    </Fragment>
  );
};

export default DashBoard;
