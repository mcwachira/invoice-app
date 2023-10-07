import { baseApiSlice } from "../api/baseApiSlice";

export const customerApiSlice = baseApiSlice.injectEndPoints({
  endpoints: (builder) => ({
    getAllUserCustomers: builder.query({
      query: (page = 1) => `/customer/a;;?page=${page}`,
      providesTags: ["Customer"],
    }),
    createCustomer: builder.mutation({
      query: (customerInfo) => ({
        url: "/customer/create",
        method: "POST",
        body: customerInfo,
      }),
      invalidateTags: ["Customer"],
    }),
    getSingleCustomer: builder.query({
      query: (custId) => `/customer/${custId}`,
      providesTags: ["Customer"],
    }),
    updateCustomerInfo: builder.mutation({
      query: ({ id, ...otherFields }) => ({
        url: `/customer/${id}`,
        method: "PATCH",
        body: otherFields,
      }),
      invalidatesTags: ["Customer"],
    }),

    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customer/${id}`,
        method: "DELETE",
      }),
      invalidateTags: ["Customer"],
    }),
  }),
});

export const {
  useGetAllUserCustomersQuery,
  useCreateCustomerMutation,
  useGetSingleCustomerQuery,
  useDeleteCustomerMutation,
} = customerApiSlice;
