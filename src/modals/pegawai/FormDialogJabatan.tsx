import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";

const FormDialogJabatan: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [addJabatan, setAddJabtan] = useState({
    jabatan: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    setAddJabtan({ ...addJabatan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const confirm = window.confirm("succes add item, do you want continue?");
      if (confirm) {
        await axios.post("http://localhost:8080/pegawai/jabatan", addJabatan);
        window.location.replace("/pegawai/jabatan");
      }
    } catch (error) {
      console.error("fail add item", error);
      window.alert(`fail add item : ${error}`);
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
              id="jabatan"
              name="jabatan"
              label="Masukan nama jabatan"
              type="text"
              fullWidth
              variant="standard"
              value={addJabatan.jabatan}
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

export default FormDialogJabatan;
