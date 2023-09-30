import { baseApiSlice } from "../api/baseApiSlice";

export const usersApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users/all",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providerTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({
                type: "User",
                id,
              })),

              {
                type: "User",
                id: "LIST",
              },
            ]
          : [{ type: "User", id: "List" }],
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApiSlice;
