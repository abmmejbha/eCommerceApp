import { apiSlice } from "./apiSlice";
import { ORDER_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
    }),

    getOrderDetails: builder.query({
      query: (id) => `${ORDER_URL}/${id}`,
    }),

    getMyOrders: builder.query({
      query: () => `${ORDER_URL}/mine`,
    }),

    getOrders: builder.query({
      query: () => ORDER_URL,
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
} = orderApiSlice;
