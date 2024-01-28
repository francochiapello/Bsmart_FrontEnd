import { Adb } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Cookie from "../services/Cookie.service";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { remove, getCookie } = Cookie();
  const navigate = useNavigate();

  const handleCloseNavMenu = () => {};
  const handleExist = () => {
    remove();
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
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
              Bsmart
            </Typography>

            <Adb sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {getCookie() != null && (
                <Button
                  onClick={() => {
                    handleCloseNavMenu();
                  }}
                  href="/product"
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Productos
                </Button>
              )}
            </Box>
            {getCookie() != null && (
              <Box sx={{ flexGrow: 0 }}>
                <MenuItem onClick={handleExist}>
                  <Typography textAlign="center">Salir</Typography>
                </MenuItem>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ maxWidth: "90%", marginLeft: "5%", marginTop: "1rem" }}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
