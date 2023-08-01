import { apiSlice } from "../../redux/apiSlice";

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Tickets", "Seats", "Classifications", "Stations", "Schedules"],
});

export const ticketsApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getClassifications: builder.query<any, void>({
      query: () => `/api/classifications`,
      providesTags: ["Classifications"],
    }),
    getStations: builder.query<any, void>({
      query: () => `/api/stations`,
      providesTags: ["Stations"],
    }),
    getSchedules: builder.query<any, void>({
      query: () => `/api/schedules`,
      providesTags: ["Schedules"],
    }),
    getSchedulesByDate: builder.query<any, { depature_date: string }>({
      query: (params) =>
        `/api/schedules/date?depature_date=${params.depature_date}`,
      providesTags: ["Schedules", "Tickets", "Seats"],
    }),
    getScheduleSeats: builder.query<any, { schedule_id: number }>({
      // returns only available seats
      query: (params) =>
        `/api/seats/schedule?schedule_id=${params.schedule_id}`,
      providesTags: ["Seats", "Schedules"],
    }),
    getMyTickets: builder.query<any, void>({
      query: () => `/api/tickets/mine`,
      providesTags: ["Tickets"],
    }),

    // getCoaches: builder.query<any, void>({
    //   query: () => `/api/profile`,
    //   providesTags: ["Profile"],
    // }),

    createSeat: builder.mutation<
      any,
      {
        name: string;
        price: number;
        is_booked: boolean;
        schedule_id: number;
        classification_id: number;
      }
    >({
      query: (values) => ({
        url: "/api/seats/create",
        method: "Post",
        body: { ...values },
      }),
      invalidatesTags: ["Seats", "Schedules"],
    }),

    saveTicket: builder.mutation<
      any,
      {
        user_id: number;
        seat_id: number;
        reference_id: string;
        transaction_id: string;
      }
    >({
      query: (values) => ({
        url: "/api/tickets/create",
        method: "Post",
        body: { ...values },
      }),
      invalidatesTags: ["Schedules", "Tickets", "Seats"],
    }),
  }),
});

export const {
  useCreateSeatMutation,
  useGetClassificationsQuery,
  useGetMyTicketsQuery,
  useGetSchedulesByDateQuery,
  useGetScheduleSeatsQuery,
  useGetSchedulesQuery,
  useGetStationsQuery,
  useSaveTicketMutation,
} = ticketsApiSlice;
