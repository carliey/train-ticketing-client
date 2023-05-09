import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  open: boolean;
  handleClose: () => void;
};

export default function ChangePasswordModal(props: Props) {
  const [values, setValues] = useState<FormValues>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setValues((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("data", values);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            label="Old password"
            name="oldPassword"
            value={values.oldPassword}
            onChange={handleChange}
            type="password"
          />
          <TextField
            variant="standard"
            label="New Password"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            type="password"
          />
          <TextField
            variant="standard"
            label="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            type="password"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" size="small" onClick={handleSubmit}>
          Submit
        </Button>
        <Button
          size="small"
          color="error"
          variant="contained"
          onClick={props.handleClose}
        >
          Cancel
        </Button>{" "}
      </DialogActions>
    </Dialog>
  );
}
