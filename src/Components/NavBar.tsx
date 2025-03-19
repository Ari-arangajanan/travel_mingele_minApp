import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTES } from "../router/Routs";
import { NavigationUtils } from "../utils/NavigationUtils";
import { getUserDetail } from "../utils/CommonMethods";
import { routeConfig } from "../router/RouteConfig";

interface Props {
  heading?: string;
  handleBack: () => void;
}

const NavBar: React.FC<Props> = ({ handleBack, heading }) => {
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME;
  const { navigateTo } = NavigationUtils();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  // fetch the User role From token by Common method
  const userRole = getUserDetail()?.userType;

  // filter Accessible pages based on user role
  const accessibleRoutes = routeConfig.filter(
    (route) => route.roles.length === 0 || route.roles.includes(userRole || "")
  );

  // filter pages and settings based on authenticated user role permissions
  const pages = accessibleRoutes.filter((route) => route.category === "page");
  const settings = accessibleRoutes.filter(
    (route) => route.category === "setting"
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (name: string) => {
    setAnchorElUser(null);
  };

  const handleMenuClicks = (name: string) => {
    setAnchorElUser(null); // Close the menu
    if (name === "About") {
      navigateTo(ROUTES.ABOUT, { name });
    } else if (name === "Products") {
      navigateTo(ROUTES.PRODUCTS, { name });
    } else if (name === "Pricing") {
      // navigateTo(ROUTES.PRICING, { name });
    }
  };

  const handleUserMenuClicks = (name: string) => {
    setAnchorElUser(null); // Close the menu
    if (name === "Logout") {
      localStorage.removeItem("token");
      navigateTo(ROUTES.WELCOME, { name });
    } else if (name === "Profile") {
      navigateTo(ROUTES.PROFILE, { name });
      console.log("Profile clicked", name);
    } else if (name === "Account") {
      navigateTo(ROUTES.ACCOUNT, { name });
    } else if (name === "My Hires") {
      navigateTo(ROUTES.MYHIRES, { name });
    } else if (name === "Dashboard") {
      navigateTo(ROUTES.DASHBOARD, { name });
    } else if (name === "My Clients") {
      navigateTo(ROUTES.MYCLIENT, { name });
    }
  };

  return (
    <>
      <AppBar position="static">
        <Container
          maxWidth="xl"
          sx={{
            backgroundColor: "#191725",
          }}
        >
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            {isHomePage ? (
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={isHomePage ? handleCloseNavMenu : handleBack}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {pages.map((route) => (
                    <MenuItem
                      key={route.path}
                      onClick={() => {
                        if (isHomePage) {
                          handleMenuClicks(route.name); // Only close the menu if on the home page
                          // console.log("Menu clicked+++++", page);
                        } else {
                          handleBack(); // Only navigate back if not on the home page
                        }
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {route.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <IconButton onClick={handleBack} sx={{ color: "inherit" }}>
                <ArrowBackIcon />
              </IconButton>
            )}
            {/* logo icon */}
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".05rem",
                color: "#ffffff",
                textDecoration: "none",
                alignItems: "center",
              }}
            >
              {heading != null ? heading : "TRAVEL MINGLE"}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((route) => (
                <Button
                  key={route.path}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {route.name}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((route) => (
                  <MenuItem
                    key={route.path}
                    onClick={() => handleUserMenuClicks(route.name)}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {route.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
