import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
    }),
    
    getOrderDetails: builder.query({
      query: (id) => `/orders/${id}`,
    }),

    getMyOrders: builder.query({
      query: () => "/orders/mine",
    }),

  }),
});

export const { useCreateOrderMutation } = orderApiSlice;
