import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { IconBellRinging } from "@tabler/icons-react";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import dayjs from "dayjs";

const FormNotification: React.FC = () => {
  interface KoranProps {
    id: string;
    message: string;
    harga: number;
  }

  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<KoranProps[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080/notification");
    setNotification(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statusDisplay = (status: string) => {
    return status === "error" ? "error" : "success";
  };

  const deleteItem = (id: string) => {
    // Add your delete logic here
    console.log("Deleted item with id:", id);
  };

  return (
    <>
      <Button onClick={handleClickOpen}>
        <Badge variant="dot" color="primary">
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          maxWidth: "none",
          width: "auto",
          "& .MuiDialog-paper": {
            width: "auto",
            maxHeight: "none",
          },
        }}
      >
        <DialogContent style={{ width: "550px" }}>
          <DialogContentText>
            <h2>Notification</h2>
          </DialogContentText>
          <Table>
            <TableBody>
              {notification.length > 0 ? (
                notification.map((option, index) => (
                  <TableRow key={option.id}>
                    <TableCell>
                      <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                        {index + 1}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        sx={{ fontSize: "13px" }}
                      >
                        {option.message}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteItem(option.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    <Typography variant="subtitle1">
                      No data available
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormNotification;
