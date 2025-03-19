import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./categoryBar.css"; // Import your CSS file
import { TablePagination } from "@mui/material";
import UseNetworkCalls from "../hooks/networkCalls/UseNetworkCalls";

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
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filters, setFilters] = React.useState<{ [key: string]: any }>({
    userName: "",
  });
  const [loading, setLoading] = React.useState(false);

  const [categoryData, setCategoryData] = React.useState<Category[] | null>(
    categories
  );

  const { getServiceCategory } = UseNetworkCalls();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const selectedCategory = categories[newValue];
    if (selectedCategory) {
      setActiveCategory(selectedCategory.id);
      onCategorySelect(selectedCategory.id);
    }
  };

  React.useEffect(() => {
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
        setCategoryData(response.content);

        setTotalRecords(response.totalElements);
        setLoading(false);
      } catch (error: any) {
        alert("error Occurred");
      }
    };
    fetchCategoryData();
  }, [page, rowsPerPage]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  if (loading) return <div>Loading...</div>;
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
        {categoryData?.map((category, index) => (
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
        <Box>
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
      </Tabs>
    </Box>
  );
};

export default CategoryBar;
