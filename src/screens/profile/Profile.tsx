import { Edit } from "@mui/icons-material";
import PageHeader from "../../layout/PageHeader";
import { Box, Avatar, Stack, Typography, Button } from "@mui/material";
import { useAppDispatch } from "../../redux/store";
import { logout, selectCurrentUser } from "../auth/authSlice";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { useSelector } from "react-redux";

type Props = {};

const Profile = (props: Props) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectCurrentUser);

  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  return (
    <div>
      {/* dialogs  */}
      <EditProfileModal
        open={openEditProfile}
        handleClose={() => setOpenEditProfile(false)}
      />
      <ChangePasswordModal
        open={openChangePassword}
        handleClose={() => setOpenChangePassword(false)}
      />
      {/* end of dialogs */}
      <PageHeader title="Profile" />
      <Box
        sx={{
          my: 4,
        }}
      >
        <Stack alignItems="center" justifyContent="center">
          <Avatar sx={{ height: 100, width: 100 }} />
          <Typography>{user.name || ""}</Typography>
        </Stack>
        <Box>
          <Stack
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              my: 2,
              px: 2,
              py: 1,
            }}
            direction="row"
            justifyContent="space-between"
          >
            <Typography>Personal Information</Typography>
            <Edit onClick={() => setOpenEditProfile(true)} />
          </Stack>
          <Box
            component="table"
            sx={{
              width: "100%",
              p: 1,
              "& th": {
                textAlign: "left",
              },
            }}
          >
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{user.phone}</td>
            </tr>
            {/* <tr>
              <th>Date of birth</th>
              <td>12/12/12</td>
            </tr> */}
            <tr>
              <th>Gender</th>
              <td>{user.gender}</td>
            </tr>
          </Box>
        </Box>
      </Box>
      <Stack
        direction="row"
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          p: 2,
        }}
      >
        <Button
          className="btn"
          variant="contained"
          color="success"
          fullWidth
          size="large"
          onClick={() => setOpenChangePassword(true)}
          sx={{ mr: 2 }}
        >
          Change Password
        </Button>
        <Button
          className="btn"
          variant="contained"
          color="success"
          fullWidth
          size="large"
          onClick={() => dispatch(logout())}
        >
          Log out
        </Button>
      </Stack>
    </div>
  );
};

export default Profile;
