import { configureStore } from "@reduxjs/toolkit";
import sonsorsReducer from "../features/sensors/sensorsSlice";

export const store = configureStore({
  reducer: {
    sensors: sonsorsReducer,
  },
});
