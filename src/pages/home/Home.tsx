import { AppBar, Box, TablePagination, Toolbar } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Card from "../../Components/Card";
import CategoryBAr from "../../Components/CategoryBAr";
import { useNavigate } from "react-router-dom";
import { GetCategoryRes } from "../../Interfaces/CategoryInterface";
import UseNetworkCalls from "../../hooks/networkCalls/UseNetworkCalls";
import {
  GetServicesRequest,
  GetServicesResponse,
} from "../../Interfaces/ServiceInterface";
import { transformToCardData } from "../../utils/CommonMethods";
import {
  GetServicesCardRequest,
  GetServicesCardResponse,
} from "../../Interfaces/CardDetailsInterface";
import { NavigationUtils } from "../../utils/NavigationUtils";
import { ROUTES } from "../../router/Routs";

const Home: React.FC = () => {
  const [categoryData, setCategoryData] = useState<GetCategoryRes | null>(null);
  const [serviceDataData, setServiceDataData] =
    useState<GetServicesCardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();
  const [filters, setFilters] = useState<{ [key: string]: any }>({
    userName: "",
  });
  const { navigateTo } = NavigationUtils();
  const [open, setOpen] = useState(false);
  const { getServiceCategory, getService } = UseNetworkCalls();

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

  const handleSeeMore = (id: number) => {
    // Find the relevant card data
    const cardData = serviceDataData?.content.find((x) => x.id === id);
    navigateTo(ROUTES.DETAILS, { id }, { cardData });
    // navigate(`/details/${id}`, {
    //   state: { cardData: serviceDataData?.content.find((x) => x.id === id) },
    // });
    console.log(`see more clicked for ID: ${id}`);
    console.log(
      "serviceDataData",
      serviceDataData?.content.filter((x) => x.id === id)
    );
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
      const params: GetServicesCardRequest = {
        categoryId,
        telegramId: 0,
        page,
        limit: rowsPerPage,
      };
      try {
        const response = await getService(params);
        console.log("responce", response);

        setServiceDataData(response);
        console.log(serviceDataData);

        setTotalRecords(response.totalElements);
        setLoading(false);
      } catch (error: any) {
        alert("error Occurred");
        navigate("/");
        setError(error.message);
      }
    } catch (err: any) {}
  };

  const cardData = transformToCardData(serviceDataData?.content || []);

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Fragment>
        <Box sx={{ height: "60px" }}>
          <AppBar position="fixed">
            <NavBar heading="Services" handleBack={handleBack} />
          </AppBar>
        </Box>
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
            count={totalRecords} // Total records
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
