import type { ReactElement } from "react";
import GajiKaryawanTable from "../../../src/components/kas-keluar/GajiKaryawanTable";
import PageContainer from "../../../src/components/container/PageContainer";
import FullLayout from "../../../src/layouts/full/FullLayout";

const Index = (): any => {
  return (
    <PageContainer title="pembelian barang" description="this is Sample page">
      <GajiKaryawanTable />
    </PageContainer>
  );
};

export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
