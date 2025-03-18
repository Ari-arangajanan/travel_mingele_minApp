import React, { useEffect, useState } from "react";
import {
  AddServiceInterface,
  ServiceCategoryDropDownResponse,
} from "../../Interfaces/AddServiceInterface";
import {
  AppBar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import ServiceTypeForm from "./ServiceTypeForm";
import { Fragment } from "@emotion/react/jsx-runtime";
import NavBar from "../../Components/NavBar";
import { NavigationUtils } from "../../utils/NavigationUtils";
import { ROUTES } from "../../router/Routs";
import UseNetworkCalls from "../../hooks/networkCalls/UseNetworkCalls";
import GoogleMapWithSearch from "../../Components/GoogleMapWithSearch";
import ImageUpload from "../../Components/ImageUpload";

const AddServiceForm: React.FC = () => {
  const [service, setService] = useState<AddServiceInterface>({
    serviceName: "",
    description: "",
    basePrice: 10.0,
    latitude: 37.7749,
    longitude: -122.4194,
    categoryId: 1,
    serviceProviderId: 1,
    imageUrl: "" as string,
    serviceTypeRegistrations: [],
  });

  const { navigateTo } = NavigationUtils();
  const { dropDownCategory, registerServices } = UseNetworkCalls();
  const [categoryDropDown, setCategoryDropDown] =
    useState<ServiceCategoryDropDownResponse>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleDropDownChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name as string]: value }));
  };

  const addServiceType = () => {
    setService({
      ...service,
      serviceTypeRegistrations: [
        ...service.serviceTypeRegistrations,
        {
          typeName: "",
          description: "",
          price: 0,
          capacity: 1,
          serviceAttributeRegistrations: [],
          pricingRuleRegistrations: [],
        },
      ],
    });
  };

  const updateServiceType = (index: number, updatedType: any) => {
    const updatedServiceTypes = [...service.serviceTypeRegistrations];
    updatedServiceTypes[index] = updatedType;
    setService({ ...service, serviceTypeRegistrations: updatedServiceTypes });
  };

  const handleSubmit = async () => {
    console.log("Service Data:", service);
    try {
      const response = await serviceRegistration();
      console.log("Response:", response);
      navigateTo(ROUTES.PRODUCTS);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const serviceRegistration = async () => {
    try {
      console.log("Service Data:", service);
      const response = await registerServices(service);
      return response; // Return the response if needed
    } catch (error) {
      console.error("Error in service registration:", error);
      throw error; // Re-throw the error for proper error handling
    }
  };

  const handleBack = () => {
    navigateTo(ROUTES.PRODUCTS);
    // Logic for back button (e.g., navigate back)
    console.log("handleBack");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dropDownCategory();
        setCategoryDropDown(response);
      } catch (err: any) {
        console.log("error", err.message);
      }
    };
    fetchData();
  }, []);

  // Google Map Click Event Handler to get Latitude and Longitude of the clicked location on the map
  const handleLocationChange = (lat: number, lng: number) => {
    setService({
      ...service,
      latitude: lat,
      longitude: lng,
    });

    console.log("Latitude:", lat, "Longitude:", lng);
  };

  return (
    <Fragment>
      <Box sx={{ height: "60px" }}>
        <AppBar position="fixed">
          <NavBar heading="Add Service" handleBack={handleBack} />
        </AppBar>
      </Box>
      <Box
        // display="flow-root"
        sx={{ margin: "auto", padding: 3, top: "60px", width: "100%" }}
        gap={2}
      >
        <Box sx={{ mt: 1 }}>
          <Box>
            <TextField
              // onChange={handleSelectChange}
              label="Service Name"
              name="serviceName"
              value={service.serviceName}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={service.description}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </Box>
          <Box sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                fullWidth
                label="Category"
                name="categoryId"
                value={service.categoryId}
                onChange={handleDropDownChange}
              >
                {categoryDropDown &&
                  Array.isArray(categoryDropDown) &&
                  categoryDropDown.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ mt: 1 }}>
            <TextField
              fullWidth
              type="number"
              label="Base Price"
              name="basePrice"
              value={service.basePrice}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography>Upload Service Image</Typography>
            <ImageUpload
              onUploadSuccess={(imageUrl) => {
                setService((prev) => ({ ...prev, imageUrl }));
              }}
            />
            {/* {service.imageUrl && (
              <Box sx={{ mt: 1 }}>
                <img
                  src={service.imageUrl}
                  alt="Uploaded"
                  width="150px"
                  height="150px"
                />
              </Box>
            )} */}
          </Box>
          <Box sx={{ mt: 1 }}>
            <Box sx={{ mt: 1 }}>
              <TextField
                fullWidth
                type="number"
                label="Latitude"
                name="latitude"
                value={service.latitude}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <TextField
                fullWidth
                type="number"
                label="Longitude"
                name="longitude"
                value={service.longitude}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <GoogleMapWithSearch onLocationChange={handleLocationChange} />
            </Box>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Service Types
        </Typography>
        {service.serviceTypeRegistrations.map((type, index) => (
          <ServiceTypeForm
            key={index}
            index={index}
            serviceType={type}
            updateServiceType={updateServiceType}
            removeServiceForm={() => {
              const updatedServiceTypes = [...service.serviceTypeRegistrations];
              updatedServiceTypes.splice(index, 1);
              setService({
                ...service,
                serviceTypeRegistrations: updatedServiceTypes,
              });
            }}
          />
        ))}

        <Button variant="contained" sx={{ mt: 2 }} onClick={addServiceType}>
          Add Service Type
        </Button>
        {service.serviceTypeRegistrations.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, ml: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )}
      </Box>
    </Fragment>
  );
};

export default AddServiceForm;
