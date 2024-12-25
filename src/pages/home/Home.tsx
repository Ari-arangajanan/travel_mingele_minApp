import { AppBar, Box, TablePagination, Toolbar } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Card from "../../Components/Card";
import CategoryBAr from "../../Components/CategoryBAr";
import { useNavigate } from "react-router-dom";
import { GetCategoryRes } from "../../Components/Interfaces/CategoryInterface";
import UseNetworkCalls from "../../hooks/networkCalls/UseNetworkCalls";
import {
  GetServicesRequest,
  GetServicesResponse,
} from "../../Components/Interfaces/ServiceInterface";

// const cardData = [
//   {
//     imageUrl: "https://via.placeholder.com/128",
//     title: "Premium License",
//     description: "High resolution 3840x2160 • PNG",
//     price: "$49.00",
//     id: "1001234",
//   },
//   {
//     imageUrl: "https://via.placeholder.com/128",
//     title: "Standard License",
//     description: "Full resolution 1920x1080 • JPEG",
//     price: "$19.00",
//     id: "1001235",
//   },
//   {
//     imageUrl: "https://via.placeholder.com/128",
//     title: "Basic License",
//     description: "Low resolution 1280x720 • JPEG",
//     price: "$9.00",
//     id: "1001236",
//   },
// ];

const Home: React.FC = () => {
  const [categoryData, setCategoryData] = useState<GetCategoryRes | null>(null);
  const [serviceDataData, setServiceDataData] =
    useState<GetServicesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();
  const [filters, setFilters] = useState<{ [key: string]: any }>({
    userName: "",
  });
  const [open, setOpen] = useState(false);
  const { getServiceCategory, getServiceByCategoryId } = UseNetworkCalls();

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      // Convert filters to ensure numeric values for telegramId and id
      const params = {
        ...filters,
        page,
        limit: rowsPerPage,
      };
      try {
        const response = await getServiceCategory(params);
        console.log("responce", response);

        setCategoryData(response);
        console.log(categoryData);

        setTotalRecords(response.totalElements);
      } catch (error: any) {
        alert("error Occurred");
        navigate("/");
        setError(error.message);
      }
    };
    fetchCategoryData();
  }, []);

  const handleSeeMore = (id: string) => {
    navigate(`/details/${id}`);
    console.log(`see more clicked for ID: ${id}`);
  };

  const handleBack = () => {
    // Logic for back button (e.g., navigate back)
    console.log("handleBack");
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

  const handleCategoryClick = async (categoryId: number) => {
    console.log(`Selected category: ${categoryId}`);
    setLoading(true);
    try {
      const params: GetServicesRequest = {
        categoryId,
        page,
        limit: rowsPerPage,
      };
      try {
        const response = await getServiceByCategoryId(params);
        console.log("responce", response);

        setServiceDataData(response);
        console.log(serviceDataData);

        setTotalRecords(response.totalElements);
      } catch (error: any) {
        alert("error Occurred");
        navigate("/");
        setError(error.message);
      }
    } catch (err: any) {}
  };

  // transform data tpo convert to card data
  const transformToCardData = (services: GetServicesResponse["content"]) => {
    return services.map((service) => ({
      imageUrl: "https://via.placeholder.com/128", // Placeholder for now; replace with actual image URL if available
      title: service.serviceName, // Map service name to title
      description: `${service.description} • Price: $${service.basePrice}`, // Combine description and price
      price: `$${service.basePrice.toFixed(2)}`, // Format price with two decimals
      id: service.id.toString(), // Convert numeric ID to string
    }));
  };

  const cardData = transformToCardData(serviceDataData?.content || []);

  return (
    <>
      <Fragment>
        <AppBar position="fixed">
          <NavBar handleBack={handleBack} />
        </AppBar>
        <Box
          position="fixed"
          sx={{
            position: "fixed",
            top: "60px", // Adjust based on AppBar height (default is 64px for desktop)
            backgroundColor: "#f4f4f4", // Optional background color
            zIndex: 1,
            // padding: 2,
            width: "100%",
          }}
        >
          <CategoryBAr
            categories={categoryData?.content || []}
            onCategorySelect={handleCategoryClick}
          />
        </Box>

        {/* <Button children="Button" onClick={() => console.log("clocked")} /> */}
        <Box sx={{ marginTop: 1, padding: 2 }}>
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
            count={cardData.length} // Total records
            page={page} // Current page index
            onPageChange={handlePageChange} // Handle page change
            rowsPerPage={rowsPerPage} // Records per page
            onRowsPerPageChange={handleRowsPerPageChange} // Handle rows per page change
            rowsPerPageOptions={[5, 10, 20]} // Options for records per page
          />
        </Box>
      </Fragment>
    </>
  );
};

export default Home;
