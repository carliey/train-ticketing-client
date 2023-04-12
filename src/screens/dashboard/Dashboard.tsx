import React from "react";
import { Box, Avatar, Typography, Stack, IconButton } from "@mui/material";
import { PowerSettingsNew } from "@mui/icons-material";
import { useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authSlice";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";

type Props = {};

const Dashboard = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Box height="100vh" sx={{}}>
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
          <Avatar onClick={() => navigate("profile")} />
          <Stack>
            <Typography fontSize={10} fontStyle={"italic"}>
              Welcome
            </Typography>
            <Typography fontSize={12}>John Doe</Typography>
          </Stack>
        </Stack>
      </Box>
      <Stack
        sx={{
          height: "100%",
          "& .card": {
            height: "20%",
            my: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "GrayText",
            flexDirection: "column",
            color: "white",
          },
        }}
      >
        <Box className="card" onClick={() => navigate("profile")}>
          <PersonIcon />
          <Typography>Profile</Typography>
        </Box>
        <Box className="card" onClick={() => navigate("booking")}>
          <ConfirmationNumberIcon />
          <Typography>Booking</Typography>
        </Box>
        <Box className="card" onClick={() => navigate("history")}>
          <HistoryIcon />
          <Typography>History</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;
