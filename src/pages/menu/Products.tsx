import React, { Fragment, useEffect, useState } from "react";
import { NavigationUtils } from "../../utils/NavigationUtils";
import { ROUTES } from "../../router/Routs";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  TablePagination,
  Typography,
} from "@mui/material";
import NavBar from "../../Components/NavBar";
import { GetServicesRequest } from "../../Interfaces/ServiceInterface";
import UseNetworkCalls from "../../hooks/networkCalls/UseNetworkCalls";
import { transformToCardData } from "../../utils/CommonMethods";
import Card from "../../Components/Card";
import { GetServicesCardResponse } from "../../Interfaces/CardDetailsInterface";

const Products = () => {
  const teleUser = window.Telegram?.WebApp;

  const [serviceDataData, setServiceDataData] =
    useState<GetServicesCardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filters, setFilters] = useState<{ [key: string]: any }>({});
  const [open, setOpen] = useState(false);
  const { getService } = UseNetworkCalls();
  const { navigateTo } = NavigationUtils();

  const cardData = transformToCardData(serviceDataData?.content || []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const user = teleUser.initDataUnsafe?.user;
      const defaultUser = { id: 0 }; // Define a default user object
      const safeUser = user || defaultUser;
      const params: GetServicesRequest = {
        categoryId: 0,
        telegramId: safeUser.id,
        page,
        limit: rowsPerPage,
      };
      try {
        const response = await getService(params);
        setServiceDataData(response);
        setTotalRecords(response.totalElements);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, rowsPerPage]);

  const handleBack = () => {
    navigateTo(ROUTES.HOME);
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  const handleSeeMore = (id: number) => {
    navigateTo(ROUTES.VIEW_SERVICE, { id });
  };

  const handleAddClick = () => {
    navigateTo(ROUTES.ADD_SERVICE);
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

  return (
    <Fragment>
      <AppBar position="fixed">
        <NavBar handleBack={handleBack} heading="Product" />
      </AppBar>
      <Box
        position="fixed"
        display="flex"
        justifyContent="center"
        sx={{
          top: "50px", // Adjust based on AppBar height (default is 64px for desktop)
          backgroundColor: "#f4f4f4", // Optional background color
          zIndex: 1,
          padding: 1.5,
          width: "100%",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#191725",
          }}
          variant="contained"
          onClick={handleAddClick}
        >
          Add Service
        </Button>
      </Box>

      {/* <Button children="Button" onClick={() => console.log("clocked")} /> */}
      <Box sx={{ marginTop: 10, padding: 2 }}>
        <div className="app-container">
          {cardData.map((card, index) => (
            <div key={index} className="card-box">
              <Card
                key={card.id}
                imageUrl={card.imageUrl}
                title={card.title}
                description={card.description}
                price={card.price}
                id={card.id}
                handleClick={() => handleSeeMore(card.id)}
              />
            </div>
          ))}
        </div>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <TablePagination
          component="div"
          count={totalRecords} // Total records
          page={page} // Current page index
          onPageChange={handlePageChange} // Handle page change
          rowsPerPage={rowsPerPage} // Records per page
          onRowsPerPageChange={handleRowsPerPageChange} // Handle rows per page change
          rowsPerPageOptions={[5, 10, 20]} // Options for records per page
        />
      </Box>
    </Fragment>
  );
};

export default Products;
