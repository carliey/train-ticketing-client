import PageHeader from "../../layout/PageHeader";
import { Box, Avatar, Stack, Typography, Button } from "@mui/material";

type Props = {};

const Profile = (props: Props) => {
  return (
    <div>
      <PageHeader title="Profile" />
      <Box
        sx={{
          my: 4,
        }}
      >
        <Stack alignItems="center" justifyContent="center">
          <Avatar sx={{ height: 100, width: 100 }} />
          <Typography>Muhammed Ladan</Typography>
        </Stack>
        <Box>
          <Typography
            sx={{ backgroundColor: "green", color: "white", my: 2, p: 1 }}
          >
            Personal Information
          </Typography>
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
              <th>Username</th>
              <td>carliey</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>mcarliey@gmail.com</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>08034728472</td>
            </tr>
            <tr>
              <th>Fullname</th>
              <td>muhammed ladan</td>
            </tr>
            <tr>
              <th>Date of birth</th>
              <td>12/12/12</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>Male</td>
            </tr>
          </Box>
        </Box>
      </Box>
      <Stack
        gap={1}
        sx={{ position: "absolute", bottom: 0, width: "100%", mb: 1 }}
      >
        <Button variant="contained">Edit profile</Button>
        <Button variant="contained" color="error">
          Change Password
        </Button>
      </Stack>
    </div>
  );
};

export default Profile;
