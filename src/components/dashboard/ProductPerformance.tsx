import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import axios from "axios";
import dayjs from "dayjs";

interface PegawaiProps {
  name: string;
  nip: number;
}

interface AbsenProps {
  id: string;
  tanggal: Date;
  waktuMasuk: string;
  keterangan: string;
  pegawai: PegawaiProps;
}

const Absensi = () => {
  const [absensi, setAbsensi] = React.useState<AbsenProps[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/pegawai/absensi`
      );
      setAbsensi(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const statusDisplay = (status: string) => {
    if (status === "Tepat Waktu") {
      return "success";
    } else {
      return "error";
    }
  };

  return (
    <DashboardCard title="Absen Karyawan">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
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
                  No
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
                  tanggal
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Keterangan
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Waktu Masuk
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {absensi.map((data, i) => (
              <TableRow key={data.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {i + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {data.pegawai.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {data.pegawai.nip}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {dayjs(data.tanggal).format("DD-MM-YYYY")}{" "}
                  </Typography>
                </TableCell>
                <TableCell>
                  <span
                    style={{
                      backgroundColor:
                        statusDisplay(data.waktuMasuk) === "success"
                          ? "#f44336"
                          : "#4caf50",
                      padding: "6px 8px",
                      borderRadius: "4px",
                      color: "#fff",
                    }}
                  >
                    {data.keterangan}
                  </span>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{data.waktuMasuk}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default Absensi;
