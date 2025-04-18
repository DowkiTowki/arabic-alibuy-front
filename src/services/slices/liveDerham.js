import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  liveDerham: 0,
};

const liveDerhamSlice = createSlice({
  name: "liveDerham",
  initialState,
  reducers: {
    setLiveDerham(state, action) {
      const { payload } = action;
      state.liveDerham = payload;
    },
  },
});

export const { setLiveDerham } = liveDerhamSlice.actions;

export const getLiveDerham = (state) => state.liveDerham.liveDerham;

export default liveDerhamSlice.reducer;