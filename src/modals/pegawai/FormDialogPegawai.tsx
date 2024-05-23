import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import { addItem, useFetchData } from "../../action/actions";

interface FormDialogPegawaiProps {
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

interface Position {
  jabatan: string;
  id: string;
}

const FormDialogPegawai: React.FC<FormDialogPegawaiProps> = ({ setItems }) => {
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

  useFetchData("http://localhost:8080/pegawai/jabatan", setJabatan);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !addPegawai.nip ||
      !addPegawai.name ||
      !addPegawai.alamat ||
      !addPegawai.email ||
      !addPegawai.handphone ||
      !addPegawai.jenisKelamin ||
      !addPegawai.gaji ||
      !addPegawai.password ||
      !addPegawai.id_jabatan
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const success = await addItem(
      "http://localhost:8080/pegawai/pegawai",
      setItems,
      addPegawai
    );

    if (success) {
      setItems((prevItems) => [...prevItems, addPegawai]);
      setAddPegawai({
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
