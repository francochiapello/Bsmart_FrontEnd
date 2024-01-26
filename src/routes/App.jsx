import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../pages/shared/Home";
import Error from "../pages/shared/Error";
import Layout from "../containers/Layout";
import CategoryList from "../pages/category/CategoryList";
import CategoryCreate from "../pages/category/CategoryCreate";
import CategoryUpdate from "../pages/category/CategoryUpdate";
import CategoryDelete from "../pages/category/CategoryDelete";
import ProductList from "../pages/product/ProductList";
import ProductCreate from "../pages/product/ProductCreate";
import ProductUpdate from "../pages/product/ProductUpdate";
import ProductDelete from "../pages/product/ProductDelete";

function App() {
  return (
    <>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="*" element={<Error />} />

            <Route exact path="/category" element={<CategoryList />} />
            <Route exact path="/category/create" element={<CategoryCreate />} />
            <Route
              exact
              path="/category/update/:id"
              element={<CategoryUpdate />}
            />
            <Route
              exact
              path="/category/remove/:id"
              element={<CategoryDelete />}
            />

            <Route exact path="/product" element={<ProductList />} />
            <Route exact path="/product/create" element={<ProductCreate />} />
            <Route
              exact
              path="/product/update/:id"
              element={<ProductUpdate />}
            />
            <Route
              exact
              path="/product/remove/:id"
              element={<ProductDelete />}
            />
          </Routes>
        </BrowserRouter>
      </Layout>
    </>
  );
}

export default App;
