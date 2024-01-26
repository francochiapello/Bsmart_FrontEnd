import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductHook from "../../hooks/Product.hook";
import CategoryHook from "../../hooks/Category.hook";
import { Controller, useForm } from "react-hook-form";
import MappingService from "../../services/Mapping.service";
import { ArrowBack, Save } from "@mui/icons-material";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, value, ...other } = props;

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
      onFocus={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      value={value}
      valueIsNumericString
      prefix="$"
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const productHook = ProductHook();
  const categoryHook = CategoryHook();
  const {
    handleSubmit,
    setValue,
    register,
    control,
    formState: { errors },
  } = useForm();
  const { TransformList } = MappingService();
  const [message, setMessage] = useState(null);
  const [list, setList] = useState(null);

  const onSubmit = (data) => {
    let price = parseInt(data.price.split("$")[1]);
    let stock = parseInt(data.stock);

    productHook
      .update(params.id, {
        name: data.name,
        description: data.description,
        stock: stock,
        price: price,
        category_id: data.category_id,
      })
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
          setValue("name", value.data.name);
          setValue("description", value.data.description);
          setValue("stock", value.data.stock);
          setValue("price", value.data.price);
          setValue("category_id", value.data.category_id);
          setMessage(null);
        }
      })
      .catch((error) => {
        setMessage(`Error al procesar la solicitud, Error:${error.message}`);
      });
  };

  const select = (fill) => {
    categoryHook
      .select(fill)
      .then((value) => {
        if (value.status == 200) {
          setList(TransformList(value.data.data));
        }
      })
      .catch((error) => {
        setMessage(`Error en procesar la solicitud, Error:${error.message}`);
      });
  };

  useEffect(() => {
    select(null);
    getOne();
  }, []);

  const handleClick = () => {
    navigate("/product");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          sx={{
            justifyContent: "space-between",
            background: "rgb(0 0 0 / 3%)",
          }}
          title={
            <Typography variant="h5" sx={{ textAlign: "left" }}>
              Actualizar Producto
            </Typography>
          }
          action={
            <Button
              className="black"
              onClick={handleClick}
              title="Volver"
              startIcon={<ArrowBack />}
            >
              Volver
            </Button>
          }
        />
        <CardContent>
          {message != null && <Alert severity="error">{message}</Alert>}
          <Box sx={{ width: "40%", marginTop: "1rem" }}>
            <TextField
              {...register("name", {
                required: {
                  value: true,
                  message: "El nombre es requerida",
                },
                maxLength: {
                  value: 120,
                  message: "El nombre no puede ser mayor a 120 carracteres",
                },
                pattern: {
                  value: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/,
                  message: "El nombre solo puede contener letras del alfabeto",
                },
              })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
              label="Nombre"
              variant="outlined"
              error={errors.name && true}
              helperText={errors.name && errors.name.message}
            />
          </Box>
          <Box sx={{ width: "60%", marginTop: "1rem" }}>
            <TextField
              {...register("description", {
                maxLength: {
                  value: 300,
                  message:
                    "La descripción no puede ser mayor a 300 carracteres",
                },
              })}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              label="Descripción"
              variant="outlined"
              multiline
              rows={3}
              error={errors.descripcion && true}
              helperText={errors.descripcion && errors.descripcion.message}
            />
          </Box>
          <Box sx={{ width: "20%", marginTop: "1rem" }}>
            <TextField
              {...register("stock", {
                required: {
                  value: true,
                  message: "El stock es requerido",
                },
                min: {
                  value: 1,
                  message: "El stock no puede ser menor a 1",
                },
              })}
              label="Cantidad disponible"
              variant="outlined"
              type="number"
              InputProps={{
                inputMode: "numeric",
              }}
              InputLabelProps={{
                shrink: true,
              }}
              required
              fullWidth
              placeholder="Ingrese la cantidad disponible"
              error={errors.stock && true}
              helperText={errors.stock && errors.stock.message}
            />
          </Box>
          <Box sx={{ width: "30%", marginTop: "1rem" }}>
            <TextField
              {...register("price", {
                required: {
                  value: true,
                  message: "El precio es requerido",
                },
                min: {
                  value: 1,
                  message: "El precio no puede ser menor a 1",
                },
                max: {
                  value: 9999,
                  message: "El precio no puede ser menor a 9999",
                },
              })}
              fullWidth
              required
              label="Precio"
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Box>
          <Box sx={{ width: "30%", marginTop: "1rem" }}>
            <Controller
              name="category_id"
              control={control}
              rules={{
                required: "required",
              }}
              render={({ field, fieldState: { error } }) => {
                const { onChange, value } = field;
                return (
                  <Autocomplete
                    disablePortal
                    options={list == null ? [] : list}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    value={
                      value
                        ? list?.find((option) => {
                            return value === option.id;
                          }) ?? null
                        : null
                    }
                    onChange={(event, newValue) => {
                      onChange(newValue ? newValue.id : null);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        sx={{ marginTop: 2 }}
                        required
                        variant="outlined"
                        label="Categoria"
                        error={error && true}
                        helperText={error && error.message}
                      />
                    )}
                  />
                );
              }}
            ></Controller>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" startIcon={<Save />}>
            Guardar
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default ProductUpdate;