import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { MenuItem, Box } from "@mui/material";

const FormTransaksiModals: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [transaksi, setTransaksi] = useState({
    namaKoran: "",
    keterangan: "",
    eksemplar: "",
    jumlahHalaman: "",
    jumlahWarna: "",
    jumlahPlate: "",
    harga: "",
    totalHarga: "",
    tanggal: "",
    status: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let newTransaksi = {
      ...transaksi,
      [name]: value,
    };

    const jumlahHalaman = parseInt(newTransaksi.jumlahHalaman);
    const jumlahWarna = parseInt(newTransaksi.jumlahWarna);
    const eksemplar = parseInt(newTransaksi.eksemplar);

    let newHarga = "";
    let newJumlahPlate = "";

    if (jumlahHalaman === 12 && jumlahWarna === 2) {
      newHarga = "3500";
    } else if (jumlahHalaman === 12 && jumlahWarna === 4) {
      newHarga = "4500";
    } else if (jumlahHalaman === 12 && jumlahWarna === 6) {
      newHarga = "5200";
    } else if (jumlahHalaman === 12 && jumlahWarna === 8) {
      newHarga = "6300";
    } else if (jumlahHalaman === 8 && jumlahWarna === 2) {
      newHarga = "2200";
    } else if (jumlahHalaman === 8 && jumlahWarna === 4) {
      newHarga = "3300";
    } else if (jumlahHalaman === 16 && jumlahWarna === 2) {
      newHarga = "4500";
    } else if (jumlahHalaman === 16 && jumlahWarna === 4) {
      newHarga = "5500";
    } else if (jumlahHalaman === 16 && jumlahWarna === 6) {
      newHarga = "6500";
    } else {
      // alert("jumlah halaman dan jumlah warna tersebut belum ada");
    }

    if (jumlahHalaman === 8 && jumlahWarna === 2) {
      newJumlahPlate = "7";
    } else if (jumlahHalaman === 8 && jumlahWarna === 4) {
      newJumlahPlate = "10";
    } else if (jumlahHalaman === 12 && jumlahWarna === 2) {
      newJumlahPlate = "9";
    } else if (jumlahHalaman === 12 && jumlahWarna === 4) {
      newJumlahPlate = "12";
    } else if (jumlahHalaman === 16 && jumlahWarna === 2) {
      newJumlahPlate = "12";
    } else if (jumlahHalaman === 16 && jumlahWarna === 4) {
      newJumlahPlate = "15";
    } else {
      // alert("jumlah warna tidak boleh melebihi angka tersebut");
    }

    newTransaksi = {
      ...newTransaksi,
      jumlahPlate: newJumlahPlate,
      harga: newHarga,
    };

    // Calculate total price
    const totalHarga =
      eksemplar && newHarga ? eksemplar * parseInt(newHarga) : "";

    newTransaksi = {
      ...newTransaksi,
      totalHarga: totalHarga ? totalHarga.toString() : "",
    };

    setTransaksi(newTransaksi);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/penjualan/transaksi",
        transaksi
      );
      console.log(response.data.data);
      window.alert("Transaksi berhasil ditambahkan");

      handleClose();
    } catch (error) {
      console.error("Error adding transaksi:", error);
      window.alert("Gagal menambahkan transaksi");
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
              <h2>Masukkan Transaksi</h2>
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="namaKoran"
              name="namaKoran"
              label="Masukkan nama koran"
              type="text"
              fullWidth
              variant="standard"
              value={transaksi.namaKoran}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="keterangan"
              name="keterangan"
              label="Masukkan keterangan"
              type="text"
              fullWidth
              variant="standard"
              value={transaksi.keterangan}
              onChange={handleChange}
            />
            <Box display={"flex"} justifyContent={"space-between"}>
              <TextField
                sx={{ width: "48%" }}
                required
                margin="dense"
                id="eksemplar"
                name="eksemplar"
                label="Masukkan eksemplar"
                type="number"
                fullWidth
                variant="standard"
                value={transaksi.eksemplar}
                onChange={handleChange}
              />
              <TextField
                sx={{ width: "48%" }}
                required
                margin="dense"
                id="jumlahHalaman"
                name="jumlahHalaman"
                label="Masukkan jumlah halaman"
                type="number"
                fullWidth
                variant="standard"
                value={transaksi.jumlahHalaman}
                onChange={handleChange}
                select
              >
                <MenuItem value="8">8 Halaman</MenuItem>
                <MenuItem value="12">12 Halaman</MenuItem>
                <MenuItem value="16">16 Halaman</MenuItem>
                <MenuItem value="24">24 Halaman</MenuItem>
                <MenuItem value="32">32 Halaman</MenuItem>
              </TextField>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <TextField
                sx={{ width: "48%" }}
                required
                margin="dense"
                id="jumlahWarna"
                name="jumlahWarna"
                label="Masukkan jumlah halaman warna"
                type="number"
                fullWidth
                variant="standard"
                value={transaksi.jumlahWarna}
                onChange={handleChange}
                select
              >
                <MenuItem value="2">2 Warna</MenuItem>
                <MenuItem value="4">4 Warna</MenuItem>
                <MenuItem value="6">6 Warna</MenuItem>
                <MenuItem value="8">8 Warna</MenuItem>
                <MenuItem value="10">10 Warna</MenuItem>
              </TextField>
              <TextField
                sx={{ width: "45%" }}
                required
                margin="dense"
                id="jumlahPlate"
                name="jumlahPlate"
                label="Jumlah Plate"
                type="number"
                fullWidth
                disabled
                variant="standard"
                value={transaksi.jumlahPlate}
                onChange={handleChange}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
            <TextField
              required
              margin="dense"
              id="harga"
              name="harga"
              label="Harga"
              type="number"
              fullWidth
              variant="standard"
              value={transaksi.harga}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              required
              margin="dense"
              id="totalHarga"
              name="totalHarga"
              label="Total Harga"
              type="number"
              fullWidth
              disabled
              variant="standard"
              value={transaksi.totalHarga}
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
              value={transaksi.tanggal}
              onChange={handleChange}
            />
            <TextField
              select
              required
              margin="dense"
              id="status"
              name="status"
              label="Pilih status"
              fullWidth
              variant="standard"
              value={transaksi.status}
              onChange={handleChange}
            >
              <MenuItem value="belum-dicetak">Belum Dicetak</MenuItem>
              <MenuItem value="sudah-dicetak">Sudah Dicetak</MenuItem>
            </TextField>
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

export default FormTransaksiModals;
