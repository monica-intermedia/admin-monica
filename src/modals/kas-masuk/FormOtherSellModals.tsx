import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";

const FormOtherSellModals = () => {
  const [open, setOpen] = useState(false);
  const [penjualanLainya, setPenjualanLainya] = useState({
    kodePenjualan: "",
    jenisPembelian: "",
    namaPenjualan: "",
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
    setPenjualanLainya({
      ...penjualanLainya,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/kasmasuk/penjualanlainya",
        penjualanLainya
      );
      console.log(response.data.data);
      window.alert("Pembelian lainya berhasil ditambahkan!");

      const fetchData = async () => {
        const response = await axios.get(
          "http://localhost:8080/kasmasuk/penjualanlainya"
        );
        setPenjualanLainya(response.data.data);
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
              <h2>Masukan Penjualan Lainya</h2>
            </DialogContentText>
            <TextField
              required
              margin="dense"
              id="akodepenjualan"
              name="kodePenjualan" //ambil target value name untuk di handle change
              label="Kode Penjualan"
              type="text"
              fullWidth
              variant="standard"
              value={penjualanLainya.kodePenjualan}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="namaPenjualan"
              name="namaPenjualan"
              label="Nama Penjualan"
              type="text"
              fullWidth
              variant="standard"
              value={penjualanLainya.namaPenjualan}
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
              value={penjualanLainya.tanggal}
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
              value={penjualanLainya.totalHarga}
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
              value={penjualanLainya.keterangan}
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

export default FormOtherSellModals;
