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
  Divider,
  TextField,
} from "@mui/material";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import FormDialoGaji from "../../modals/kas-keluar/FormDialogGaji";
import { useFetchData } from "../../action/actions";

interface PegawaiProps {
  nip: string;
  gaji: number;
  name: string;
}

interface GajiProps {
  id: string;
  tanggal: any;
  bpjs: string;
  potongan: number;
  bonus: number;
  jumlahGaji: number;
  pegawai: PegawaiProps;
}

const GajiKaryawanTable = () => {
  const [gaji, setGaji] = useState<GajiProps[]>([]);
  const [search, setSearch] = useState("");

  useFetchData("http://localhost:8080/pegawai/gaji", setGaji);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredGaji = gaji.filter((item) =>
    item.pegawai.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardCard title="Tabel Gaji Karyawan">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <FormDialoGaji setItems={setGaji} />
            <Button
              variant="contained"
              sx={{ ml: 2, pr: 2, pl: 2 }}
              startIcon={<IconPrinter />}
            >
              Print
            </Button>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ mx: 2 }}
            />
            <TextField
              id="search-bar"
              label="Cari karyawan"
              variant="outlined"
              placeholder="Search..."
              size="small"
              sx={{ width: "33%" }}
              value={search}
              onChange={handleSearchChange}
            />
          </Box>
        </Box>
        <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
          <TableHead>
            <TableRow>
              {[
                "Nomor",
                "NIP",
                "Nama",
                "Gaji",
                "Tanggal",
                "Bpjs",
                "Potongan",
                "Bonus",
                "Total Gaji",
              ].map((head) => (
                <TableCell
                  key={head}
                  align={head === "Nomor" ? "left" : "right"}
                >
                  <Typography variant="subtitle2" fontWeight={600}>
                    {head}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGaji.map((option, index) => (
              <TableRow key={option.id}>
                <TableCell>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                    {option.pegawai.nip}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {option.pegawai.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {option.pegawai.gaji}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {option.tanggal}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {option.bpjs}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {option.potongan}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {option.bonus}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {option.jumlahGaji}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default GajiKaryawanTable;
