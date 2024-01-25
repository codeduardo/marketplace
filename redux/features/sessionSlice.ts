import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "session",
  initialState: null,
  reducers: {
    updateSession: (state, action) => {
      return { ...action.payload };
    },
  },
});
export const { updateSession } = sessionSlice.actions;
export default sessionSlice.reducer;
