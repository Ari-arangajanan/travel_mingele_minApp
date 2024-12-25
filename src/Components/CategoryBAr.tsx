import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./categoryBar.css"; // Import your CSS file

interface Category {
  id: number;
  categoryName: string;
}

interface CategoryProps {
  categories: Category[]; // Array of category strings
  onCategorySelect: (categoryId: number) => void; // Callback to send selected category ID
}

const CategoryBar: React.FC<CategoryProps> = ({
  categories,
  onCategorySelect,
}) => {
  const [value, setValue] = React.useState(0); // Track the selected tab index
  const [activeCategory, setActiveCategory] = React.useState<number>(
    categories[0]?.id || 0
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const selectedCategory = categories[newValue];
    if (selectedCategory) {
      setActiveCategory(selectedCategory.id);
      onCategorySelect(selectedCategory.id);
    }
  };

  return (
    <Box sx={{ maxWidth: "100%", bgcolor: "background.paper", margin: "auto" }}>
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
            label={category.categoryName}
            className={`category-item ${
              activeCategory === category.id ? "active" : ""
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
