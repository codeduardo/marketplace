import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "./features/sessionSlice";

export const store = configureStore({
  reducer: {
    sessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
