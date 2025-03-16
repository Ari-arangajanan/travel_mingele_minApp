import { Box, TextField, Typography, Button } from "@mui/material";
import React from "react";
import PricingRuleForm from "./PricingRuleForm";
import AttributeForm from "./AttributeForm";

interface ServiceTypeProps {
  index: number;
  serviceType: any;
  updateServiceType: (index: number, updatedType: any) => void;
  removeServiceForm: () => void; // Add remove function
}
const ServiceTypeForm: React.FC<ServiceTypeProps> = ({
  index,
  serviceType,
  updateServiceType,
  removeServiceForm,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateServiceType(index, {
      ...serviceType,
      [e.target.name]: e.target.value,
    });
  };

  const addAttribute = () => {
    updateServiceType(index, {
      ...serviceType,
      serviceAttributeRegistrations: [
        ...serviceType.serviceAttributeRegistrations,
        { attributeName: "", attributeValue: "" },
      ],
    });
  };

  const addPricingRule = () => {
    updateServiceType(index, {
      ...serviceType,
      pricingRuleRegistrations: [
        ...serviceType.pricingRuleRegistrations,
        { pricingType: "", price: 0, startDate: "", endDate: "" },
      ],
    });
  };

  const removeAttribute = (attrIndex: number) => {
    const updatedAttributes = serviceType.serviceAttributeRegistrations.filter(
      (_: any, i: number) => i !== attrIndex
    );
    updateServiceType(index, {
      ...serviceType,
      serviceAttributeRegistrations: updatedAttributes,
    });
  };

  const removePricingRule = (ruleIndex: number) => {
    const updatedRules = serviceType.pricingRuleRegistrations.filter(
      (_: any, i: number) => i !== ruleIndex
    );
    updateServiceType(index, {
      ...serviceType,
      pricingRuleRegistrations: updatedRules,
    });
  };

  const updateAttribute = (attrIndex: number, updatedAttribute: any) => {
    // Create a new copy of the attribute list
    const updatedAttributes = [...serviceType.serviceAttributeRegistrations];

    // Replace the specific attribute
    updatedAttributes[attrIndex] = updatedAttribute;

    console.log("updatedAttributes", updatedAttributes);

    // Ensure immutability by creating a new object reference
    updateServiceType(index, {
      ...serviceType,
      serviceAttributeRegistrations: updatedAttributes,
    });
  };

  return (
    <Box sx={{ border: "1px solid gray", padding: 2, mt: 2 }}>
      <Typography variant="h6">Service Type</Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          fullWidth
          label="Type Name"
          name="typeName"
          value={serviceType.typeName}
          onChange={handleChange}
          sx={{ mt: 1 }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={serviceType.description}
          onChange={handleChange}
          sx={{ mt: 1 }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          fullWidth
          type="number"
          label="Price"
          name="price"
          value={serviceType.price}
          onChange={handleChange}
          sx={{ mt: 1 }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Attributes
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {serviceType.serviceAttributeRegistrations.map(
          (attr: any, attrIndex: number) => (
            <AttributeForm
              key={attrIndex}
              index={attrIndex}
              attribute={attr}
              updateAttribute={(updatedAttribute: any) =>
                updateAttribute(index, updatedAttribute)
              }
              removeAttribute={() => removeAttribute(attrIndex)}
            />
          )
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Button onClick={addAttribute}>Add Attribute</Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Pricing Rules
        </Typography>
        {serviceType.pricingRuleRegistrations.map(
          (rule: any, ruleIndex: number) => (
            <PricingRuleForm
              key={ruleIndex}
              index={ruleIndex}
              pricingRule={rule}
              updatePricingRule={(updatedRule: any) => {
                const updatedRules = [...serviceType.pricingRuleRegistrations];
                updatedRules[ruleIndex] = updatedRule;
                updateServiceType(index, {
                  ...serviceType,
                  pricingRuleRegistrations: updatedRules,
                });
              }}
              removePricingRule={() => removePricingRule(ruleIndex)}
            />
          )
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={addPricingRule}>Add Pricing Rule</Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button color="error" onClick={removeServiceForm}>
          Remove Service Type
        </Button>
      </Box>
    </Box>
  );
};

export default ServiceTypeForm;
