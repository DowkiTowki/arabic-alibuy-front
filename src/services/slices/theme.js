import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action) {
      const { payload } = action;
      state.theme = payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const getTheme = (state) => state.theme.theme;

export default themeSlice.reducer;