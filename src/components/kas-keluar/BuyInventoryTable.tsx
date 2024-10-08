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
import FormDialog from "../../modals/kas-keluar/FormDialogModals";
import dayjs from "dayjs";
import axios from "axios";

const BuyInventoryTable = (): any => {
  interface Supplier {
    name: string;
  }

  interface Barang {
    namaBarang: string;
  }

  interface Pembelian {
    id: string;
    nomorFaktur: string;
    qty: number;
    totalHarga: number;
    isInventory: boolean;
    tanggal: Date;
    supplier: Supplier;
    barang: Barang;
  }

  const [pembelianBarang, setPembelianBarang] = useState<Pembelian[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Pembelian[]>([]);

  useEffect(() => {
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/kaskeluar/pembelianbarang"
        );
        console.log("Fetched data:", response.data.data);
        setPembelianBarang(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [startDate, endDate, pembelianBarang]);

  const filterData = () => {
    if (!startDate || !endDate) {
      setFilteredData(pembelianBarang);
      return;
    }

    const filtered = pembelianBarang.filter((item) => {
      const itemDate = dayjs(item.tanggal);
      return (
        itemDate.isAfter(dayjs(startDate).subtract(1, "day")) &&
        itemDate.isBefore(dayjs(endDate).add(1, "day"))
      );
    });

    setFilteredData(filtered);
  };

  const deleteItem = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      try {
        await axios.delete(
          `http://localhost:8080/kaskeluar/pembelianbarang/${id}`
        );
        setPembelianBarang((prevState) =>
          prevState.filter((item) => item.id !== id)
        );
        console.log("Item deleted successfully");
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    } else {
      console.log("Deletion cancelled");
    }
  };

  const handlePrint = () => {
    const printUrl = `http://localhost:3000/kas-keluar/pembelian-barang/print?startDate=${startDate}&endDate=${endDate}`;
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
    <DashboardCard title="Tabel Pembelian Barang">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box>
          <Box display="flex">
            <FormDialog />
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
          <Box>
            <br />
            <form>
              <TextField
                id="search-bar"
                label="Masukkan nama barang"
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={{ width: 1 / 3 }}
              />
            </form>
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
                  Nomor Faktur
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Supplier
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Barang
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Qty
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Jumlah Harga
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Tanggal
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
              filteredData.map((pembelian, index) => (
                <TableRow key={pembelian.id}>
                  <TableCell>
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {pembelian.nomorFaktur}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {pembelian.supplier?.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {pembelian.barang?.namaBarang}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {pembelian.qty}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {pembelian.totalHarga}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {dayjs(pembelian.tanggal).format("DD-MM-YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" sx={{ marginRight: "10px" }}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteItem(pembelian.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography>No data available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default BuyInventoryTable;
