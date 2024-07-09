import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { MenuItem } from "@mui/material";

const FormTransaksiModals: React.FC = () => {
  interface KoranProps {
    id: string;
    keterangan: string;
    harga: number;
    id_barang: string;
    plate: number;
  }

  const [open, setOpen] = useState(false);
  const [koran, setKoran] = useState<KoranProps[]>([]);
  const [transaksi, setTransaksi] = useState({
    namaKoran: "",
    keterangan: "",
    eksemplar: "",
    gross_amount: "",
    tanggal: "",
    harga: "",
    statusCetak: "",
    phone: "",
    email: "",
    id_koran: "",
    id_barang: "",
    quantity: "",
    isValid: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080/koran");
    setKoran(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransaksi((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "keterangan") {
      const selectedKoran = koran.find((k) => k.id === value);
      if (selectedKoran) {
        setTransaksi((prevState: any) => ({
          ...prevState,
          id_koran: selectedKoran.id,
          gross_amount: selectedKoran.harga * Number(prevState.eksemplar || 1),
          quantity: selectedKoran.plate,
          harga: selectedKoran.harga,
          id_barang: selectedKoran.id_barang,
        }));
      }
    }

    if (name === "eksemplar") {
      setTransaksi((prevState: any) => {
        const selectedKoran = koran.find((k) => k.id === prevState.keterangan);
        const newGrossAmount = selectedKoran
          ? selectedKoran.harga * Number(value)
          : prevState.gross_amount;
        return {
          ...prevState,
          gross_amount: newGrossAmount,
        };
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/penjualan/transaksiadmin",
        transaksi
      );
      console.log(response.data);
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
              select
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
            >
              {koran.map((data) => (
                <MenuItem key={data.id} value={data.id}>
                  {data.keterangan}
                </MenuItem>
              ))}
            </TextField>
            <TextField
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
            {false && (
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
            )}
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="email"
              type="email"
              fullWidth
              variant="standard"
              value={transaksi.email}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="phone"
              name="phone"
              label="nomor handphone"
              type="tel"
              fullWidth
              variant="standard"
              value={transaksi.phone}
              onChange={handleChange}
            />
            <TextField
              disabled
              required
              margin="dense"
              id="gross_amount"
              name="gross_amount"
              label="jumlah harga"
              type="number"
              fullWidth
              variant="standard"
              value={transaksi.gross_amount}
            />
            {false && (
              <TextField
                disabled
                required
                margin="dense"
                id="quantity"
                name="quantity"
                label="jumlah plate"
                type="number"
                fullWidth
                variant="standard"
                value={transaksi.quantity}
                hidden
              />
            )}

            {false && (
              <TextField
                disabled
                required
                margin="dense"
                id="quantity"
                name="quantity"
                label="jumlah plate"
                type="number"
                fullWidth
                variant="standard"
                value={transaksi.quantity}
              />
            )}
            <TextField
              select
              required
              margin="dense"
              id="statusCetak"
              name="statusCetak"
              label="Pilih status"
              fullWidth
              variant="standard"
              value={transaksi.statusCetak}
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
