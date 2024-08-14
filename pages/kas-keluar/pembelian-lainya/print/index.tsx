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
} from "@mui/material";

const Index = () => {
  interface PembelianProps {
    id: string;
    nomorFaktur: string;
    jenisPembelian: string;
    qty: number;
    tanggal: Date;
    totalHarga: number;
    keterangan: string;
  }

  const [data, setData] = React.useState<PembelianProps[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/kaskeluar/pembelianlainya"
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
        <h2>Pembelian Lainya</h2>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="right">Nomor Faktur</TableCell>
              <TableCell align="right">Jenis Pembelian</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Tanggal</TableCell>
              <TableCell align="right">Keterangan</TableCell>
              <TableCell align="right">Total Harga</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="right">{item.nomorFaktur}</TableCell>
                  <TableCell align="right">{item.jenisPembelian}</TableCell>
                  <TableCell align="right">{item.qty}</TableCell>
                  <TableCell align="right">
                    {" "}
                    {dayjs(item.tanggal).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell align="right">{item.keterangan}</TableCell>
                  <TableCell align="right">{item.totalHarga}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No data available
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
