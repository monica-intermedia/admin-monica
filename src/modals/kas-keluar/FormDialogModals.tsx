import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { Box, MenuItem } from "@mui/material";
import { useFetchData } from "../../action/actions";

interface SupplierDataProps {
  id: string;
  name: string;
}

interface BarangDataProps {
  id: string;
  namaBarang: string;
  harga: number;
}

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [supplier, setSupplier] = useState<SupplierDataProps[]>([]);
  const [barang, setBarang] = useState<BarangDataProps[]>([]);
  const [selectedBarang, setSelectedBarang] = useState<BarangDataProps | null>(
    null
  );
  const [count, setCount] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);
  const [pembelianBarang, setPembelianBarang] = useState({
    nomorFaktur: "",
    qty: "",
    totalHarga: "",
    isInventory: "",
    tanggal: "",
    id_supplier: "",
    id_barang: "",
  });

  useFetchData("http://localhost:8080/pelanggan/supplier", setSupplier);
  useFetchData("http://localhost:8080/barang/barang", setBarang);

  useEffect(() => {
    if (selectedBarang && count >= 0) {
      setTotalHarga(selectedBarang.harga * count);
    }
  }, [selectedBarang, count]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBarangChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedBarangId = event.target.value;
    const selectedBarangData = barang.find((b) => b.id === selectedBarangId);
    setSelectedBarang(selectedBarangData || null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formJson[key] = value;
    });
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPembelianBarang({
      ...pembelianBarang,
      [e.target.name]: e.target.value,
    });
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
          <DialogContent>
            <DialogContentText>
              <h2>Masukan Pembelian Barang</h2>
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="Nomor Faktur"
              label="Masukan nomor faktur"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              id="standard-select-currency"
              select
              label="Pilih supplier"
              variant="standard"
              fullWidth
              sx={{ marginTop: 1 }}
            >
              {supplier.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-select-currency"
              select
              label="Pilih Barang"
              value={selectedBarang?.id || ""}
              onChange={handleBarangChange}
              variant="standard"
              fullWidth
              sx={{ marginTop: 1 }}
            >
              {barang.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.namaBarang}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="tanggal"
              type="date"
              fullWidth
              variant="standard"
            />
            <Box
              display={"flex"}
              alignItems={"center"}
              width={"550px"}
              justifyContent={"space-between"}
              sx={{ my: 2 }}
            >
              <Box>
                <h4>Masukkan Jumlah Barang (Qty)</h4>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ textAlign: "center" }}
              >
                <Button
                  onClick={() => {
                    if (count > 0) {
                      setCount(count - 1);
                    }
                  }}
                >
                  <h1>-</h1>
                </Button>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="qty"
                  value={count}
                  type="number"
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  inputProps={{
                    style: {
                      textAlign: "center",
                    },
                  }}
                  style={{
                    width: "55px",
                  }}
                />
                <Button onClick={() => setCount(count + 1)}>
                  <h1>+</h1>
                </Button>
              </Box>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              sx={{ marginTop: 1 }}
            >
              <h3>Total Harga</h3>
              <h4 style={{ color: "green" }}>Rp. {totalHarga}</h4>
            </Box>
          </DialogContent>
          <DialogActions sx={{ marginBottom: 2 }}>
            <Link href={"#"} passHref>
              <Button onClick={handleClose}>Cancel</Button>
            </Link>
            <Link href={"/kas-keluar/pembelian-barang"}>
              <Button type="submit">Submit</Button>
            </Link>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
