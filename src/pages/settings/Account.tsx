import { Fragment, useEffect, useState } from "react";
import { NavigationUtils } from "../../utils/NavigationUtils";
import { ROUTES } from "../../router/Routs";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import NavBar from "../../Components/NavBar";
import {
  UserPaymentAccountRequest,
  UserPaymentAccountResponse,
} from "../../Interfaces/AccountInterface";
import UseNetworkCalls from "../../hooks/networkCalls/UseNetworkCalls";
import InfoTile from "../../Components/InfoTile";
import AccountBalanceIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const Account = () => {
  const { navigateTo } = NavigationUtils();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentAccount, setPaymentAccount] =
    useState<UserPaymentAccountResponse | null>(null);
  const { getMyPaymentAccount, createPaymentAccount } = UseNetworkCalls();

  const handleBack = () => {
    navigateTo(ROUTES.HOME);
    // Logic for back button (e.g., navigate back)
    console.log("handleBack");
  };

  // handle create button to create payment account
  const handleAddClick = async () => {
    setLoading(true);
    // Logic for add button (e.g., navigate to add page)
    console.log("handleAddClick");
    alert("Create Payment Account");
    const paymentAccountRequest: UserPaymentAccountRequest = {};
    try {
      const response = await createPaymentAccount(paymentAccountRequest);
      setPaymentAccount(response);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPaymentAccount = async () => {
      setLoading(true);
      try {
        const response = await getMyPaymentAccount();
        setPaymentAccount(response);
        console.log("Payment Account", response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentAccount();
  }, []);

  // handle loading and error
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
      <AppBar position="fixed">
        <NavBar handleBack={handleBack} />
      </AppBar>
      <Box
        position="fixed"
        display="flex"
        justifyContent="center"
        sx={{
          top: "50px", // Adjust based on AppBar height (default is 64px for desktop)
          backgroundColor: "#f4f4f4", // Optional background color
          // zIndex: 1,
          padding: 1.5,
          width: "100%",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#191725",
            mt: 1,
          }}
          variant="contained"
          disabled={paymentAccount ? true : false}
          onClick={handleAddClick}
        >
          Create Payment Account
        </Button>
      </Box>
      <Box gap={2} sx={{ marginTop: 10, padding: 2 }}>
        {/* Account Balance and Currency Tiles */}
        <Box display="flex" gap={2} mb={3}>
          <InfoTile
            label="Account Balance"
            data={paymentAccount?.accountBalance?.toFixed(2) || "0.00"}
            icon={<AccountBalanceIcon />}
          />
          <InfoTile
            label="Currency"
            data={paymentAccount?.currency?.toUpperCase() || "NA"}
            icon={<MonetizationOnIcon />}
          />
        </Box>

        {/* User Profile Card */}
        <Box gap={2}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
            }}
          >
            <Avatar
              src={paymentAccount?.serviceProvider?.avatar}
              alt={paymentAccount?.serviceProvider?.userName}
              sx={{ width: 80, height: 80, mr: 3 }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {paymentAccount?.serviceProvider?.firstName}{" "}
                {paymentAccount?.serviceProvider?.lastName}
              </Typography>
              <Typography color="textSecondary">
                @{paymentAccount?.serviceProvider?.userName}
              </Typography>
              <Typography variant="body2">
                Email: {paymentAccount?.serviceProvider?.email}
              </Typography>
              <Typography variant="body2">
                Phone: {paymentAccount?.serviceProvider?.phone}
              </Typography>
              <Typography variant="body2">
                Status:{" "}
                {paymentAccount?.serviceProvider?.status === 1
                  ? "Active"
                  : "Inactive"}
              </Typography>
              <Typography variant="body2">
                Registered on:{" "}
                {new Date(
                  paymentAccount?.serviceProvider?.registrationDate || ""
                ).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Account;
