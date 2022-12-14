import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useSelector } from "react-redux";
import { useContext, useState } from "react";
import { UrlContext } from "../context/UrlContext";
import { Snackbar } from "@mui/material";

export default function EditDialog({
  task,
  updateTasks,
  editDialog,
  setEditDialog,
}) {
  const token = useSelector((state) => state.token.value);
  const urlList = useContext(UrlContext);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    setEditDialog(false);
    let name = e.target[0].value;
    axios
      .put(
        urlList.tasks + `${task.id}/`,
        { name: name, description: "edited" },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        updateTasks();
        setOpen(true);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={editDialog}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Enter a new name for "{task.name}":</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Task name"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setEditDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Edit task</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Task edited"
      />
    </div>
  );
}
