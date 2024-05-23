import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import { addItem } from "../../action/actions";

export default function FormDialogJabatan() {
  const [open, setOpen] = useState(false);
  const [addJabatan, setAddJabtan] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formJson[key] = value;
    });
    const jabatan = formJson.jabatan;

    const success = await addItem(
      "http://localhost:8080/pegawai/jabatan",
      setItems,
      { jabatan }
    );

    if (success) {
      setAddJabtan("");
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
              value={addJabatan}
              onChange={(e) => setAddJabtan(e.target.value)}
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
}
