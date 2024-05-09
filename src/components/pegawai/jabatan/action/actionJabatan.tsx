import axios from "axios";

type Jabatan = {
  jabatanId: string;
  jabatan: string;
};

export const getJabatanById = async (id: string): Promise<Jabatan | null> => {
  try {
    const response = await axios.get(
      `http://localhost:8080/pegawai/jabatan/${id}`
    );
    return response.data as Jabatan;
  } catch (error) {
    console.error("Error get jabatan by id :", error);
    return null;
  }
};

export const EditJabatan = async (id: string) => {
  try {
    await axios.put(`http://localhost:8080/pegawai/jabatan/${id}`);
  } catch (error) {
    console.error("Error edit jabatan", error);
  }
};

export const DeleteJabatan = async (jabatanId: string) => {
  try {
    await axios.delete(`http://localhost:8080/pegawai/jabatan/${jabatanId}`);
  } catch (error) {
    console.error("Error deleting jabatan :", error);
  }
};

export const handleDelete = (jabatanId: any) => {
  if (window.confirm()) {
    DeleteJabatan(jabatanId);
    window.location.replace("http://localhost:3000/pegawai/jabatan");
  }
};
