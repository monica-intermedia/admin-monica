import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";

const deleteItem = async (id: string, link: string) => {
  try {
    await axios.delete(`${link}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting item:", error);
    return false;
  }
};

export const handleDelete = async (
  id: string,
  setItems: Dispatch<SetStateAction<any[]>>,
  link: string
) => {
  if (window.confirm("Are you sure you want to delete this item?")) {
    const isDeleted = await deleteItem(id, link);
    if (isDeleted) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  }
};

export const addItem = async (
  link: string,
  setItems: Dispatch<React.SetStateAction<any[]>>,
  requestingData: any
) => {
  try {
    const response = await axios.post(link, requestingData);
    setItems((prevItems) => prevItems.concat(response.data));
    return true;
  } catch (error) {
    console.error("Error adding item:", error);
    return false;
  }
};

export const useFetchData = (
  link: string,
  setItems: Dispatch<React.SetStateAction<any[]>>
) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(link);
        setItems(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [link, setItems]);
};