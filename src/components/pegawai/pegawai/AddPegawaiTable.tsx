"use client";

import React, { useEffect, useState } from "react";
import DashboardCard from "../../shared/DashboardCard";
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";

type Pegawai = {
  pegawaiId?: string;
  nip: string;
  Name: string;
  alamat: string;
  email: string;
  handphone: string;
  jabatanId?: string;
};

type Jabatan = {
  jabatanId?: string;
  jabatan: string;
};

const AddPegawaiTable = (): React.ReactElement => {
  const [addPegawai, setAddPegawai] = useState<Pegawai>({
    pegawaiId: "",
    nip: "",
    Name: "",
    alamat: "",
    email: "",
    handphone: "",
    jabatanId: "",
  });

  const [jabatan, setJabatan] = useState<Jabatan[]>([]);

  useEffect(() => {
    const fetchJabatan = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/pegawai/jabatan"
        );
        setJabatan(response.data.data);
      } catch (error) {
        console.error("Failed to fetch jabatan:", error);
      }
    };

    fetchJabatan();
  }, []);

  console.log(jabatan);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddPegawai({ ...addPegawai, [name]: value });
  };

  const addData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/pegawai/pegawai",
        addPegawai
      );

      if (response.status === 201) {
        alert("Pegawai created successfully");

        setAddPegawai({
          pegawaiId: "",
          nip: "",
          Name: "",
          alamat: "",
          email: "",
          handphone: "",
          jabatanId: "",
        });
      } else {
        alert("Failed to create pegawai");
      }
    } catch (error) {
      console.error("There was an error adding the data:", error);
      alert("Failed to add data");
    }
  };

  return (
    <DashboardCard title="Tabel Tambah Pegawai">
      <Box
        component="form"
        onSubmit={addData}
        sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <FormControl sx={{ width: "47%" }}>
            <InputLabel htmlFor="nip-input">Masukan NIP</InputLabel>
            <Input
              id="nip-input"
              name="nip"
              aria-describedby="nip-helper"
              onChange={handleInputChange}
              value={addPegawai.nip}
              type="number"
              required
            />
          </FormControl>
          <FormControl sx={{ width: "47%" }}>
            <InputLabel htmlFor="alamat-input">Masukan Alamat</InputLabel>
            <Input
              id="alamat-input"
              name="alamat"
              aria-describedby="alamat-helper"
              onChange={handleInputChange}
              value={addPegawai.alamat}
              type="text"
              required
            />
          </FormControl>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{ marginTop: "20px" }}
        >
          <FormControl sx={{ width: "47%" }}>
            <InputLabel htmlFor="name-input">Masukan Nama</InputLabel>
            <Input
              id="name-input"
              name="Name"
              aria-describedby="name-helper"
              onChange={handleInputChange}
              value={addPegawai.Name}
              type="text"
              required
            />
          </FormControl>
          <FormControl sx={{ width: "47%" }}>
            <InputLabel htmlFor="email-input">Masukan Email</InputLabel>
            <Input
              id="email-input"
              name="email"
              aria-describedby="email-helper"
              value={addPegawai.email}
              onChange={handleInputChange}
              type="email"
              required
            />
          </FormControl>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{ marginTop: "20px" }}
        >
          <FormControl sx={{ width: "47%" }}>
            <InputLabel htmlFor="handphone-input">
              Masukan Nomor Handphone
            </InputLabel>
            <Input
              id="handphone-input"
              name="handphone"
              aria-describedby="handphone-helper"
              onChange={handleInputChange}
              value={addPegawai.handphone}
              type="number"
              required
            />
          </FormControl>
          <FormControl sx={{ width: "47%" }}>
            <TextField
              id="jabatanId-select"
              select
              name="jabatanId"
              label="Select Jabatan"
              helperText="Please select your Jabatan"
              variant="standard"
              onChange={handleInputChange}
              value={addPegawai.jabatanId}
            >
              {jabatan.length > 0 ? (
                jabatan.map((option) => (
                  <MenuItem key={option.jabatanId} value={option.jabatanId}>
                    {option.jabatan}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              )}
            </TextField>
          </FormControl>
        </Box>
        <Box>
          <Button type="submit" variant="contained" sx={{ my: "25px" }}>
            Submit
          </Button>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default AddPegawaiTable;
