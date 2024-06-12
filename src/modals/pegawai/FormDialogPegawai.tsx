import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";

interface Position {
  jabatan: string;
  id: string;
}

const FormDialogPegawai: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [addPegawai, setAddPegawai] = useState({
    nip: "",
    name: "",
    alamat: "",
    email: "",
    handphone: "",
    jenisKelamin: "",
    gaji: "",
    password: "",
    id_jabatan: "",
  });

  const [jabatan, setJabatan] = useState<Position[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddPegawai({
      ...addPegawai,
      [e.target.name]: e.target.value,
    });
  };

  const fetchJabatan = async () => {
    try {
      const response = await axios.get("http://localhost:8080/pegawai/jabatan");
      console.log("Jabatan data:", response.data.data); // Logging response data
      setJabatan(response.data.data);
    } catch (error) {
      console.error("Error fetching jabatan:", error);
      window.alert(`Error fetching jabatan: ${error}`);
    }
  };

  useEffect(() => {
    fetchJabatan();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const confirmed = window.confirm(
        "Success add item. Do you want to continue?"
      );

      if (confirmed) {
        await axios.post("http://localhost:8080/pegawai/pegawai", addPegawai);

        const fetchData = async () => {
          const response = await axios.get(
            "http://localhost:8080/pegawai/pegawai"
          );
          console.log("Pegawai data:", response.data); // Logging response data
          setAddPegawai(response.data.data);
        };

        await fetchData();
        handleClose();
        window.location.replace("/pegawai/jabatan");
      }
    } catch (error) {
      console.error("Failed to add data", error);
      window.alert(`Failed to add data: ${error}`);
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
              id="nip"
              name="nip"
              label="Masukan NIP"
              type="text"
              fullWidth
              variant="standard"
              value={addPegawai.nip}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="name"
              name="name"
              label="Masukan nama pegawai"
              type="text"
              fullWidth
              variant="standard"
              value={addPegawai.name}
              onChange={handleChange}
            />
            <TextField
              id="id_jabatan"
              name="id_jabatan"
              select
              label="Jabatan"
              variant="standard"
              fullWidth
              sx={{ my: 1 }}
              value={addPegawai.id_jabatan}
              onChange={handleChange}
            >
              {jabatan.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.jabatan}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              margin="dense"
              id="alamat"
              name="alamat"
              label="Masukan alamat"
              type="text"
              fullWidth
              variant="standard"
              value={addPegawai.alamat}
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
              value={addPegawai.email}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="handphone"
              name="handphone"
              label="Masukan handphone"
              type="number"
              fullWidth
              variant="standard"
              value={addPegawai.handphone}
              onChange={handleChange}
            />
            <Box
              display={"flex"}
              sx={{ my: 2 }}
              justifyContent={"space-between"}
              alignContent={"center"}
            >
              <TextField
                id="jenisKelamin"
                name="jenisKelamin"
                select
                label="Jenis Kelamin"
                variant="standard"
                fullWidth
                sx={{ my: 1, width: "45%" }}
                value={addPegawai.jenisKelamin}
                onChange={handleChange}
              >
                <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                <MenuItem value="Perempuan">Perempuan</MenuItem>
              </TextField>
              <TextField
                required
                margin="dense"
                id="gaji"
                name="gaji"
                label="Masukan gaji"
                type="number"
                fullWidth
                sx={{ width: "50%" }}
                variant="standard"
                value={addPegawai.gaji}
                onChange={handleChange}
              />
            </Box>
            <TextField
              required
              margin="dense"
              id="password"
              name="password"
              label="Masukan password"
              type="password"
              fullWidth
              variant="standard"
              value={addPegawai.password}
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

export default FormDialogPegawai;
