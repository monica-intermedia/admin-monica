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

interface PegawaiProps {
  name: string;
  id: string;
}

const FormDialogAbsensi: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [pegawai, setPegawai] = useState<PegawaiProps[]>([]);
  const [absensi, setAbsensi] = useState({
    tanggal: "",
    waktuMasuk: "",
    keterangan: "",
    id_pegawai: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    setAbsensi({ ...absensi, [e.target.name]: e.target.value });
  };

  const fetchPegawai = async () => {
    const response = await axios.get("http://localhost:8080/pegawai/pegawai");
    setPegawai(response.data.data);
  };

  useEffect(() => {
    fetchPegawai();
  }, []);

  const handleSubmit = async () => {
    try {
      const confirm = window.confirm("succes add item, do you want continue?");
      if (confirm) {
        await axios.post("http://localhost:8080/pegawai/absensi", absensi);
        window.location.replace("/pegawai/absensi");
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
              <h2>Masukan Jabatan</h2>
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="id_pegawai"
              select
              name="id_pegawai"
              label="Nama Pegawai"
              type="text"
              fullWidth
              variant="standard"
              value={absensi.id_pegawai}
              onChange={handleChange}
            >
              {pegawai.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              autoFocus
              required
              margin="dense"
              id="tanggal"
              name="tanggal"
              type="date"
              fullWidth
              variant="standard"
              value={absensi.tanggal}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="waktuMasuk"
              name="waktuMasuk"
              label="Waktu Masuk"
              type="text"
              fullWidth
              variant="standard"
              value={absensi.waktuMasuk}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="keterangan"
              name="keterangan"
              label="Keterangan"
              type="text"
              fullWidth
              variant="standard"
              value={absensi.keterangan}
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

export default FormDialogAbsensi;
