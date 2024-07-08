import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/router";

const FormDialogBarang = () => {
  const [open, setOpen] = useState(false);
  const [barang, setBarang] = useState({
    namaBarang: "",
    harga: null,
    stok: null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBarang({
      ...barang,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await axios.post(
      "http://localhost:8080/barang/barang",
      barang
    );
    console.log(response);
    window.alert("barang berhasil ditambahkan");
    window.location.replace("/barang/stok-barang");
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
              id="namaBarang"
              name="namaBarang"
              label="Masukan nama barang"
              type="text"
              fullWidth
              variant="standard"
              value={barang.namaBarang}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="harga"
              name="harga"
              label="Masukan harga"
              type="number"
              fullWidth
              variant="standard"
              value={barang.harga}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="stok"
              name="stok"
              label="Masukan stok"
              type="number"
              fullWidth
              variant="standard"
              value={barang.stok}
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

export default FormDialogBarang;
