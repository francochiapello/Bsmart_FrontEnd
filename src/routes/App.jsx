import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Home from "../pages/shared/Home";
import Error from "../pages/shared/Error";
import Layout from "../containers/Layout";
import ProductList from "../pages/product/ProductList";
import ProductCreate from "../pages/product/ProductCreate";
import ProductUpdate from "../pages/product/ProductUpdate";
import ProductDelete from "../pages/product/ProductDelete";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import ProtectLink from "../components/ProtectLink";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          <Route
            exact
            path="/"
            element={
              <ProtectLink>
                <Layout>
                  <ProductList />
                </Layout>
              </ProtectLink>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <Error />
              </Layout>
            }
          />

          <Route
            exact
            path="/product"
            element={
              <ProtectLink>
                <Layout>
                  <ProductList />
                </Layout>
              </ProtectLink>
            }
          />
          <Route
            exact
            path="/product/create"
            element={
              <ProtectLink>
                <Layout>
                  <ProductCreate />
                </Layout>
              </ProtectLink>
            }
          />
          <Route
            exact
            path="/product/update/:id"
            element={
              <ProtectLink>
                <Layout>
                  <ProductUpdate />
                </Layout>
              </ProtectLink>
            }
          />
          <Route
            exact
            path="/product/remove/:id"
            element={
              <ProtectLink>
                <Layout>
                  <ProductDelete />
                </Layout>
              </ProtectLink>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
