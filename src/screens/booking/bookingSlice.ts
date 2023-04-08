import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { seats } from "../../data/data";
import { RootState } from "../../redux/store";
import { Seat, Ticket } from "../../types/types";

const initialState: Seat[] = [];

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addSeat: (state, action: PayloadAction<any>) => {
      const seat = action.payload;
      if (!state.find((item) => item.id === seat.id)) {
        state.push(seat);
      }
    },
    removeSeat: (state, action: PayloadAction<any>) => {
      const seat = action.payload;

      return state.filter((item) => item.id !== seat.id);
    },
  },
});

export const { addSeat, removeSeat } = bookingSlice.actions;
export const bookingReducer = bookingSlice.reducer;

export const selectSelectedSeats = (state: RootState) => state.selectedSeats;

export const selectTotalPrice = (state: RootState) =>
  state.selectedSeats.reduce((acc, item) => acc + item.price, 0);
