import { Box, Typography } from "@mui/material";
import React from "react";

interface MapDisplayProps {
  latitude: number;
  longitude: number;
  width?: string;
  height?: string;
}

const DisplayMap: React.FC<MapDisplayProps> = ({
  latitude,
  longitude,
  width = "250px",
  height = "250px",
}) => {
  const googleMapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1">Location</Typography>
      <iframe
        title="Google Map"
        src={googleMapUrl}
        width={width}
        height={height}
        style={{ borderRadius: "8px", border: "none" }}
        loading="lazy"
      ></iframe>
    </Box>
  );
};

export default DisplayMap;
