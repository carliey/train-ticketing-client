import PageHeader from "../../layout/PageHeader";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Schedule, Seat } from "../../types/types";
import { useAppDispatch } from "../../redux/store";
import { selectSelectedSeats, selectTotalPrice } from "./bookingSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import { selectCurrentUser } from "../auth/authSlice";

type Props = {};
interface CustomizedState {
  schedule: Schedule;
}

const Payment = (props: Props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  const { schedule } = state;
  const user = useSelector(selectCurrentUser);
  const selectedSeats = useSelector(selectSelectedSeats);
  const totalPrice = useSelector(selectTotalPrice);

  const config = {
    reference: new Date().getTime().toString(),
    email: user.email || "email@example.com",
    amount: totalPrice * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC || "examplepublickey",
  };

  // you can call this function anything
  const onSuccess = async () => {
    //store the ticket in the database
    console.log("reference");
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    alert("transaction closed");
  };

  const initializePayment = usePaystackPayment(config);

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
                backgroundColor: "primary.main",
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
          fullWidth
          size="large"
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          Make Payment
        </Button>
      </Stack>
    </>
  );
};

export default Payment;
