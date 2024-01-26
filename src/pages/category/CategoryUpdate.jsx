import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CategoryHook from "../../hooks/Category.hook";
import { ArrowBack, Save } from "@mui/icons-material";

const CategoryUpdate = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm();
  const categoryHook = CategoryHook();
  const params = useParams();

  const getOne = () => {
    categoryHook
      .getOne(params.id)
      .then((value) => {
        if (value.status == 200) {
          setMessage(null);
          setValue("name", value.data.name);
          setValue("description", value.data.description);
        }
      })
      .catch((error) => {
        setMessage(`Error en procesar la solicitud, Error:${error.message}`);
      });
  };

  useEffect(() => {
    getOne();
  }, []);

  const onSubmit = (data) => {
    categoryHook
      .update(params.id, data)
      .then((value) => {
        if (value.status == 200) {
          navigate("/category");
        }
      })
      .catch((error) => {
        setMessage(`Error en procesar la solicitud, Error:${error.message}`);
      });
  };
  const handleClick = () => {
    navigate("/category");
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
              Actualizar Categoria
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
              fullWidth
              required
              label="Nombre"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
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
              fullWidth
              label="Descripción"
              variant="outlined"
              multiline
              rows={3}
              InputLabelProps={{
                shrink: true,
              }}
              error={errors.descripcion && true}
              helperText={errors.descripcion && errors.descripcion.message}
            />
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

export default CategoryUpdate;
