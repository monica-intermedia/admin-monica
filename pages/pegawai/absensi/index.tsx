import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import FullLayout from "../../../src/layouts/full/FullLayout";
import AbsensiTable from "../../../src/components/pegawai/absensi/AbsensiTable";

const Index = (): any => {
  return (
    <PageContainer title="pembelian barang" description="this is Sample page">
      <AbsensiTable />
    </PageContainer>
  );
};

export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
