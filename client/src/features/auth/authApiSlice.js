import { baseApiSlice } from "../api/baseApiSlice";

//query  -  fetching data
//mutation  - manipulating and sending data back
export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = authApiSlice;
