import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";
import { fetchData } from "next-auth/client/_utils";

interface BarangProps {
  id_barang: string;
}

const FormDialogKoran = () => {
  const [open, setOpen] = useState(false);
  const [koran, setKoran] = useState({
    keterangan: "",
    halaman: null,
    warna: null,
    plate: null,
    harga: null,
    id_barang: "",
  });
  const [barang, setBarang] = useState<BarangProps[]>([]);

  const fecthData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/barang/barang");
      setBarang(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fecthData();
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKoran({
      ...koran,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await axios.post("http://localhost:8080/koran", koran);
    console.log(response);
    window.alert("barang berhasil ditambahkan");
    window.location.replace("/barang/halaman-koran");
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
              <h2>Masukan Halaman Koran</h2>
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="keterangan"
              name="keterangan"
              label="Masukan keterangan"
              type="text"
              fullWidth
              variant="standard"
              value={koran.keterangan}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="halaman"
              name="halaman"
              label="Masukan halaman"
              type="number"
              fullWidth
              variant="standard"
              value={koran.halaman}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="warna"
              name="warna"
              label="Masukan warna"
              type="number"
              fullWidth
              variant="standard"
              value={koran.warna}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="plate"
              name="plate"
              label="Masukan plate"
              type="number"
              fullWidth
              variant="standard"
              value={koran.plate}
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
              value={koran.harga}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="harga"
              name="harga"
              label="Masukan harga"
              type="text"
              fullWidth
              variant="standard"
              value={koran.id_barang}
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

export default FormDialogKoran;
