import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { Box, MenuItem } from "@mui/material";
import { Height } from "@mui/icons-material";

export default function FormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [count, setCount] = useState(0);

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

  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];

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
              defaultValue="EUR"
              variant="standard"
              fullWidth
              sx={{ marginTop: 1 }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="standard-select-currency"
              select
              label="Pilih Barang"
              defaultValue="EUR"
              variant="standard"
              fullWidth
              sx={{ marginTop: 1 }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
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
              <h4 style={{ color: "green" }}>Rp. 125.000</h4>
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
