import { useState } from "react";
import DashboardCard from "../../shared/DashboardCard";
import { Box, FormControl, InputLabel, Input, Button } from "@mui/material";
import { addItem } from "../../../action/actions";

const AddPositionTable = (): React.ReactElement => {
  const [addJabatan, setAddJabtan] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);

  const requestData = {
    jabatan: addJabatan,
  };

  const handleSubmit = async () => {
    await addItem(
      "http://localhost:8080/pegawai/jabatan",
      setItems,
      requestData
    );
    setAddJabtan("");
  };

  return (
    <DashboardCard title="Tabel Tambah Jabatan">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Box>
          <FormControl sx={{ width: "45%" }}>
            <InputLabel htmlFor="my-input">Masukkan jabatan</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              value={addJabatan}
              onChange={(e) => setAddJabtan(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{ my: "18px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default AddPositionTable;
