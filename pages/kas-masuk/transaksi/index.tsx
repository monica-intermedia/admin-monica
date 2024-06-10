import type { ReactElement } from "react";
import OtherBuyTable from "../../../src/components/kas-keluar/OtherBuyTable";
import PageContainer from "../../../src/components/container/PageContainer";
import FullLayout from "../../../src/layouts/full/FullLayout";

const Index = () => {
  return (
    <PageContainer title="pembelian barang" description="this is Sample page">
      <OtherBuyTable />
    </PageContainer>
  );
};

export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
