import { CardContent, Typography, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import BlankCard from "../../../src/components/shared/BlankCard";
import axios from "axios";
import { useState, useEffect } from "react";

const CardInfo = () => {
  interface PegawaiProps {
    data: number;
  }

  const [pegawai, setPegawai] = useState<PegawaiProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDataPegawai = async () => {
    try {
      const response = await axios.get(
        process.env.backend_url + "/chart/pegawai"
      );
      setPegawai(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }

    console.log(pegawai);
  };

  useEffect(() => {
    fetchDataPegawai();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={3} mb={7}>
        <BlankCard>
          <CardContent sx={{ p: 3, pt: 2 }}>
            <Typography variant="h6">Pegawai</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={1}
            >
              <Stack direction="row" alignItems="center">
                <Typography variant="h6">Rp 12.000</Typography>
                <Typography color="textSecondary" ml={1}>
                  {pegawai ? `${pegawai.data} orang` : "No data available"}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* supplier */}
      <Grid item xs={12} md={4} lg={3}>
        <BlankCard>
          <CardContent sx={{ p: 3, pt: 2 }}>
            <Typography variant="h6">Supplier</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={1}
            >
              <Stack direction="row" alignItems="center">
                <Typography variant="h6">Rp 12.000</Typography>
                <Typography color="textSecondary" ml={1}>
                  123adawd
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* Barang */}
      <Grid item xs={12} md={4} lg={3}>
        <BlankCard>
          <CardContent sx={{ p: 3, pt: 2 }}>
            <Typography variant="h6">Barang</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={1}
            >
              <Stack direction="row" alignItems="center">
                <Typography variant="h6">Rp 12.000</Typography>
                <Typography color="textSecondary" ml={1}>
                  123adawd
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </BlankCard>
      </Grid>

      {/* transaksi */}
      <Grid item xs={12} md={4} lg={3}>
        <BlankCard>
          <CardContent sx={{ p: 3, pt: 2 }}>
            <Typography variant="h6">Transaksi</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={1}
            >
              <Stack direction="row" alignItems="center">
                <Typography variant="h6">Rp 12.000</Typography>
                <Typography color="textSecondary" ml={1}>
                  123adawd
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </BlankCard>
      </Grid>
    </Grid>
  );
};

export default CardInfo;
