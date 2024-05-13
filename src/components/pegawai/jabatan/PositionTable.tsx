import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { IconPlus, IconPrinter } from "@tabler/icons-react";
import DashboardCard from "../../shared/DashboardCard";
import { handleDelete } from "./action/actionJabatan";
import Link from "next/link";

interface Position {
  jabatan: string;
  jabatanId: string;
}

const PositionTable = (): React.ReactElement => {
  const [jabatan, setJabatan] = useState<Position[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/pegawai/jabatan"
        );
        setJabatan(response.data.data);
      } catch (error) {
        console.error("Error fetching position data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardCard title="Tabel Jabatan">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box>
          <Box display="flex">
            <Link href={"/pegawai/jabatan/tambah-posisi"}>
              <Button variant="contained">
                <IconPlus />
              </Button>
            </Link>
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
                label="masukan nama jabatan"
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
                  Jabatan
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
            {jabatan.map((positions, index) => (
              <TableRow key={positions.jabatanId}>
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                      ></Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {positions.jabatan}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/pegawai/jabatan/${positions.jabatanId}`}
                    style={{ marginRight: "10px" }}
                  >
                    <Button variant="outlined">Edit</Button>
                  </Link>
                  <Link href="#" passHref>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(positions.jabatanId)}
                    >
                      Delete
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default PositionTable;
