import { Fragment } from "@emotion/react/jsx-runtime";
import { AppBar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import NavBar from "../../Components/NavBar";
import { NavigationUtils } from "../../utils/NavigationUtils";
import { ROUTES } from "../../router/Routs";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UseNetworkCalls from "../../hooks/networkCalls/UseNetworkCalls";
import { PaymentInvoiceResponse } from "../../Interfaces/InvoiceInterface";
import PaymentPopUpModel from "../../Components/PaymentPopUpModel";

const Payment = () => {
  const { navigateTo } = NavigationUtils();
  const { state } = useLocation(); // Extract payment details from navigation state
  const { orderId } = useParams();
  const { getInvoice, pay } = UseNetworkCalls();

  //handle data
  const [invoiceData, setInvoiceData] = useState<PaymentInvoiceResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //handle payment
  const [payOpen, setPayOpen] = useState(false);
  const [selectPayment, setSelectPayment] =
    useState<PaymentInvoiceResponse | null>(null);

  const handleBack = () => {
    navigateTo(ROUTES.MYHIRES);
    // Logic for back button (e.g., navigate back)
    console.log("handleBack");
  };

  useEffect(() => {
    setLoading(true);
    // Fetch payment details using orderId
    console.log("orderId", orderId);
    console.log("state", state);
    const fetchInvoice = async () => {
      try {
        if (!orderId) {
          throw new Error("Invalid orderId");
        }
        const response = await getInvoice({ orderId: orderId });
        console.log("response", response);
        setInvoiceData(response);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [orderId, state]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleClosePay = () => {
    setPayOpen(false);
    setSelectPayment(null);
  };

  // pay payment
  const handleCash = () => {
    alert("Cash Pay: " + selectPayment?.id);
    console.log("Pay", selectPayment);
  };

  const handleBankPay = () => {
    alert("BankPay: " + selectPayment?.id);
  };

  const handleCardPay = async () => {
    if (selectPayment && selectPayment.id !== undefined) {
      const paymentUrl = await payment(selectPayment.id, "CARD");
      if (paymentUrl) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = paymentUrl as string;
        form.style.display = "none";
        document.body.appendChild(form);
        form.submit();
      }
    } else {
      alert("Selected booking is null");
    }
  };

  const payment = async (
    bookingId: number,
    paymentMethod: "CARD" | "BANK_TRANSFER" | "CASH"
  ) => {
    const payRequest = {
      bookingId,
      paymentMethod: paymentMethod,
    };
    try {
      const response = await pay(payRequest);
      return response;
    } catch (error) {
      return null;
    }
  };

  const payNow = () => {
    setPayOpen(true);
    setSelectPayment(invoiceData ? invoiceData : null);
  };

  const handleCloseModal = () => {
    setPayOpen(false);
    setSelectPayment(null);
  };

  //handle payment
  const buttonsToPay = selectPayment
    ? [
        {
          label: "Cash",
          onClick: handleCash,
        },
        {
          label: "Bank",
          onClick: handleBankPay,
        },
        {
          label: "Card",
          onClick: handleCardPay,
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          minWidth: "90vw",
          backgroundColor: "#f4f4f4",
          padding: "20px",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            maxWidth: "400px",
            width: "100%",
            borderRadius: "16px",
            padding: "20px",
            backgroundColor: "#fff",
            marginTop: 5,
          }}
        >
          {/* Invoice Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Invoice
            </Typography>
          </Box>

          {/* Invoice Body */}
          <Box sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px", p: 2 }}>
            <Grid
              container
              spacing={1}
              sx={{ borderBottom: "1px solid #ddd", pb: 1 }}
            >
              <Grid item xs={3}>
                <Typography fontWeight="bold">Id.</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography fontWeight="bold">Service Name</Typography>
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Typography fontWeight="bold">Amount</Typography>
              </Grid>
            </Grid>

            {/* Invoice Data */}
            <Grid
              container
              spacing={1}
              sx={{ py: 1, borderBottom: "1px solid #eee" }}
            >
              <Grid item xs={3}>
                <Typography>{invoiceData?.id}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{invoiceData?.booking.service_name}</Typography>
              </Grid>
              <Grid item xs={3} textAlign="right">
                <Typography>{invoiceData?.amount}</Typography>
              </Grid>
            </Grid>

            {/* Subtotal & Total */}
            <Box sx={{ mt: 2, textAlign: "right" }}>
              <Typography>
                Subtotal: <strong>{invoiceData?.amount}</strong>
              </Typography>
              <Typography>
                Handling fee 3.3%:{" "}
                <strong>{((invoiceData?.amount ?? 0) * 3.3) / 100}</strong>
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  backgroundColor: "#000",
                  color: "#fff",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  display: "inline-block",
                }}
              >
                <Typography fontWeight="bold">
                  Total →{" "}
                  {(invoiceData?.amount ?? 0) +
                    ((invoiceData?.amount ?? 0) * 3.3) / 100}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Thank You Message */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography
              sx={{
                backgroundColor: "#eee",
                borderRadius: "12px",
                px: 3,
                py: 1,
                display: "inline-block",
                fontSize: "12px",
              }}
            >
              Thanks for Booking !!
            </Typography>
          </Box>

          {/* Invoice Details */}
          <Box sx={{ mt: 2, fontSize: "14px", color: "#555" }}>
            <Typography display="flex" justifyContent="space-between">
              <span>Order No.</span>{" "}
              <Box
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  p: 1,
                  display: "inline-block",
                  fontSize: "10px",
                }}
              >
                {invoiceData?.paymentOrderId}
              </Box>
            </Typography>
            <Typography display="flex" justifyContent="space-between">
              <span>Date</span>{" "}
              <strong>
                {new Date(invoiceData?.createdAt ?? "").toLocaleDateString()}
              </strong>
            </Typography>
            <Typography display="flex" justifyContent="space-between">
              <span>Billed to</span>{" "}
              <strong>{invoiceData?.booking.user_name}</strong>
            </Typography>
            <Typography fontSize="12px" color="gray" mt={1}>
              Service Provider: {invoiceData?.booking.service_provider_name}
            </Typography>
          </Box>

          {/* Pay Now Button */}
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                fontSize: "16px",
                py: 1.5,
              }}
              onClick={payNow}
            >
              Pay Now
            </Button>
          </Box>
          {/* // fixme: PaymentPopUpModel */}
          <PaymentPopUpModel
            open={payOpen}
            booking={
              invoiceData
                ? {
                    id: invoiceData.id,
                    price: invoiceData.amount,
                    bookingDateFrom: invoiceData.booking.bookingDateFrom,
                    bookingDateTo: invoiceData.booking.bookingDateTo,
                    status: invoiceData.paymentStatus,
                    orderId: invoiceData.paymentOrderId,
                  }
                : null
            }
            buttons={buttonsToPay}
            onClose={handleClosePay}
            title="Payment Details"
          />
        </Paper>
      </Box>
    </Fragment>
  );
};

export default Payment;
