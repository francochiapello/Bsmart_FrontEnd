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
import { Link } from "react-router-dom";
import CategoryHook from "../../hooks/Category.hook";
import DataTable from "react-data-table-component";
import CategoryCreate from "./CategoryCreate";
import CategoryUpdate from "./CategoryUpdate";
import CategoryDelete from "./CategoryDelete";

const CategoryList = () => {
  const [message, setMessage] = useState(null);
  const [list, setList] = useState(null);
  const categoryHook = CategoryHook();
  const [mode, setMode] = useState("index");
  const [id, setId] = useState(0);

  useEffect(() => {
    getAll(null);
  }, [mode]);

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
      {mode == "index" && (
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
                onClick={() => {
                  setMode("create");
                }}
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
                        <Link
                          className="link"
                          onClick={() => {
                            setId(row.id);
                            setMode("update");
                          }}
                        >
                          <Edit />
                        </Link>
                        <Link
                          className="link"
                          onClick={() => {
                            setId(row.id);
                            setMode("remove");
                          }}
                        >
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
      )}
      {mode == "create" && <CategoryCreate setMode={setMode} />}
      {mode == "update" && <CategoryUpdate id={id} setMode={setMode} />}
      {mode == "remove" && <CategoryDelete id={id} setMode={setMode} />}
    </>
  );
};

export default CategoryList;
