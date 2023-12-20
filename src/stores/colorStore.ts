import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

export interface ColorState {
  alternativeColor: boolean;
}

const initialState: ColorState = {
  alternativeColor: false,
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    toggleColor: (state) => {
      state.alternativeColor = !state.alternativeColor;
    },
  },
});

export const { toggleColor } = colorSlice.actions;

const makeStore = () =>
  configureStore({
    reducer: {
      [colorSlice.name]: colorSlice.reducer,
    },
  });

export const wrapper = createWrapper(makeStore);
