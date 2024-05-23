import type { ReactElement } from "react";
import BuyInventoryTable from "../../../src/components/kas-keluar/BuyInventoryTable";
import PageContainer from "../../../src/components/container/PageContainer";
import FullLayout from "../../../src/layouts/full/FullLayout";

const Index = (): any => {
  return (
    <PageContainer title="pembelian barang" description="this is Sample page">
      <BuyInventoryTable />
      {/* <CollapsibleTable /> */}
    </PageContainer>
  );
};

export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
