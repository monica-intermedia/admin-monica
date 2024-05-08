import React, { useState, useEffect } from "react";
import axios from "axios";

interface Position {
  jabatan: string;
}

export function getJabatan() {
  const [positionList, setPositionList] = useState<Position[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/pegawai/jabatan");
      setPositionList(response.data.data);
    } catch (error) {
      console.error("Error fetching position data:", error);
    }
  };
  return { positionList, fetchData };
}
