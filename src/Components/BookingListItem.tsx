import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import React from "react";

interface BookingListItemProps {
  booking: {
    id: number;
    price: number;
    bookingDateFrom: string;
    bookingDateTo: string;
  };
  onClick: (booking: any) => void;
}

const BookingListItem: React.FC<BookingListItemProps> = ({
  booking,
  onClick,
}) => {
  return (
    <ListItem>
      <ListItemButton onClick={() => onClick(booking)}>
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText
          primary={`Booking #${booking.id}`}
          secondary={
            <>
              <Typography
                variant="body2"
                style={{ color: "#333" }}
                component="span"
              >
                Price: ${booking.price}
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "#333" }}
                component="span"
              >
                From: {new Date(booking.bookingDateFrom).toLocaleString()}
              </Typography>
              <Typography
                variant="body2"
                style={{ color: "#333" }}
                component="span"
              >
                To: {new Date(booking.bookingDateTo).toLocaleString()}
              </Typography>
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default BookingListItem;
