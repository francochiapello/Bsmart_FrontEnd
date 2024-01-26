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
import ProductHook from "../../hooks/Product.hook";
import { Add, Delete, Edit } from "@mui/icons-material";
import DataTable from "react-data-table-component";

const ProductList = () => {
  const navigate = useNavigate();
  const productHook = ProductHook();
  const [list, setList] = useState(null);
  const [message, setMessage] = useState(null);

  const getAll = (params) => {
    productHook
      .getAll(params)
      .then((value) => {
        if (value.status == 200) {
          console.log(value);
          setList(value.data.data);
          setMessage(null);
        }
      })
      .catch((error) => {
        setMessage(`Error al procesar la solicitud, Error:${error.message}`);
      });
  };
  useEffect(() => {
    getAll(null);
  }, []);
  const handleClick = () => {
    navigate("/product/create");
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
            Listado de Productos
          </Typography>
        }
        action={
          <Button
            onClick={handleClick}
            title="Agregar nuevo Producto"
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
                    <Link className="link" to={"/product/update/" + row.id}>
                      <Edit />
                    </Link>
                    <Link className="link" to={"/product/remove/" + row.id}>
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
              id: "stock",
              name: "Cantidad",
              selector: (row) => row.stock,
              sortable: true,
            },
            {
              id: "price",
              name: "Precio",
              selector: (row) => row.price,
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

export default ProductList;
