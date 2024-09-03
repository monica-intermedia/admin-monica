import React, { useState, useEffect } from "react";
import { IconPrinter } from "@tabler/icons-react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import DashboardCard from "../shared/DashboardCard";
import dayjs from "dayjs";
import axios from "axios";
import FormTransaksiModals from "../../modals/kas-masuk/FormTransaksiModals";

const DataTransaksiTable = (): any => {
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

  const [transaksi, setTransaksi] = useState<Pembelian[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Pembelian[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/penjualan/transaksi"
        );
        setTransaksi(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [startDate, endDate, searchQuery, transaksi]);

  useEffect(() => {
    // Save filtered data to localStorage whenever it changes
    localStorage.setItem("filteredData", JSON.stringify(filteredData));
  }, [filteredData]);

  const filterData = () => {
    let filtered = transaksi;

    // Filter by date range
    if (startDate && endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = dayjs(item.tanggal);
        return (
          itemDate.isAfter(dayjs(startDate).subtract(1, "day")) &&
          itemDate.isBefore(dayjs(endDate).add(1, "day"))
        );
      });
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.namaKoran.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Update filteredData state with the filtered results
    setFilteredData(filtered);
  };

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:8080/penjualan/transaksi"
    );
    setTransaksi(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = async (id: string) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmed) {
        await axios.delete(`http://localhost:8080/penjualan/transaksi/${id}`);
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const statusDisplay = (status: string) => {
    if (status === "belum-dicetak") {
      return "error";
    } else {
      return "success";
    }
  };

  const handlePrint = () => {
    const printUrl = `http://localhost:3000/kas-masuk/data-transaksi/print`;
    const printWindow = window.open(printUrl, "_blank");

    if (printWindow) {
      const printCheckInterval = setInterval(() => {
        if (printWindow.document.readyState === "complete") {
          clearInterval(printCheckInterval);
          printWindow.print();
        }
      }, 5000);
    } else {
      console.error("Failed to open the print window.");
    }
  };

  return (
    <DashboardCard title="Tabel Data Transaksi">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box>
          <Box display="flex">
            <FormTransaksiModals />
            <Button variant="contained" sx={{ px: 3, marginLeft: 2 }}>
              <IconPrinter onClick={handlePrint} />
            </Button>

            <Box sx={{ marginLeft: 5, marginTop: 1 }}>
              <TextField
                id="start-date"
                label="Tanggal Mulai"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ marginRight: 2 }}
              />
              <TextField
                id="end-date"
                label="Tanggal Akhir"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Box>

          <Box sx={{ marginTop: 5 }}>
            <TextField
              id="search-bar"
              label="Masukkan nama koran"
              variant="outlined"
              placeholder="Search..."
              size="small"
              sx={{ width: 1 / 3 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
        </Box>
        <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
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
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Jumlah Warna
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Jumlah Plate
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Harga
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Total Harga
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Tanggal
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  file
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((option, index) => (
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
                      {option.koran?.halaman}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {option.koran?.warna}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {option.koran?.plate}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {option.koran?.harga}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {option.gross_amount}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {dayjs(option.tanggal).format("DD-MM-YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <span
                      style={{
                        backgroundColor:
                          statusDisplay(option.statusCetak) === "error"
                            ? "#f44336"
                            : "#4caf50",
                        padding: "6px 8px",
                        borderRadius: "4px",
                        color: "#fff",
                      }}
                    >
                      {option.statusCetak}
                    </span>
                  </TableCell>

                  <TableCell align="right">
                    <Button variant="outlined" sx={{ marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteItem(option.id!)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="subtitle1">No data available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default DataTransaksiTable;
