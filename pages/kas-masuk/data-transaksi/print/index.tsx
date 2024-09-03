import React from "react";
import dayjs from "dayjs";
import {
  Container,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

const Index = () => {
  interface KoranProps {
    keterangan: string;
    halaman: number;
    plate: number;
    harga: number;
    warna: number;
  }
  interface Pembelian {
    id: string;
    namaKoran: string;
    keteranggan: string;
    eksemplar: number;
    gross_amount: number;
    statusCetak: string;
    tanggal: Date;
    koran: KoranProps;
  }

  const [data, setData] = React.useState<Pembelian[]>([]);

  React.useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem("filteredData");
    if (storedData) {
      // Parse and set data to state
      setData(JSON.parse(storedData));
    }
  }, []);

  const totalPayment = data.reduce(
    (total, current) => total + current.gross_amount,
    0
  );

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mx: "auto",
          width: "auto",
        }}
      >
        <h1>Monica Intermedia Grafika</h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mx: "auto",
          width: "auto",
        }}
      >
        <h2>Daftar Transaksi</h2>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  No.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Nama Koran
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Jumlah Halaman
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle2" fontWeight={600}>
                  Jumlah Warna
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle2" fontWeight={600}>
                  Jumlah Plate
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle2" fontWeight={600}>
                  Harga
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle2" fontWeight={600}>
                  Total Harga
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle2" fontWeight={600}>
                  Tanggal
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((option, index) => (
                <TableRow key={option.id}>
                  <TableCell>
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {option.namaKoran}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {option.koran.halaman}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {option.koran.warna}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {option.koran.plate}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {option.koran.harga}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {option.gross_amount}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {dayjs(option.tanggal).format("DD-MM-YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="subtitle2" fontWeight={400}>
                      {option.statusCetak}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <Typography variant="subtitle1">No data available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Box sx={{ mt: 4 }}>
          <h2>Total Pembayaran</h2>
          <Typography variant="h6">
            Rp {totalPayment.toLocaleString("id-ID")}
          </Typography>
        </Box>
      </TableContainer>
    </Container>
  );
};

export default Index;
