import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import { addItem } from "../../action/actions";

interface FormDialogSupplierProps {
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const FormDialogSupplier: React.FC<FormDialogSupplierProps> = ({
  setItems,
}) => {
  const [open, setOpen] = useState(false);
  const [supplier, setSupplier] = useState({
    name: "",
    alamat: "",
    email: "",
    handphone: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    alamat: false,
    email: false,
    handphone: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value,
    });
    if (value) {
      setErrors({
        ...errors,
        [name]: false,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      name: !supplier.name,
      alamat: !supplier.alamat,
      email: !supplier.email,
      handphone: !supplier.handphone,
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    const success = await addItem(
      "http://localhost:8080/pelanggan/supplier",
      setItems
    );

    if (success) {
      setSupplier({
        name: "",
        alamat: "",
        email: "",
        handphone: "",
      });
      handleClose();
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
              <h2>Masukan Pegawai</h2>
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
              error={errors.name}
              helperText={errors.name && "Nama diperlukan"}
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
              error={errors.alamat}
              helperText={errors.alamat && "Alamat diperlukan"}
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
              error={errors.email}
              helperText={errors.email && "Email diperlukan"}
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
              error={errors.handphone}
              helperText={errors.handphone && "Nomor handphone diperlukan"}
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
