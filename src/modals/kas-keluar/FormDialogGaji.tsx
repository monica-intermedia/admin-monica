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

interface FormDialoGajiProps {
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

interface PegawaiProps {
  id: string;
  name: string;
}

const FormDialoGaji: React.FC<FormDialoGajiProps> = ({ setItems }) => {
  const [open, setOpen] = useState(false);
  const [addGaji, setAddGaji] = useState<any>({
    tanggal: "",
    bpjs: "",
    potongan: "",
    bonus: "",
    jumlahGaji: "",
    id_pegawai: "",
  });

  const [pegawai, setPegawai] = useState<PegawaiProps[]>([]);

  useFetchData("http://localhost:8080/pegawai/pegawai", setPegawai);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddGaji({
      ...addGaji,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const success = await addItem(
      "http://localhost:8080/pegawai/pegawai",
      setItems,
      addGaji
    );

    if (success) {
      setItems((prevItems) => [...prevItems, addGaji]);
      setAddGaji({
        tanggal: "",
        bpjs: "",
        potongan: "",
        bonus: "",
        jumlahGaji: "",
        id_pegawai: "",
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
              <h2>Masukan Gaji</h2>
            </DialogContentText>
            <TextField
              id="id_pegawai"
              name="id_pegawai"
              select
              label="Select Pegawai"
              variant="standard"
              fullWidth
              sx={{ my: 1 }}
              value={addGaji}
              onChange={handleChange}
            >
              {pegawai.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
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
              value={addGaji.id_pegawai}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="bpjs"
              name="bpjs"
              type="number"
              label="BPJS Pegawai"
              fullWidth
              variant="standard"
              value={addGaji.id_pegawai}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="potongan"
              name="potongan"
              type="number"
              label="Potongan pegawai"
              fullWidth
              variant="standard"
              value={addGaji.id_pegawai}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="bonus"
              name="bonus"
              type="number"
              label="bonus"
              fullWidth
              variant="standard"
              value={addGaji.id_pegawai}
              onChange={handleChange}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="jumlahGaji"
              name="jumlahGaji"
              type="number"
              label="jumlah Gaji"
              fullWidth
              variant="standard"
              value={addGaji.id_pegawai}
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

export default FormDialoGaji;
