import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import type { ReactElement } from "react";
import PageContainer from "../../../../src/components/container/PageContainer";
import FullLayout from "../../../../src/layouts/full/FullLayout";
import EditPositionTable from "../../../../src/components/pegawai/jabatan/EditPositionTable";

const Index = (): React.ReactElement => {
  type Jabatan = {
    jabatanId: string;
    jabatan: string;
  };

  const [jabatan, setJabatan] = useState<Jabatan>({
    jabatanId: "",
    jabatan: "",
  });

  const router = useRouter();
  const { id } = router.query;

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
    <PageContainer title="pembelian barang" description="this is Sample page">
      <EditPositionTable />
    </PageContainer>
  );
};

export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
