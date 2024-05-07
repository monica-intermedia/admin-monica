import type { ReactElement } from "react";
import SalaryTable from "../../../src/components/kas-keluar/SalaryTable";
import PageContainer from "../../../src/components/container/PageContainer";
import FullLayout from "../../../src/layouts/full/FullLayout";

const Index = (): any => {
  return (
    <PageContainer title="pembelian barang" description="this is Sample page">
      <SalaryTable />
    </PageContainer>
  );
};

export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
