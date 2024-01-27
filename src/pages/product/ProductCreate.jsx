import { Alert } from "@mui/material";
import { useState } from "react";
import ProductHook from "../../hooks/Product.hook";
import CustomForm from "../../components/CustomForm";
import { Navigate } from "react-router-dom";

const ProductCreate = () => {
  const [message, setMessage] = useState(null);
  const productHook = ProductHook();

  const onSubmit = (data) => {
    productHook
      .create(data)
      .then((value) => {
        console.log(value);
        if (value.status == 200) {
          Navigate("/product");
        }
      })
      .catch((error) => {
        setMessage(`Error en procesar la solicitud, Error:${error.message}`);
      });
  };

  return (
    <>
      {message != null && <Alert severity="error">{message}</Alert>}
      <CustomForm onSubmit={onSubmit} initialData={null} />
    </>
  );
};

export default ProductCreate;
