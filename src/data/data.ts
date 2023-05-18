import { Schedule, Seat, Ticket } from "../types/types";

const seats: Seat[] = [
  {
    id: 1,
    is_booked: false,
    name: "A1",
    classification_id: 1,
    price: 2000.23,
    schedule_id: 1,
    classification: {
      name: "Business",
    },
  },
  {
    id: 2,
    is_booked: false,
    name: "A2",
    classification_id: 1,
    price: 3000.23,
    schedule_id: 1,
    classification: {
      name: "Economy",
    },
  },
  {
    id: 3,
    is_booked: false,
    name: "A3",
    classification_id: 1,
    price: 2000.23,
    schedule_id: 1,
    classification: {
      name: "Economy",
    },
  },
];

const schedules: Schedule[] = [
  {
    id: 1,
    seats: [
      {
        id: 1,
        is_booked: false,
        name: "A1",
        classification_id: 1,
        price: 2000.23,
        schedule_id: 1,
        classification: {
          name: "Business",
        },
      },
      {
        id: 2,
        is_booked: false,
        name: "A2",
        classification_id: 1,
        price: 3000.23,
        schedule_id: 1,
        classification: {
          name: "Economy",
        },
      },
      {
        id: 3,
        is_booked: false,
        name: "A3",
        classification_id: 1,
        price: 2000.23,
        schedule_id: 1,
        classification: {
          name: "Economy",
        },
      },
    ],
    is_open: true,
    depature_station: { id: 1, name: "Idu" },
    depature_station_id: 1,
    arrival_station: { id: 2, name: "Rigasa" },
    arrival_station_id: 2,
    departure_date: "04/07/23",
    arrival_date: "04/07/23",
    depature_time: "2.pm",
    arrival_time: "3.pm",
  },
];

const tickets: Ticket[] = [
  {
    id: 1,
    transaction_id: "32342323",
    reference_id: "342324323",
    user: {
      id: 1,
      name: "Muhammed Ladan",
      email: "mcarliey@gmail.com",
    },
    user_id: 1,
    seat: {
      id: 1,
      is_booked: false,
      name: "A1",
      classification_id: 1,
      price: 2000.23,
      schedule_id: 1,
      schedule: {
        id: 1,
        seats: [],
        is_open: true,
        depature_station: { id: 1, name: "Idu" },
        depature_station_id: 1,
        arrival_station: { id: 2, name: "Rigasa" },
        arrival_station_id: 2,
        departure_date: "04/07/23",
        arrival_date: "04/07/23",
        depature_time: "2.pm",
        arrival_time: "3.pm",
      },
      classification: {
        name: "Business",
      },
    },
    seat_id: 1,
  },
  {
    id: 2,
    transaction_id: "32342324",
    reference_id: "342324324",
    user: {
      id: 1,
      name: "Muhammed Ladan",
      email: "mcarliey@gmail.com",
    },
    user_id: 1,
    seat: {
      id: 2,
      is_booked: false,
      name: "A2",
      classification_id: 1,
      price: 3000.23,
      schedule_id: 1,
      schedule: {
        id: 1,
        seats: [],
        is_open: true,
        depature_station: { id: 1, name: "Idu" },
        depature_station_id: 1,
        arrival_station: { id: 2, name: "Rigasa" },
        arrival_station_id: 2,
        departure_date: "04/07/23",
        arrival_date: "04/07/23",
        depature_time: "2.pm",
        arrival_time: "3.pm",
      },
      classification: {
        name: "Economy",
      },
    },
    seat_id: 1,
  },
];

export { schedules, seats, tickets };
