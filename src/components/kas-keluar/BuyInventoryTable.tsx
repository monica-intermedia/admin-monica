import React, { useState } from "react";
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

import { handleDelete, useFetchData } from "../../action/actions";

const BuyInventoryTable = (): React.ReactElement => {
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

  useFetchData(
    "http://localhost:8080/kaskeluar/pembelianbarang",
    setPembelianBarang
  );

  return (
    <DashboardCard title="Tabel Pembelian Barang">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box>
          <Box display="flex">
            <FormDialog />
            <Button variant="contained" sx={{ px: 3, marginLeft: 2 }}>
              <IconPrinter />
            </Button>
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
            {pembelianBarang.map((pembelian, index) => (
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
                    onClick={() =>
                      handleDelete(
                        pembelian.id!,
                        setPembelianBarang,
                        "http://localhost:8080/kaskeluar/pembelianbarang"
                      )
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default BuyInventoryTable;
