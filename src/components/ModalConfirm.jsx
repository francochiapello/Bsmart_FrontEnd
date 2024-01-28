import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ModalConfirm = ({ onSubmit, title, open, setOpen }) => {
  const { handleSubmit, trigger } = useForm();
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
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
  );
};

export default ModalConfirm;
