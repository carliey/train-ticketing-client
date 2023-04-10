import React from "react";
import PageHeader from "../../layout/PageHeader";
import { Ticket } from "../../types/types";
import { useLocation } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";

type Props = {};

type CustomizedState = {
  ticket: Ticket;
};

const TicketDetails = (props: Props) => {
  const location = useLocation();
  const state = location.state as CustomizedState;
  const { ticket } = state;
  console.log("state", state);
  return (
    <div>
      <PageHeader title="Ticket Details" />
      <Box sx={{ border: "1px solid black", m: 2, width: "350px", p: 3 }}>
        <Stack alignItems="center">
          <Typography>seat</Typography>
          <Typography variant="h4">A5</Typography>
          <Typography>Business Class</Typography>
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography>Rigasa</Typography>
          <ArrowRightAlt
            fontSize="large"
            sx={{ height: "50px", width: "100px", color: "green" }}
          />
          <Typography>Idu</Typography>
        </Stack>
        <Stack alignItems="center">
          <Typography fontSize="20px" mb={0}>
            12/32/12
          </Typography>
          <Typography mt={0}>2:30pm</Typography>
        </Stack>
        <Box
          component="table"
          sx={{
            width: "100%",
            p: 1,
            "& th": {
              textAlign: "left",
              fontWeight: "normal",
            },
          }}
        >
          <tr>
            <th>Fullname</th>
            <td>Muhammed Ladan</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>mcarliey@gmail.com</td>
          </tr>
          <tr>
            <th>Transaction ID</th>
            <td>93434728472</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>N23,212</td>
          </tr>
        </Box>
        <Box height={50} width={50} margin="0 auto" border="3px solid black" />
      </Box>
    </div>
  );
};

export default TicketDetails;
