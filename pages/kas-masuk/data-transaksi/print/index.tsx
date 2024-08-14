import React from "react";
import axios from "axios";
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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/penjualan/transaksi"
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

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
      </TableContainer>
    </Container>
  );
};

export default Index;
