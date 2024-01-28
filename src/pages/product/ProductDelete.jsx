import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductHook from "../../hooks/Product.hook";
import CustomForm from "../../components/CustomForm";

const ProductDelete = () => {
  const params = useParams();
  const navigate = useNavigate();
  const productHook = ProductHook();
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);

  const getOne = () => {
    productHook
      .getOne(params.id)
      .then((value) => {
        if (value.status == 200) {
          setData(value);
          setMessage(null);
        }
      })
      .catch((error) => {
        setMessage(`Error al procesar la solicitud, Error:${error.message}`);
      });
  };

  useEffect(() => {
    getOne();
  }, []);

  const onSubmit = () => {
    productHook
      .remove(params.id)
      .then((value) => {
        if (value.status == 200) {
          navigate("/product");
        }
      })
      .catch((error) => {
        setMessage(`Error en procesar la solicitud, Error:${error.message}`);
      });
  };

  return (
    <>
      {message != null && <Alert severity="error">{message}</Alert>}
      <CustomForm onSubmit={onSubmit} initialData={data} remove={true} />
    </>
  );
};

export default ProductDelete;
