import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardCard from "../../shared/DashboardCard";
import { Box, TextField } from "@mui/material";

type Jabatan = {
  jabatanId?: string;
  jabatan: string;
};

const EditPositionTable = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;
  const [jabatan, setJabatan] = useState<Jabatan | null>(null);

  const handleJabatanChange = (e: any) => {
    setJabatan({ ...jabatan, jabatan: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/pegawai/jabatan/${id}`
      );
      setJabatan(response.data.data);
    };
    fetchData();
  }, []);

  return (
    <DashboardCard title="Tabel  Jabatan">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-text-input"
            type="text"
            autoComplete="current-text"
            value={jabatan?.jabatan || ""}
            onChange={handleJabatanChange}
          />
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default EditPositionTable;
