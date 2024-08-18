import React, { useState, useEffect } from "react";
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
import { IconPrinter } from "@tabler/icons-react";
import DashboardCard from "../../shared/DashboardCard";
import Link from "next/link";
import axios from "axios";
import dayjs from "dayjs";
import FormDialogAbsensi from "../../../modals/pegawai/FormDialogAbsensi";

interface PegawaiProps {
  name: string;
  nip: number;
}

interface AbsensiProps {
  id: string;
  tanggal: string;
  waktuMasuk: string;
  waktuKeluar: string;
  gambar: string;
  keterangan: string;
  pegawai: PegawaiProps;
}

const statusDisplay = (status: string) => {
  if (status === "tepat waktu") {
    return "success";
  } else {
    return "error";
  }
};

const AbsensiTable = (): React.ReactElement => {
  const [absensi, setAbsensi] = useState<AbsensiProps[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/pegawai/absensi");
      setAbsensi(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/pegawai/absensi/${id}`);
      setAbsensi((prevAbsensi) => prevAbsensi.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data", error);
    }
  };

  return (
    <DashboardCard title="Tabel Absensi">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box>
          <Box display="flex">
            <FormDialogAbsensi />
            <Button
              variant="contained"
              style={{
                paddingRight: "20px",
                paddingLeft: "20px",
                marginLeft: "20px",
              }}
            >
              <IconPrinter />
            </Button>
          </Box>
          <Box>
            <br />
            <form>
              <TextField
                id="search-bar"
                className="text"
                label="Masukan nama jabatan"
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={{ width: 1 / 3 }}
              />
            </form>
          </Box>
        </Box>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  No.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Nama Pegawai
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  NIP
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Tanggal
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Waktu Masuk
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Keterangan
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {absensi.map((data, index) => (
              <TableRow key={data.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontSize: "13px",
                    }}
                  >
                    {data.pegawai.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontSize: "13px",
                    }}
                  >
                    {data.pegawai.nip}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontSize: "13px",
                    }}
                  >
                    {dayjs(data.tanggal).format("DD-MM-YYYY")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontSize: "13px",
                    }}
                  >
                    {data.waktuMasuk}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontSize: "13px",
                    }}
                  >
                    {data.keterangan}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontSize: "13px",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor:
                          statusDisplay(data.keterangan) == "success"
                            ? "#f44336"
                            : "#4caf50",
                        padding: "6px 8px",
                        borderRadius: "4px",
                        color: "#fff",
                      }}
                    >
                      {data.keterangan}
                    </span>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/pegawai/jabatan/${data.id}`}
                    style={{ marginRight: "10px" }}
                  >
                    <Button variant="outlined">Edit</Button>
                  </Link>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(data.id)}
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

export default AbsensiTable;
