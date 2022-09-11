import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colors: [],
  status: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleColor: (state, action) => {
      if (action.payload.status === "add") {
        state.colors.push(action.payload.color);
      } else if (action.payload.status === "remove") {
        state.colors = state.colors.filter(
          (color) => color !== action.payload.color
        );
      }
    },
    addType: (state, action) => {
      state.status = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { toggleColor, addType } = filterSlice.actions;
