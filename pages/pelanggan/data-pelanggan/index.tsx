import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import FullLayout from "../../../src/layouts/full/FullLayout";
import PelangganTable from "../../../src/components/pelanggan/PelangganTable";

const Index = (): any => {
  return (
    <PageContainer title="pembelian barang" description="this is Sample page">
      <PelangganTable />
    </PageContainer>
  );
};

export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
