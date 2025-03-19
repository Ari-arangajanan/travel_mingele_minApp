import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";

interface ButtonConfig {
  label: string;
  onClick: (id: number) => void;
  disabled?: boolean;

  color?:
    | "primary"
    | "secondary"
    | "inherit"
    | "success"
    | "error"
    | "info"
    | "warning";
  visible?: boolean;
}

interface BookingDetailModalProps {
  open: boolean;
  booking: {
    id: number;
    price: number;
    bookingDateFrom: string;
    bookingDateTo: string;
    status: number;
  } | null;
  buttons: ButtonConfig[];
  onClose: () => void;
  title: string;
}

// pop-up window for booking details
const DetailModel: React.FC<BookingDetailModalProps> = ({
  open,
  booking,
  buttons,
  onClose,
  title,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Booking #{booking?.id}</Typography>
        <Typography>Price: Rs.{booking?.price}</Typography>
        <Typography>
          From: {new Date(booking?.bookingDateFrom || "").toLocaleString()}
        </Typography>
        <Typography>
          To: {new Date(booking?.bookingDateTo || "").toLocaleString()}
        </Typography>
      </DialogContent>
      <DialogActions>
        {buttons
          .filter((button) => button.visible !== false) // Only show visible buttons
          .map((button, index) => (
            <Button
              key={index}
              onClick={() => booking && button.onClick(booking.id)}
              disabled={button.disabled}
              variant="contained"
              color={button.color}
            >
              {button.label}
            </Button>
          ))}
      </DialogActions>
    </Dialog>
  );
};

export default DetailModel;
