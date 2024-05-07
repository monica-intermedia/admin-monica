import type { ReactElement } from "react";
import BuyTable from "../../../src/components/kas-keluar/BuyInventoryTable";
import PageContainer from "../../../src/components/container/PageContainer";
import FullLayout from "../../../src/layouts/full/FullLayout";
import CollapsibleTable from "../../../src/components/kas-keluar/coba";
// import DashboardCard from "../../../src/components/shared/DashboardCard";

const Index = (): any => {
  return (
    <PageContainer title="pembelian barang" description="this is Sample page">
      <BuyTable />
      {/* <CollapsibleTable /> */}
    </PageContainer>
  );
};

export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
