import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";

const FormDialogSupplier: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [supplier, setSupplier] = useState({
    name: "",
    alamat: "",
    email: "",
    handphone: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSupplier({ ...supplier, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const confirm = window.confirm(
        "success add item, do you want to continue"
      );
      if (confirm) {
        await axios.post("http://localhost:8080/pelanggan/supplier", supplier);
        window.location.replace("/supplier/data-supplier");
      }
    } catch (error) {
      console.error("fail add item", error);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        <IconPlus />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          maxWidth: "none",
          width: "auto",
          "& .MuiDialog-paper": {
            width: "auto",
            maxHeight: "none",
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogContent style={{ width: "550px" }}>
            <DialogContentText>
              <h2>Masukan Supplier</h2>
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Masukan nama supplier"
              type="text"
              fullWidth
              variant="standard"
              value={supplier.name}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="alamat"
              name="alamat"
              label="Masukan alamat"
              type="text"
              fullWidth
              variant="standard"
              value={supplier.alamat}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="Masukan email"
              type="email"
              fullWidth
              variant="standard"
              value={supplier.email}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="handphone"
              name="handphone"
              label="Masukan nomor handphone"
              type="number"
              fullWidth
              variant="standard"
              value={supplier.handphone}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions sx={{ marginBottom: 2 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default FormDialogSupplier;
