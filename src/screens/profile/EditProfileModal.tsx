import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { User } from "../../types/types";
import { useUpdateProfileMutation } from "./profileApiSlice";
import { useAppDispatch } from "../../redux/store";
import { updateUser } from "../auth/authSlice";

type Props = {
  open: boolean;
  handleClose: () => void;
};

export default function EditProfileModal(props: Props) {
  const dispatch = useAppDispatch();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [values, setValues] = useState<any>({
    name: "",
    phone: 0,
    gender: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setValues((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setValues((prev: any) => ({ ...prev, gender: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await updateProfile(values).unwrap();
      console.log(res);
      alert(res.message || "success");
      dispatch(updateUser(values));
      props.handleClose();
    } catch (error) {
      console.log(error);
      alert("updating profile failed");
    }
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>Edit Profile</DialogTitle>
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
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          <TextField
            variant="standard"
            label="Phone number"
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
          <Select
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleSelectChange}
            variant="standard"
            displayEmpty
          >
            <MenuItem value="" disabled>
              select gender
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </Box>
      </DialogContent>
      <DialogActions>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
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
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
