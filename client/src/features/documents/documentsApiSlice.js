import { baseApiSlice } from "../api/baseApiSlice";

export const documentsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMyDocs: builder.query({
      query: (page = 1) => `/document/all?page=${page}`,
      providesTags: ["Document"],
    }),
    createDoc: builder.mutation({
      query: (formData) => ({
        url: "/document/create",
        method: "POST",
        body: formData,
      }),
      invalidateTags: ["Document"],
    }),
    getSingleDoc: builder.query({
      query: (id) => `/document/${id}`,
      providesTags: ["Document"],
    }),
    updateDoc: builder.mutation({
      query: ({ id, ...otherFields }) => ({
        url: `/document/${id}`,
        method: "PATCH",
        body: otherFields,
      }),
      invalidatesTags: ["Document"],
    }),

    deleteDoc: builder.mutation({
      query: (id) => ({
        url: `/document/${id}`,
        method: "DELETE",
      }),
      invalidateTags: ["Document"],
    }),

    createPayment: builder.mutation({
      query: ({ id, ...otherFields }) => ({
        url: "/document/create",
        method: "PATCH",
        body: otherFields,
      }),
      invalidateTags: ["Document"],
    }),
  }),
});

export const {
  useGetAllMyDocsQuery,
  useCreateDocMutation,
  useGetSingleDocQuery,
  useUpdateDocMutation,
  useDeleteDocMutation,
  useCreatePaymentMutation,
} = documentsApiSlice;
