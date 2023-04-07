export interface User {
  id: any;
  name: string;
  email: string;
  gender?: string;
  phone?: number;
  image?: string;
  tickets?: Ticket[];
}

export interface Classification {
  id?: number;
  name: string;
  seats?: Seat[];
}

export interface Station {
  id: number;
  name: string;
  arrivals: Schedule[];
  depatures: Schedule[];
}

export interface Schedule {
  id: number;
  seats: Seat[];
  is_open: Boolean;
  depature_station: Station;
  depature_station_id: number;
  arrival_station: Station;
  arrival_station_id: number;
  departure_date: string;
  arrival_date: string;
  depature_time: string;
  arrival_time: string;
}
export interface Seat {
  id: number;
  name: string;
  price: DoubleRange;
  classification: Classification;
  classification_id: number;
  schedule: Schedule;
  is_booked: Boolean;
  ticket?: Ticket;
}
export interface Ticket {
  id: number;
  transaction_id: string;
  reference_id: string;
  user: User;
  user_id: number;
  seat: Seat;
  seat_id: number;
}
