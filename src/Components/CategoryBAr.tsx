import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./categoryBar.css"; // Import your CSS file

const categories = [
  "Hotels",
  "Vehicle",
  "Guide",
  "Guest House",
  "Resorts",
  "Cottages",
  "Apartments",
  "Hostels",
  "Camping",
];

const CategoryBar = () => {
  const [value, setValue] = React.useState(0); // Track the selected tab index
  const [activeCategory, setActiveCategory] = React.useState<string>("Hotels");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setActiveCategory(categories[newValue]);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    console.log(`Selected category: ${category}`);
  };

  return (
    <Box sx={{ maxWidth: { xs: 346, sm: 600 }, bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        className="category-bar" // Apply category-bar class to Tabs container
      >
        {categories.map((category, index) => (
          <Tab
            key={index}
            label={category}
            onClick={() => handleCategoryClick(category)}
            className={`category-item ${
              activeCategory === category ? "active" : ""
            }`} // Dynamically apply 'active' class
            sx={{
              "&.Mui-selected": {
                color: "#fff", // Change active text color
                backgroundColor: "#333131", // Optional: match background for active
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#444444", // Optional: hover effect for active tab
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CategoryBar;
