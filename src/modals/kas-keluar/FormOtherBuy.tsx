import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { fetchData } from "next-auth/client/_utils";

const FormPembelianLainya = () => {
  const [open, setOpen] = useState(false);
  const [pembelianLainya, setPembelianLainya] = useState({
    nomorFaktur: "",
    jenisPembelian: "",
    qty: "",
    tanggal: "",
    totalHarga: "",
    keterangan: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPembelianLainya({
      ...pembelianLainya,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/kaskeluar/pembelianlainya",
        pembelianLainya
      );
      console.log(response.data);
      window.alert("Pembelian lainya berhasil ditambahkan!");

      const fetchData = async () => {
        const response = await axios.get(
          "http://localhost:8080/kaskeluar/pembelianlainya"
        );
        setPembelianLainya(response.data.data);
      };
      fetchData();

      handleClose();
    } catch (error) {
      console.error("Error adding pembelian lainya:", error);
      window.alert("Gagal menambahkan pembelian lainya");
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
              <h2>Masukan Pembelian Lainya</h2>
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="nomorFaktur"
              name="nomorFaktur"
              label="Nomor Faktur"
              type="text"
              fullWidth
              variant="standard"
              value={pembelianLainya.nomorFaktur}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="jenisPembelian"
              name="jenisPembelian"
              label="Jenis Pembelian"
              type="text"
              fullWidth
              variant="standard"
              value={pembelianLainya.jenisPembelian}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="qty"
              name="qty"
              label="Quantity"
              type="number"
              fullWidth
              variant="standard"
              value={pembelianLainya.qty}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="tanggal"
              name="tanggal"
              type="date"
              fullWidth
              variant="standard"
              value={pembelianLainya.tanggal}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="totalHarga"
              name="totalHarga"
              label="Total Harga"
              type="number"
              fullWidth
              variant="standard"
              value={pembelianLainya.totalHarga}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="keterangan"
              name="keterangan"
              label="Keterangan"
              type="text"
              fullWidth
              variant="standard"
              value={pembelianLainya.keterangan}
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

export default FormPembelianLainya;
