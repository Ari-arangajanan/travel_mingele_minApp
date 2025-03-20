import React from "react";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart } from "@mui/x-charts/BarChart";
import { SxProps } from "@mui/system";

// Define the props type
interface CustomBarChartProps {
  dataset: Record<string, any>[]; // Dataset should be an array of objects
  xKey: string; // Key for x-axis values
  yKeys: string[]; // Array of keys for y-axis values (supports multiple series)
  labels: {
    yAxis: string; // Label for the y-axis
    series: string[]; // Labels for each series
  };
  height?: number; // Optional height, default is 300
  sx?: SxProps; // Optional style
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({
  dataset,
  xKey,
  yKeys,
  labels,
  height = 300,
  sx = {},
}) => {
  const chartSetting = {
    yAxis: [{ label: labels.yAxis }],
    series: yKeys.map((key, index) => ({
      dataKey: key,
      label: labels.series[index] || key, // Fallback to key if no label provided
    })),
    height,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        borderRadius: 5,
        marginBottom: 10,
        border: "1px solid #e0e0e0",
        ...(sx as React.CSSProperties),
      }}
    >
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: xKey,
            tickPlacement: "middle",
            tickLabelPlacement: "middle",
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
};

export default CustomBarChart;
