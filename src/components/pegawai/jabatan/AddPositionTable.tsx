"use client";

import { useState } from "react";
import DashboardCard from "../../shared/DashboardCard";
import { Box, FormControl, InputLabel, Input, Button } from "@mui/material";
import axios from "axios";

type Jabatan = {
  jabatanId?: string;
  jabatan: string;
};

const AddPositionTable = (): React.ReactElement => {
  const [addJabatan, setAddJabtan] = useState<Jabatan>({
    jabatanId: "",
    jabatan: "",
  });

  const handleJabatanInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddJabtan({ ...addJabatan, jabatan: e.target.value });
  };

  const addData = async () => {
    const requestingData = {
      jabatan: addJabatan.jabatan,
    };
    await axios({
      method: "POST",
      url: "http://localhost:8080/pegawai/jabatan",
      data: requestingData,
    }).then((result) => console.log(result.data.data));
  };

  console.log(addData);

  return (
    <DashboardCard title="Tabel Tambah  Jabatan">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box>
          <FormControl sx={{ width: "45%" }}>
            <InputLabel htmlFor="my-input">Masukan jabatan</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              onChange={handleJabatanInput}
            />
          </FormControl>
        </Box>
        <Box>
          <Button variant="contained" sx={{ my: "18px" }} onClick={addData}>
            Submit
          </Button>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default AddPositionTable;
