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
} from "@mui/material";

import { RemoveCircle } from "@mui/icons-material";
import { schedules, seats } from "../../data/data";
import { Schedule, Seat } from "../../types/types";
import { useAppDispatch } from "../../redux/store";
import {
  addSeat,
  removeSeat,
  selectSelectedSeats,
  selectTotalPrice,
} from "./bookingSlice";
import { useSelector } from "react-redux";

type Props = {};

const Booking = (props: Props) => {
  const dispatch = useAppDispatch();
  const selectedSeats = useSelector(selectSelectedSeats);
  const totalPrice = useSelector(selectTotalPrice);
  const [schedule, setSelectedSchedule] = React.useState("");

  const handleChangeSchedule = (event: SelectChangeEvent) => {
    setSelectedSchedule(event.target.value);
  };

  const handleSelectSeat = (event: SelectChangeEvent) => {
    const selected = seats.find(
      (seat) => seat.id === parseInt(event.target.value)
    );
    dispatch(addSeat(selected));
  };

  const handleRemoveSeat = (seat: Seat) => {
    console.log("remove");
    dispatch(removeSeat(seat));
  };

  return (
    <Box sx={{ backgroundColor: "red", height: "100vh" }}>
      <PageHeader title="Booking" />
      <Box
        sx={{
          px: 2,
          py: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "white",
          height: "100%",

          "& .seats-container": {
            borderColor: "#f3f3f3",
          },
        }}
      >
        <FormControl fullWidth>
          <Typography>Select Date</Typography>
          <TextField type="date" size="medium" />
        </FormControl>

        <FormControl fullWidth>
          <Typography>Select Schedule</Typography>
          <Select
            size="medium"
            value={schedule}
            onChange={handleChangeSchedule}
            displayEmpty
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {schedules?.map((schedule: Schedule) => (
              <MenuItem value={schedule.id}>
                {` ${schedule.depature_station.name} - ${schedule.arrival_station.name} -
                ${schedule.depature_time}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <Typography>Select Seat(s)</Typography>
          <Select
            size="medium"
            onChange={handleSelectSeat}
            value=""
            displayEmpty
          >
            <MenuItem value="">
              <em>Select Seat</em>
            </MenuItem>
            {seats.map((seat: Seat) => (
              <MenuItem value={seat.id}>
                {seat.name} - {seat.classification?.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography>
          <strong>Note*:</strong> You can only select maximum of two tickets at
          a time
        </Typography>
        <fieldset className="seats-container">
          <legend>Selected Seats</legend>

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
              <RemoveCircle onClick={() => handleRemoveSeat(seat)} />
            </Box>
          ))}
          <Typography mt={2}>
            TOTAL: <strong>₦{totalPrice.toFixed(2)}</strong>
          </Typography>
        </fieldset>
        <Button
          sx={{ justifySelf: "flex-end" }}
          variant="contained"
          color="success"
          fullWidth
          size="large"
        >
          Proceed To Payment
        </Button>
      </Box>
    </Box>
  );
};

export default Booking;
