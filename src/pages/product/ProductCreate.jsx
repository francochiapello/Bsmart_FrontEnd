import { Alert } from "@mui/material";
import React, { useState } from "react";
import ProductHook from "../../hooks/Product.hook";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import CustomForm from "../../components/CustomForm";
import { Navigate } from "react-router-dom";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      valueIsNumericString
      prefix="$"
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ProductCreate = () => {
  const [message, setMessage] = useState(null);
  const productHook = ProductHook();

  const onSubmit = (data) => {
    console.log(data);
    let price = parseInt(data.price.split("$")[1]);
    let stock = parseInt(data.stock);

    productHook
      .create({
        name: data.name,
        description: data.description,
        stock: stock,
        price: price,
        category_id: data.category_id,
      })
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
