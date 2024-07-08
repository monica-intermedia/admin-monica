import {
  IconLayoutDashboard,
  IconUserPlus,
  IconCalendar,
  IconCertificate,
  IconShoppingBag,
  IconCurrencyDollar,
  IconNote,
  IconTransferIn,
  IconFolder,
  IconDatabase,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  // dashboard
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },

  // Kas Keluar
  {
    navlabel: true,
    subheader: "Kas Keluar",
  },
  {
    id: uniqueId(),
    title: "Pembelian Barang",
    icon: IconShoppingBag,
    href: "/kas-keluar/pembelian-barang",
  },
  {
    id: uniqueId(),
    title: "Gaji Karyawan",
    icon: IconTransferIn,
    href: "/kas-keluar/gaji-karyawan",
  },
  {
    id: uniqueId(),
    title: "Pembelian Lainya",
    icon: IconNote,
    href: "/kas-keluar/pembelian-lainya",
  },

  // Kas Masuk
  {
    navlabel: true,
    subheader: "Kas Masuk",
  },
  {
    id: uniqueId(),
    title: "Transaksi",
    icon: IconCurrencyDollar,
    href: "/kas-masuk/transaksi",
  },
  {
    id: uniqueId(),
    title: "Data Transaksi",
    icon: IconDatabase,
    href: "/kas-masuk/data-transaksi",
  },
  {
    id: uniqueId(),
    title: "Penjualan Lainya",
    icon: IconNote,
    href: "/kas-masuk/penjualan-lainya",
  },

  // Pegawai
  {
    navlabel: true,
    subheader: "Pegawai",
  },
  {
    id: uniqueId(),
    title: "Data Pegawai",
    icon: IconUserPlus,
    href: "/pegawai/data-pegawai",
  },
  {
    id: uniqueId(),
    title: "Jabatan",
    icon: IconCertificate,
    href: "/pegawai/jabatan",
  },
  {
    id: uniqueId(),
    title: "Absensi",
    icon: IconCalendar,
    href: "/pegawai/absensi",
  },

  // Barang
  {
    navlabel: true,
    subheader: "Barang",
  },
  {
    id: uniqueId(),
    title: "Stok Barang",
    icon: IconFolder,
    href: "/barang/stok-barang",
  },
  {
    id: uniqueId(),
    title: "Halaman Koran",
    icon: IconFolder,
    href: "/barang/halaman-koran",
  },
  // Supplier
  {
    navlabel: true,
    subheader: "Supplier",
  },
  {
    id: uniqueId(),
    title: "Data Supplier",
    icon: IconUserPlus,
    href: "/supplier/data-supplier",
  },
];

export default Menuitems;
