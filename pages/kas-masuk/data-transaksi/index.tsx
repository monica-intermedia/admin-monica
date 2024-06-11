import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import FullLayout from "../../../src/layouts/full/FullLayout";
import DataTransaksiTable from "../../../src/components/kas-masuk/DataTransaksiTable";

const Index = () => {
  return (
    <PageContainer title="pembelian barang" description="this is Sample page">
      <DataTransaksiTable />
    </PageContainer>
  );
};

export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
