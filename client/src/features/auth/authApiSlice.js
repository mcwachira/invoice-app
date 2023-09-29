import { baseApiSlice } from "../api/baseApiSlice";
import { logOut } from "./authSlice";

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

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logoutUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/logout",
        method: "GET",
      }),

      //whenever logout is called in any component we dispatch logout reducer and reset the api
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(logOut());
          dispatch(baseApiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),

    resendVerifyEmail: builder.mutation({
      query: (userEmail) => ({
        url: "/auth/resend_email_token",
        method: "POST",
        body: userEmail,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useResendVerifyEmailMutation,
} = authApiSlice;
