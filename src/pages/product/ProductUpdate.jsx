import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductHook from "../../hooks/Product.hook";
import CustomForm from "../../components/CustomForm";

const ProductUpdate = () => {
  const params = useParams();
  const productHook = ProductHook();
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    productHook
      .update(params.id, data)
      .then((value) => {
        if (value.status == 200) {
          navigate("/product");
        }
      })
      .catch((error) => {
        setMessage(`Error en procesar la solicitud, Error:${error.message}`);
      });
  };

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
        if (error?.response?.status == 401) {
          setMessage(
            `Error al procesar la solicitud, usuario no esta authorizado`
          );
        } else {
          setMessage(`Error al procesar la solicitud`);
        }
      });
  };

  useEffect(() => {
    getOne();
  }, []);

  return (
    <>
      {message != null && <Alert severity="error">{message}</Alert>}
      <CustomForm onSubmit={onSubmit} initialData={data} remove={false} />
    </>
  );
};

export default ProductUpdate;
