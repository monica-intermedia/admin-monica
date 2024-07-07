import React, { useState, useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import dynamic from "next/dynamic";
import axios from "axios";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TransaksiProps {
  date: string;
  totalAmount: number;
}

const SalesOverview = () => {
  const [month, setMonth] = useState("1");
  const [dataTransaksi, setDataTransaksi] = useState<TransaksiProps[]>([]);
  const [pendapatan, setPendapatan] = useState<number[]>([]);

  const fetchDataTransaksi = async (selectedMonth: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/chart/pembelian?month=${selectedMonth}`
      );
      setDataTransaksi(response.data.data || []); // Ensure data is not undefined
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataTransaksi([]); // Handle error by setting data to an empty array
    }
  };

  useEffect(() => {
    fetchDataTransaksi(month);
  }, [month]);

  const handleChange = (event: any) => {
    setMonth(event.target.value);
  };

  // Chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // Chart options
  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: dataTransaksi.map((item) => item.date),
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart: any = [
    {
      name: "Expense this month",
      data: dataTransaksi.map((item) => item.totalAmount),
    },
  ];

  return (
    <DashboardCard
      title="Sales Overview"
      action={
        <Select
          labelId="month-dd"
          id="month-dd"
          value={month}
          size="small"
          onChange={handleChange}
        >
          <MenuItem value={1}>January 2023</MenuItem>
          <MenuItem value={2}>February 2023</MenuItem>
          <MenuItem value={3}>March 2023</MenuItem>
          <MenuItem value={4}>April 2023</MenuItem>
          <MenuItem value={5}>May 2023</MenuItem>
          <MenuItem value={6}>June 2023</MenuItem>
          <MenuItem value={7}>July 2023</MenuItem>
          <MenuItem value={8}>August 2023</MenuItem>
          <MenuItem value={9}>September 2023</MenuItem>
          <MenuItem value={10}>October 2023</MenuItem>
          <MenuItem value={11}>November 2023</MenuItem>
          <MenuItem value={12}>December 2023</MenuItem>
        </Select>
      }
    >
      {dataTransaksi.length > 0 ? (
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="bar"
          height="370px"
        />
      ) : (
        <p>No data available for the selected month.</p>
      )}
    </DashboardCard>
  );
};

export default SalesOverview;
