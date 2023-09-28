import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/v1",
  credentials: "include",

  //inject auth headers
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.user?.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery,

  //injecting end points for code spliting purposes
  endpoints: (builder) => ({}),
});
