import { Schedule, Seat } from "../types/types";

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

export { schedules, seats };
