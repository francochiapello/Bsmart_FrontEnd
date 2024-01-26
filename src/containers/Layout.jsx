import { Adb } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

const Layout = ({ children }) => {
  const handleCloseNavMenu = () => {};

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
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                }}
                href="/category"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Categorias
              </Button>
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                }}
                href="/product"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Productos
              </Button>
            </Box>
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
