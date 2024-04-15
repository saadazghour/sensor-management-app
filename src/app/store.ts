import { configureStore } from "@reduxjs/toolkit";
import sensorsReducer from "../../src/features/sensors/sensorsSlice";

export const store = configureStore({
  reducer: {
    sensors: sensorsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
