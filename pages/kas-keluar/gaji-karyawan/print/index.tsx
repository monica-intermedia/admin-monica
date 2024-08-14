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
  interface StaffProps {
    name: string;
    nip: string;
    gaji: number;
  }
  interface GajiProps {
    id: string;
    bpjs: number;
    potongan: number;
    bonus: number;
    jumlahGaji: number;
    tanggal: Date;
    pegawai: StaffProps;
  }

  const [data, setData] = React.useState<GajiProps[]>([]);

  const link = "pegawai/gaji";

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/${link}`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
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
        <h2>Gaji Karyawan</h2>
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
                  NIP
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Nama Pegawai
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Bpjs
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Bonus
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Tanggal
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Gaji
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Total Gaji
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
                      {option.pegawai.nip}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {option.pegawai.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {option.bpjs}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {option.bonus}
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
                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {option.pegawai.gaji}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" sx={{ fontSize: "13px" }}>
                      {option.jumlahGaji}
                    </Typography>
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
      </TableContainer>
    </Container>
  );
};

export default Index;
