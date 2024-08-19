import React, { useEffect, useState } from "react";
import axios from "axios";
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
  interface BarangProps {
    namaBarang: string;
  }

  interface SupplierProps {
    name: string;
  }

  interface DataProps {
    nomorFaktur: string;
    supplier: SupplierProps;
    barang: BarangProps;
    qty: number;
    totalHarga: string;
    tanggal: Date;
  }

  const [data, setData] = useState<DataProps[]>([]);
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");

  useEffect(() => {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");

    setStartDate(storedStartDate);
    setEndDate(storedEndDate);
  }, []);

  console.log(startDate);
  console.log(endDate);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/kaskeluar/pembelianbarang`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <h2>Pembelian Barang</h2>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="right">Nomor Faktur</TableCell>
              <TableCell align="right">Supplier</TableCell>
              <TableCell align="right">Barang</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Jumlah Harga</TableCell>
              <TableCell align="right">Tanggal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="right">{item.nomorFaktur}</TableCell>
                  <TableCell align="right">{item.supplier.name}</TableCell>
                  <TableCell align="right">{item.barang.namaBarang}</TableCell>
                  <TableCell align="right">{item.qty}</TableCell>
                  <TableCell align="right">{item.totalHarga}</TableCell>
                  <TableCell align="right">
                    {formatDate(item.tanggal)}
                  </TableCell>
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
