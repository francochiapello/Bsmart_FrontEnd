import { ArrowBack, Delete, Save } from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CategoryHook from "../hooks/Category.hook";
import MappingService from "../services/Mapping.service";
import { useNavigate } from "react-router-dom";

const CustomForm = ({ onSubmit, initialData, remove }) => {
  const {
    handleSubmit,
    register,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm();
  const formRef = useRef();
  const { TransformList } = MappingService();
  const [list, setList] = useState(null);
  const [message, setMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const categoryHook = CategoryHook();
  const navigate = useNavigate();

  const setFormData = () => {
    if (initialData != null) {
      setValue("name", initialData?.data?.name);
      setValue("description", initialData.data.description);
      setValue("stock", initialData.data.stock);
      setValue("price", initialData.data.price);
      setValue("category_id", initialData.data.category_id);
      setMessage(null);
    }
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
    setFormData();
  }, [initialData]);

  const handleClick = () => {
    navigate("/product");
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {remove
            ? "¿Estas seguro que quieres eliminar este producto?"
            : "¿Estas seguro que quieres guardar este producto?"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              trigger().then((value) => {
                if (value) {
                  handleSubmit(onSubmit)();
                }
              });
            }}
            color="primary"
          >
            Si
          </Button>
        </DialogActions>
      </Dialog>
      <Card>
        <CardHeader
          sx={{
            justifyContent: "space-between",
            background: "rgb(0 0 0 / 3%)",
          }}
          title={
            <Typography variant="h5" sx={{ textAlign: "left" }}>
              {initialData != null
                ? remove
                  ? "Eliminar producto"
                  : "Actualizar Producto"
                : "Agregar un Producto"}
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
              InputProps={{
                readOnly: remove,
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
              InputProps={{
                readOnly: remove,
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
                readOnly: remove,
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
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
                inputMode: "numeric",
                readOnly: remove,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              error={errors.price && true}
              helperText={errors.price && errors.price.message}
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
                    readOnly={remove}
                    disablePortal
                    options={list == null ? [] : list}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    value={
                      value
                        ? list.find((option) => {
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
          <Button
            onClick={() => setOpen(true)}
            startIcon={remove ? <Delete /> : <Save />}
          >
            {remove ? "Eliminar" : "Guardar"}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default CustomForm;
