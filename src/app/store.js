import { configureStore } from "@reduxjs/toolkit";
import sensorsReducer from "../../src/features/sensors/sensorsSlice";

export const store = configureStore({
  reducer: {
    sensors: sensorsReducer,
  },
});
