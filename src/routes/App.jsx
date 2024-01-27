import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../pages/shared/Home";
import Error from "../pages/shared/Error";
import Layout from "../containers/Layout";
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
            <Route exact path="/" element={<ProductList />} />
            <Route path="*" element={<Error />} />

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
