import { Box, Button, TextField } from "@mui/material";
import React from "react";

interface AttributeFormProps {
  index: number;
  attribute: { attributeName?: string; attributeValue?: string };
  updateAttribute: (updatedAttribute: any) => void;
  removeAttribute: () => void; // Add remove function
}

const AttributeForm: React.FC<AttributeFormProps> = ({
  attribute,
  updateAttribute,
  removeAttribute,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateAttribute({
      ...attribute,
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
      <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          fullWidth
          label="Attribute Name"
          name="attributeName"
          InputLabelProps={{ shrink: true }}
          value={attribute.attributeName} // ✅ Ensure it's always a string
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          fullWidth
          label="Attribute Value"
          name="attributeValue"
          InputLabelProps={{ shrink: true }}
          value={attribute.attributeValue} // ✅ Ensure it's always a string
          onChange={handleChange}
        />
      </Box>
      <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={removeAttribute}
          sx={{ height: "100%" }}
        >
          Remove
        </Button>
      </Box>
    </Box>
  );
};

export default AttributeForm;
