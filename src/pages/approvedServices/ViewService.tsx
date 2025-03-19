import { Fragment } from "@emotion/react/jsx-runtime";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import NavBar from "../../Components/NavBar";
import { NavigationUtils } from "../../utils/NavigationUtils";
import { ROUTES } from "../../router/Routs";
import UseNetworkCalls from "../../hooks/networkCalls/UseNetworkCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetService } from "../../Interfaces/ServiceInterface";
import DisplayMap from "../../Components/DisplayMap";
import DisplayImage from "../../Components/DisplayImage";

const ViewService = () => {
  const { navigateTo } = NavigationUtils();
  const { getServiceByFilter } = UseNetworkCalls();
  const [service, setService] = useState<GetService | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const handleBack = () => {
    navigateTo(ROUTES.PRODUCTS);
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
      <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
        No service details available.
      </Typography>
    );
  }

  return (
    <Fragment>
      <Box>
        <AppBar position="fixed">
          <NavBar handleBack={handleBack} heading="View Service" />
        </AppBar>
      </Box>
      <Box sx={{ maxWidth: "800px", margin: "auto", padding: 3, marginTop: 5 }}>
        <Typography variant="h4" gutterBottom>
          Service Details
        </Typography>

        <Card sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">Service Name</Typography>
            <Typography>{service.serviceName || "N/A"}</Typography>

            <Divider sx={{ my: 1 }} />

            <Typography variant="h6">Description</Typography>
            <Typography>
              {service.description || "No description provided."}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Typography variant="h6">Base Price</Typography>
            <Typography>${service.basePrice || "0.00"}</Typography>

            <Divider sx={{ my: 1 }} />

            <Typography variant="h6">Category</Typography>
            <Typography>
              {service.category_name || "No category selected."}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <DisplayMap
              latitude={service.latitude}
              longitude={service.longitude}
            />

            <Divider sx={{ my: 1 }} />

            <DisplayImage imageUrl={service.imageUrl} />

            <Divider sx={{ my: 1 }} />

            <Typography variant="h6">Service Types</Typography>
            {service.ServiceType.length > 0 ? (
              service.ServiceType.map((type: any, index: number) => (
                <Card key={index} sx={{ marginTop: 2, padding: 2 }}>
                  <Typography variant="h6">
                    Type {index + 1}: {type.typeName}
                  </Typography>
                  <Typography>Description: {type.description}</Typography>
                  <Typography>Price: ${type.price}</Typography>
                  <Typography>Capacity: {type.capacity}</Typography>

                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Attributes
                  </Typography>
                  {type.serviceAttributes.length > 0 ? (
                    type.serviceAttributes.map((attr: any, i: number) => (
                      <Typography key={i}>
                        {attr.attributeName}: {attr.attributeValue}
                      </Typography>
                    ))
                  ) : (
                    <Typography>No attributes.</Typography>
                  )}

                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Pricing Rules
                  </Typography>
                  {type.pricingRuleRegistrations.length > 0 ? (
                    type.pricingRuleRegistrations.map(
                      (rule: any, i: number) => (
                        <Typography key={i}>
                          {rule.pricingType} - ${rule.price} (From{" "}
                          {rule.startDate} to {rule.endDate})
                        </Typography>
                      )
                    )
                  ) : (
                    <Typography>No pricing rules.</Typography>
                  )}
                </Card>
              ))
            ) : (
              <Typography>No service types available.</Typography>
            )}
          </CardContent>
        </Card>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{
              backgroundColor: "#191725",
            }}
            variant="contained"
            onClick={() => navigateTo(ROUTES.PRODUCTS)}
          >
            Back to Services
          </Button>
          <Button
            sx={{
              backgroundColor: "#191725",
              ml: 2,
            }}
            variant="contained"
            onClick={() => id && navigateTo(ROUTES.UPDATE_SERVICE, { id })}
          >
            Update Services
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ViewService;
