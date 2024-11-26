import { AppBar, Box, Toolbar } from "@mui/material";
import React, { Fragment } from "react";
import NavBar from "../../Components/NavBar";
import Card from "../../Components/Card";
import CategoryBAr from "../../Components/CategoryBAr";
import { useNavigate } from "react-router-dom";

const cardData = [
  {
    imageUrl: "https://via.placeholder.com/128",
    title: "Premium License",
    description: "High resolution 3840x2160 • PNG",
    price: "$49.00",
    id: "1001234",
  },
  {
    imageUrl: "https://via.placeholder.com/128",
    title: "Standard License",
    description: "Full resolution 1920x1080 • JPEG",
    price: "$19.00",
    id: "1001235",
  },
  {
    imageUrl: "https://via.placeholder.com/128",
    title: "Basic License",
    description: "Low resolution 1280x720 • JPEG",
    price: "$9.00",
    id: "1001236",
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSeeMore = (id: string) => {
    navigate(`/details/${id}`);
    console.log(`see more clicked for ID: ${id}`);
  };

  const handleBack = () => {
    // Logic for back button (e.g., navigate back)
    console.log("handleBack");
  };

  return (
    <>
      <Fragment>
        <AppBar position="fixed">
          <NavBar handleBack={handleBack} />
        </AppBar>
        {/* Spacer to prevent content overlap with AppBar */}
        <Toolbar />
        <Box
          position="fixed"
          sx={{
            position: "sticky",
            top: "40px", // Adjust based on AppBar height (default is 64px for desktop)
            backgroundColor: "#f4f4f4", // Optional background color
            zIndex: 1,
            padding: 2,
          }}
        >
          <CategoryBAr />
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
      </Fragment>
    </>
  );
};

export default Home;
