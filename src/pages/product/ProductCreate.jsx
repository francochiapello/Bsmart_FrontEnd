import { Alert } from "@mui/material";
import { useState } from "react";
import ProductHook from "../../hooks/Product.hook";
import CustomForm from "../../components/CustomForm";
import { useNavigate } from "react-router-dom";

const ProductCreate = () => {
  const [message, setMessage] = useState(null);
  const productHook = ProductHook();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    productHook
      .create(data)
      .then((value) => {
        console.log(value);
        if (value.status == 200) {
          navigate("/product");
        }
      })
      .catch((error) => {
        if (error?.response?.status == 401) {
          setMessage(
            `Error al procesar la solicitud, usuario no esta authorizado`
          );
        } else {
          setMessage(`Error al procesar la solicitud`);
        }
      });
  };

  return (
    <>
      {message != null && <Alert severity="error">{message}</Alert>}
      <CustomForm onSubmit={onSubmit} initialData={null} remove={false} />
    </>
  );
};

export default ProductCreate;
