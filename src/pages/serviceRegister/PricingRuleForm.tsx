import { Box, TextField, Button } from "@mui/material";
import React from "react";

interface PricingRuleFormProps {
  index: number;
  pricingRule: {
    pricingType: string;
    price: number;
    startDate: string;
    endDate: string;
  };
  updatePricingRule: (updatedRule: any) => void;
  removePricingRule: () => void;
}

const PricingRuleForm: React.FC<PricingRuleFormProps> = ({
  pricingRule,
  updatePricingRule,
  removePricingRule,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePricingRule({
      ...pricingRule,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 2,
        border: "1px solid gray",
        padding: 2,
        borderRadius: 1,
      }}
    >
      {/* Pricing Type & Price */}
      <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
        <TextField
          fullWidth
          label="Pricing Type"
          name="pricingType"
          value={pricingRule.pricingType}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          type="number"
          label="Price"
          name="price"
          value={pricingRule.price}
          onChange={handleChange}
        />
      </Box>

      {/* Start Date & End Date */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          fullWidth
          type="date"
          label="Start Date"
          name="startDate"
          InputLabelProps={{ shrink: true }}
          value={pricingRule.startDate}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          type="date"
          label="End Date"
          name="endDate"
          InputLabelProps={{ shrink: true }}
          value={pricingRule.endDate}
          onChange={handleChange}
        />
      </Box>

      {/* Remove Button */}
      <Button variant="contained" color="error" onClick={removePricingRule}>
        Remove
      </Button>
    </Box>
  );
};

export default PricingRuleForm;
