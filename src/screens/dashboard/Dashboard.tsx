import { Box, Avatar, Typography, Stack, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../auth/authSlice";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import { useSelector } from "react-redux";

type Props = {};

const Dashboard = (props: Props) => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  return (
    <Box height="100vh" sx={{}}>
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          py: 3,
          boxShadow: "1px 0.5px 0.6px 1px primary.main",
        }}
      >
        <Stack direction={"row"} alignItems="center">
          <Avatar
            sx={{ height: "50px", width: "50px" }}
            onClick={() => navigate("profile")}
          />
          <Stack sx={{ mx: 2 }}>
            <Typography fontSize={10} fontStyle={"italic"}>
              Welcome
            </Typography>
            <Typography fontSize={12}>{user.name || ""}</Typography>
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
