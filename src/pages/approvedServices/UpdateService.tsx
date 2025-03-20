import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import { NavigationUtils } from "../../utils/NavigationUtils";
import { ROUTES } from "../../router/Routs";
import { useParams } from "react-router-dom";
import UseNetworkCalls from "../../hooks/networkCalls/UseNetworkCalls";
import { GetService } from "../../Interfaces/ServiceInterface";
import ImageUpload from "../../Components/ImageUpload";
import { UpdateServiceRequest } from "../../Interfaces/UpdateServiceInterface";

const UpdateService = () => {
  const { navigateTo } = NavigationUtils();
  const { id } = useParams<{ id: string }>();
  const { getServiceByFilter, updateService } = UseNetworkCalls();
  const [service, setService] = useState<GetService | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);

  const handleBack = () => {
    navigateTo(ROUTES.VIEW_SERVICE, { id: id || "" });
  };

  useEffect(() => {
    const fetchService = async () => {
      if (!id) {
        setError("Service ID is missing");
        setLoading(false);
        return;
      }
      setLoading(true);
      const params = {
        id: parseInt(id),
      };
      try {
        const response = await getServiceByFilter(params);
        console.log("view service response", response);

        setService(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, []);

  const handleUpdate = async () => {
    // Construct the update request
    if (!service) {
      setError("Service details are missing");
      return;
    }

    const updateRequest: UpdateServiceRequest = {
      id: service.id,
      basePrice: service.basePrice,
      imageUrl: service.imageUrl || undefined, // Include only if updated
      category_id: service.category_id || undefined, // Include only if updated
      category_name: service.category_name || undefined, // Include only if updated
      serviceType: service.ServiceType.map((type) => ({
        id: type.id,
        pricingRuleRegistrations: type.pricingRuleRegistrations.map((rule) => ({
          id: rule.id,
          pricingType: rule.pricingType,
          price: rule.price,
          startDate: rule.startDate,
          endDate: rule.endDate,
        })),
        serviceAttributeRegistrations: type.serviceAttributes.map((attr) => ({
          id: attr.id,
          attributeName: attr.attributeName,
          attributeValue: attr.attributeValue,
        })),
      })),
    };

    console.log("Service to be updated:", updateRequest);

    setUpdating(true);
    try {
      // Call the update service API
      // console.log("Service to be updated", service);
      await updateService(updateRequest);
      navigateTo(ROUTES.VIEW_SERVICE.replace(":id", id!));
    } catch (error: any) {
      console.error("Error updating service", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 5 }}>
        {error}
      </Typography>
    );
  }

  if (!service) {
    return (
      <Fragment>
        <Box>
          <AppBar position="fixed">
            <NavBar handleBack={handleBack} heading="View Service" />
          </AppBar>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
            No service details available.
          </Typography>
        </Box>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <Box>
        <AppBar position="fixed">
          <NavBar handleBack={handleBack} heading="Update Service" />
        </AppBar>
      </Box>
      <Box sx={{ width: "100%", padding: 3, marginTop: 5 }}>
        {/* <Typography variant="h4" gutterBottom>
          Update Service
        </Typography> */}

        <Card sx={{ marginBottom: 2 }}>
          <CardContent>
            {/* Update Service Image */}
            <Typography variant="h6">Service Image</Typography>
            <ImageUpload
              onUploadSuccess={(imageUrl) =>
                setService({ ...service, imageUrl })
              }
            />

            <Divider sx={{ my: 1 }} />

            {/* Update Base Price */}
            <Typography variant="h6">Base Price</Typography>
            <TextField
              fullWidth
              type="number"
              label="Base Price"
              value={service.basePrice}
              onChange={(e) =>
                setService({
                  ...service,
                  basePrice: parseFloat(e.target.value),
                })
              }
              sx={{ mt: 1 }}
            />

            <Divider sx={{ my: 1 }} />

            {/* Update Pricing Rules & Attributes */}
            <Typography variant="h6">Service Types</Typography>
            {service.ServiceType.map((type: any, index: number) => (
              <Card key={index} sx={{ marginTop: 2, padding: 2 }}>
                <Typography variant="h6">Type: {type.typeName}</Typography>

                {/* Update Attributes */}
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Attributes
                </Typography>
                {type.serviceAttributes.map((attr: any, attrIndex: number) => (
                  <TextField
                    key={attrIndex}
                    fullWidth
                    label={attr.attributeName}
                    value={attr.attributeValue}
                    onChange={(e) => {
                      const updatedAttributes = [...type.serviceAttributes];
                      updatedAttributes[attrIndex].attributeValue =
                        e.target.value;
                      setService({
                        ...service,
                        ServiceType: service.ServiceType.map(
                          (t: any, i: number) =>
                            i === index
                              ? { ...t, serviceAttributes: updatedAttributes }
                              : t
                        ),
                      });
                    }}
                    sx={{ mt: 1 }}
                  />
                ))}

                {/* Update Pricing Rules */}
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Pricing Rules
                </Typography>
                {type.pricingRuleRegistrations.map(
                  (rule: any, ruleIndex: number) => (
                    <TextField
                      key={ruleIndex}
                      fullWidth
                      label={`${rule.pricingType} Price`}
                      type="number"
                      value={rule.price}
                      onChange={(e) => {
                        const updatedRules = [...type.pricingRuleRegistrations];
                        updatedRules[ruleIndex].price = parseFloat(
                          e.target.value
                        );
                        setService({
                          ...service,
                          ServiceType: service.ServiceType.map(
                            (t: any, i: number) =>
                              i === index
                                ? {
                                    ...t,
                                    pricingRuleRegistrations: updatedRules,
                                  }
                                : t
                          ),
                        });
                      }}
                      sx={{ mt: 1 }}
                    />
                  )
                )}
              </Card>
            ))}
          </CardContent>
        </Card>

        <Button
          variant="contained"
          // color="primary"
          onClick={handleUpdate}
          disabled={updating}
          sx={{
            backgroundColor: "#191725",
            "&:hover": {
              backgroundColor: "#13121D", // Slightly darker for hover effect
            },
          }}
        >
          {updating ? "Updating..." : "Save Changes"}
        </Button>

        <Button
          variant="outlined"
          sx={{
            ml: 2,
            borderColor: "red", // Outline color changed to red
            color: "red", // Text color changed to red for consistency
            "&:hover": {
              backgroundColor: "#13121D", // Slightly darker for hover effect
              borderColor: "darkred", // Darker red on hover
            },
          }}
          onClick={() => navigateTo(ROUTES.VIEW_SERVICE.replace(":id", id!))}
        >
          Cancel
        </Button>
      </Box>
    </Fragment>
  );
};

export default UpdateService;
