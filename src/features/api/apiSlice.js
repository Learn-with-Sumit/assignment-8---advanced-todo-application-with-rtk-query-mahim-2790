import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fake-server-for-lws.herokuapp.com",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ status, colors }) => {
        let queryString = "/todos";
        let colorsQ = "";
        let statusQ = "";
        if (status !== "all") {
          if (status === "complete") {
            statusQ += `completed_like=true&`;
          } else {
            statusQ += `completed_like=false&`;
          }
        }
        if (colors.length > 0) {
          colorsQ = colors?.map((color) => `color_like=${color}`).join("&");
        }
        queryString += `?${statusQ}${colorsQ}`;

        return queryString;
      },
      keepUnusedDataFor: 120,
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: { text: data, completed: false },
      }),
      invalidatesTags: ["Todos"],
    }),
    editTodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
