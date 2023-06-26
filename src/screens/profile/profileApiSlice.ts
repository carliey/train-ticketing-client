import { apiSlice } from "../../redux/apiSlice";
import { User } from "../../types/types";

const apiSliceWithTags = apiSlice.enhanceEndpoints({
  addTagTypes: ["Profile"],
});

export const profileApiSlice = apiSliceWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: () => `/api/profile`,
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation({
      query: (values) => ({
        url: "/api/profile/update",
        method: "PUT",
        body: { ...values },
      }),
      invalidatesTags: ["Profile"],
    }),

    updatePassword: builder.mutation({
      query: (values) => ({
        url: "/api/profile/update-password",
        method: "PUT",
        body: { ...values },
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = profileApiSlice;
