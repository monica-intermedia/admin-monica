import React from "react";
import type { ReactElement } from "react";
import PageContainer from "../../../../src/components/container/PageContainer";
import FullLayout from "../../../../src/layouts/full/FullLayout";
import AddPositionTable from "../../../../src/components/pegawai/jabatan/AddPositionTable";

const Index = (): React.ReactElement => {
  return (
    <PageContainer title="pembelian barang" description="this is Sample page">
      <AddPositionTable />
    </PageContainer>
  );
};

export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
