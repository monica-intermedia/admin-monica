import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import axios from "axios";

interface PegawaiProps {
  id: string;
  name: string;
  gaji: number;
  nip: string;
}

const FormDialoGaji: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [addGaji, setAddGaji] = useState({
    id_pegawai: "",
    tanggal: "",
    bpjs: "",
    potongan: "",
    bonus: "",
    jumlahGaji: 0,
  });
  const [gaji, setGaji] = useState<any[]>([]);
  const [selectedPegawai, setSelectedPegawai] = useState<PegawaiProps | null>(
    null
  );
  const [pegawai, setPegawai] = useState<PegawaiProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/pegawai/pegawai"
        );
        setPegawai(response.data.data);
      } catch (error) {
        console.error("Error fetching pegawai data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newAddGaji = { ...addGaji, [name]: value };

    if (["bpjs", "potongan", "bonus"].includes(name)) {
      newAddGaji.jumlahGaji =
        (selectedPegawai?.gaji || 0) -
        Number(newAddGaji.bpjs) -
        Number(newAddGaji.potongan) +
        Number(newAddGaji.bonus);
    }

    setAddGaji(newAddGaji);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = e.target.value;
    const selectedPegawai = pegawai.find((p) => p.id === selectedId) || null;
    setSelectedPegawai(selectedPegawai);
    setAddGaji({
      ...addGaji,
      id_pegawai: selectedId,
      jumlahGaji:
        (selectedPegawai?.gaji || 0) -
        Number(addGaji.bpjs) -
        Number(addGaji.potongan) +
        Number(addGaji.bonus),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id_pegawai, tanggal, bpjs, potongan, bonus, jumlahGaji } = addGaji;
    const gajiData = { id_pegawai, tanggal, bpjs, potongan, bonus, jumlahGaji };

    try {
      const response = await axios.post(
        "http://localhost:8080/pegawai/gaji",
        gajiData
      );
      if (response.status === 201 || response.status === 200) {
        console.log("Gaji added:", response.data.data);

        window.alert("Gaji berhasil ditambahkan!");

        const fetchDataGaji = async () => {
          const response = await axios.get(
            "http://localhost:8080/pegawai/gaji"
          );
          setGaji(response.data.data);
        };
        fetchDataGaji();

        window.location.replace("/kas-keluar/gaji-karyawan");

        handleClose();
      } else {
        window.alert("Gagal menambahkan gaji");
      }
    } catch (error) {
      console.error("Error adding gaji:", error);
      window.alert("Gagal menambahkan gaji");
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
              value={addGaji.id_pegawai}
              onChange={handleSelectChange}
            >
              {pegawai.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              autoFocus
              margin="dense"
              id="nip"
              name="nip"
              type="text"
              label="NIP"
              fullWidth
              disabled
              variant="standard"
              value={selectedPegawai?.nip || ""}
            />
            <TextField
              required
              margin="dense"
              id="tanggal"
              name="tanggal"
              type="date"
              fullWidth
              variant="standard"
              value={addGaji.tanggal}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="bpjs"
              name="bpjs"
              type="number"
              label="BPJS Pegawai"
              fullWidth
              variant="standard"
              value={addGaji.bpjs}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="potongan"
              name="potongan"
              type="number"
              label="Potongan Pegawai"
              fullWidth
              variant="standard"
              value={addGaji.potongan}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="bonus"
              name="bonus"
              type="number"
              label="Bonus"
              fullWidth
              variant="standard"
              value={addGaji.bonus}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="gaji"
              name="gaji"
              type="number"
              label="Gaji"
              disabled
              fullWidth
              variant="standard"
              value={selectedPegawai?.gaji || 0}
            />
            <TextField
              required
              margin="dense"
              id="jumlahGaji"
              name="jumlahGaji"
              type="number"
              label="Jumlah Gaji"
              fullWidth
              variant="standard"
              value={addGaji.jumlahGaji}
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
