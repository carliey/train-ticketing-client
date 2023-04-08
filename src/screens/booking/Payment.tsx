import React from "react";
import PageHeader from "../../layout/PageHeader";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  SelectChangeEvent,
  Button,
  Stack,
} from "@mui/material";

import { Schedule, Seat } from "../../types/types";
import { useAppDispatch } from "../../redux/store";
import { selectSelectedSeats, selectTotalPrice } from "./bookingSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

type Props = {};
interface CustomizedState {
  schedule: Schedule;
}

const Payment = (props: Props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  const { schedule } = state;
  const selectedSeats = useSelector(selectSelectedSeats);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <>
      <PageHeader title="Payment" />
      <Box
        sx={{
          p: 2,
          "& .seats-container": {
            borderColor: "#f3f3f3",
          },
          "& > *": {
            my: 1.2,
          },
        }}
      >
        <Typography variant="h5">Trip Information</Typography>
        <Box
          component="table"
          sx={{
            width: "100%",
            p: 1,
            "& th": {
              textAlign: "left",
              fontWeight: "normal",
            },
            "& td": {
              fontWeight: "bold",
            },
          }}
        >
          <tr>
            <th>Depature Station</th>
            <td>{schedule?.depature_station.name}</td>
          </tr>
          <tr>
            <th>Arrival Station</th>
            <td>{schedule?.arrival_station.name}</td>
          </tr>
          <tr>
            <th>Depature date</th>
            <td>{schedule?.departure_date}</td>
          </tr>
          <tr>
            <th>Arrival Date</th>
            <td>{schedule?.arrival_date}</td>
          </tr>
          <tr>
            <th>Depature Time</th>
            <td>{schedule?.depature_time}</td>
          </tr>
          <tr>
            <th>Arrival Time</th>
            <td>{schedule?.arrival_time}</td>
          </tr>
        </Box>
        <fieldset className="seats-container">
          <legend>Seats</legend>

          {selectedSeats?.map((seat: Seat) => (
            <Box
              boxShadow={2}
              sx={{
                backgroundColor: "green",
                color: "white",
                display: "flex",
                p: 2,
                my: 1,
              }}
            >
              <Typography width="50%">
                {seat.name} - {seat.classification?.name}
              </Typography>
              <Typography width="50%"> ₦{seat.price} </Typography>
            </Box>
          ))}
          <Typography mt={2}>
            TOTAL: <strong>₦{totalPrice.toFixed(2)}</strong>
          </Typography>
        </fieldset>
      </Box>
      <Stack
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
          onClick={() => alert("feature coming soon")}
        >
          Make Payment
        </Button>
      </Stack>
    </>
  );
};

export default Payment;
