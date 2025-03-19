import { Box, Typography } from "@mui/material";
import React from "react";

interface ImageDisplayProps {
  imageUrl: string;
  altText?: string;
  width?: string;
  height?: string;
}

const DisplayImage: React.FC<ImageDisplayProps> = ({
  imageUrl,
  altText = "Image",
  width = "250px",
  height = "250px",
}) => {
  const defaultImage = import.meta.env.VITE_DEFAULT_IMAGE;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Typography variant="subtitle1">Service Image</Typography>
      <img
        src={imageUrl || defaultImage}
        alt={altText}
        width={width}
        height={height}
        onError={(e) => (e.currentTarget.src = defaultImage)}
        style={{ borderRadius: "8px", objectFit: "cover" }}
      />
    </Box>
  );
};

export default DisplayImage;
