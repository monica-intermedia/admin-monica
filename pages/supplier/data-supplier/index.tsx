import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import FullLayout from "../../../src/layouts/full/FullLayout";
import SupplierTable from "../../../src/components/pelanggan/SupplierTable";

const Index = (): any => {
  return (
    <PageContainer title="pembelian barang" description="this is Sample page">
      <SupplierTable />
    </PageContainer>
  );
};

export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
