import { Card, CardContent, Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";

interface InfoTileProps {
  label: string;
  data: string | number;
  icon: ReactNode;
}

const InfoTile: React.FC<InfoTileProps> = ({ label, data, icon }) => {
  return (
    <Card sx={{ textAlign: "left", p: 0.5, bgcolor: "#f5f5f5", flex: 0.5 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={0.5}
        >
          <Typography variant="subtitle1" color="textSecondary">
            {icon} {label}
          </Typography>
        </Box>
        <Typography variant="h5" fontWeight="bold">
          {data}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoTile;
