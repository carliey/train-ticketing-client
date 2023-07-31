import React, { useState, useMemo } from "react";
import PageHeader from "../../layout/PageHeader";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Stack,
  LinearProgress,
} from "@mui/material";

import { RemoveCircle } from "@mui/icons-material";
import { Schedule, Seat } from "../../types/types";
import { useAppDispatch } from "../../redux/store";
import {
  addSeat,
  removeSeat,
  selectSelectedSeats,
  selectTotalPrice,
} from "./bookingSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetScheduleSeatsQuery,
  useGetSchedulesByDateQuery,
} from "./ticketsApiSlice";

type Props = {};

const Booking = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedSeats = useSelector(selectSelectedSeats);
  const totalPrice = useSelector(selectTotalPrice);
  const [selectedScheduleId, setSelectedScheduleId] = React.useState("");
  const [selectedDate, setSelectedDate] = useState("");

  console.log("date", selectedDate);

  const { data: schedulesRes, isFetching: isLoadingSchedules } =
    useGetSchedulesByDateQuery(
      { depature_date: selectedDate },
      { skip: !selectedDate }
    );
  const schedules = useMemo(() => {
    return schedulesRes ? schedulesRes.data : [];
  }, [schedulesRes]);

  const { data: seatsRes, isFetching: isLoadingSeats } =
    useGetScheduleSeatsQuery(
      { schedule_id: parseInt(selectedScheduleId) },
      { skip: !selectedScheduleId }
    );

  const seats = useMemo(() => {
    return seatsRes ? seatsRes.data : [];
  }, [seatsRes]);

  console.log("schedule loading", isLoadingSchedules);
  console.log("schedules", schedulesRes);
  console.log("seats", seatsRes);

  const handleChangeSchedule = (event: SelectChangeEvent) => {
    setSelectedScheduleId(event.target.value);
  };

  const handleSelectSeat = (event: SelectChangeEvent) => {
    const selected = seats.find(
      (seat: Seat) => seat.id === parseInt(event.target.value)
    );
    if (selectedSeats.length === 2) {
      alert("You can only select a maximun of two tickets");
    } else {
      dispatch(addSeat(selected));
    }
  };

  const handleRemoveSeat = (seat: Seat) => {
    console.log("remove");
    dispatch(removeSeat(seat));
  };

  return (
    <>
      <PageHeader title="Booking" />
      <Box
        sx={{
          p: 2,
          "& .seats-container": {
            borderColor: "#f3f3f3",
          },
          "& > *": {
            mb: 2,
          },
        }}
      >
        <FormControl fullWidth sx={{ mt: 2 }}>
          <Typography>Select Date</Typography>
          <TextField
            type="date"
            size="medium"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <Typography>Select Schedule</Typography>
          {isLoadingSchedules && <LinearProgress />}
          <Select
            size="medium"
            value={selectedScheduleId}
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
        <FormControl fullWidth sx={{ mt: 2 }}>
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
        <Typography sx={{ mt: 2 }}>
          <strong>Note*:</strong> You can only select maximum of two tickets at
          a time
        </Typography>
        <fieldset className="seats-container" style={{ marginTop: "10px" }}>
          <legend>Selected Seats</legend>

          {selectedSeats?.map((seat: Seat) => (
            <Box
              boxShadow={2}
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                display: "flex",
                p: 1.5,
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
          onClick={() =>
            navigate("/payment", {
              state: {
                schedule: schedules?.find(
                  (item: Schedule) => item.id === parseInt(selectedScheduleId)
                ),
              },
            })
          }
        >
          Proceed To Payment
        </Button>
      </Stack>
    </>
  );
};

export default Booking;
