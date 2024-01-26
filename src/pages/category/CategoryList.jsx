import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryHook from "../../hooks/Category.hook";
import DataTable from "react-data-table-component";

const CategoryList = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [list, setList] = useState(null);
  const categoryHook = CategoryHook();

  useEffect(() => {
    getAll(null);
  }, []);

  const getAll = (params) => {
    categoryHook
      .getAll(params)
      .then((value) => {
        if (value.status == 200) {
          setMessage(null);
          setList(value.data.data);
        }
      })
      .catch((error) => {
        setMessage(`Error al procesar la solicitud, Error:${error.message}`);
      });
  };

  const handleClick = () => {
    navigate("/category/create");
  };

  return (
    <Card>
      <CardHeader
        sx={{
          justifyContent: "space-between",
          background: "rgb(0 0 0 / 3%)",
        }}
        title={
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            Listado de Categorias
          </Typography>
        }
        action={
          <Button
            onClick={handleClick}
            title="Agregar nueva Categoria"
            startIcon={<Add />}
            className="black"
          >
            Agregar
          </Button>
        }
      />
      <CardContent>
        {message != null && <Alert severity="error">{message}</Alert>}
        <DataTable
          data={list != null ? list : []}
          columns={[
            {
              name: "Opciones",
              selector: (row) => row.id,
              cell: (row) => {
                return (
                  <>
                    <Link className="link" to={"/category/update/" + row.id}>
                      <Edit />
                    </Link>
                    <Link className="link" to={"/category/remove/" + row.id}>
                      <Delete />
                    </Link>
                  </>
                );
              },
            },
            {
              id: "name",
              name: "Nombre",
              selector: (row) => row.name,
              sortable: true,
            },
            {
              id: "description",
              name: "Descripción",
              selector: (row) => row.description,
              sortable: true,
            },
            {
              id: "updated_at",
              name: "Fecha de Actualizacion",
              selector: (row) => row.updated_at,
              // cell: (row) => {
              //   return TransformDate(row.fechaActualizacion);
              // },
              sortable: true,
            },
          ]}
          pagination
          sortable
        />
      </CardContent>
    </Card>
  );
};

export default CategoryList;
