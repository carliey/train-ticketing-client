import React from "react";
import { Box, Avatar, Typography, Stack, IconButton } from "@mui/material";
import { PowerSettingsNew } from "@mui/icons-material";
import { useAppDispatch } from "../../redux/store";
import { logout } from "../auth/authSlice";

type Props = {};

const Dashboard = (props: Props) => {
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        backgroundColor: "green",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        boxShadow: "1px 0.5px 0.6px 1px green",
      }}
    >
      <Stack direction={"row"} alignItems="center" gap={1}>
        <Avatar />
        <Stack>
          <Typography fontSize={10} fontStyle={"italic"}>
            Welcome
          </Typography>
          <Typography fontSize={12}>John Doe</Typography>
        </Stack>
      </Stack>
      <IconButton onClick={() => dispatch(logout())}>
        <PowerSettingsNew />
      </IconButton>
    </Box>
  );
};

export default Dashboard;
