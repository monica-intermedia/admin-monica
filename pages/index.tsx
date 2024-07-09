import type { ReactElement } from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "../src/components/container/PageContainer";
import SalesOverview from "../src/components/dashboard/SalesOverview";
import RecentTransactions from "../src/components/dashboard/RecentTransactions";
import ProductPerformance from "../src/components/dashboard/ProductPerformance";
import FullLayout from "../src/layouts/full/FullLayout";
import CardInfo from "../src/components/dashboard/CardInfo";

export default function Home() {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid item xs={12}>
          <CardInfo />
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
