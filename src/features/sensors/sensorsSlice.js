// Setting Up Redux-Toolkit for State Management

import { createSlice } from "@reduxjs/toolkit";

export const sensorsSlice = createSlice({
  name: "sensors",
  initialState: {
    sensors: [],
  },
  reducers: {
    addSensors: (state, action) => {
      state.sensors.push(action.payload);
    },
  },
});

export const { addSensor } = sensorsSlice.actions;

export default sensorsSlice.reducer;
