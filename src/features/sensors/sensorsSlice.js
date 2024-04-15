import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as sensorsAPI from "../../api/sensorsAPI";

const initialState = {
  sensors: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// **** Async Thunks: Asynchronous logic, dispatching actions that reducers can respond to once the async operations are completed.

// **** State Updates in Reducers: When these thunks are dispatched, they transition through several states (pending, fulfilled, rejected). I handle these states in the slice’s reducers to update the application state accordingly.

export const fetchSensors = createAsyncThunk(
  "sensors/fetchSensors",
  async () => {
    const res = await sensorsAPI.fetchSensors();
    return res.data;
  }
);

export const addSensorAsync = createAsyncThunk(
  "sensors/addSensor",
  async (sensor) => {
    const res = await sensorsAPI.addSensor(sensor);
    return res.data;
  }
);

export const deleteSensorAsync = createAsyncThunk(
  "sensors/deleteSensor",
  async (sensorId) => {
    await sensorsAPI.deleteSensor(sensorId);
  }
);

export const updateSensorAsync = createAsyncThunk(
  "sensors/updateSensor",
  async ({ sensorId, sensor }) => {
    const res = await sensorsAPI.updateSensor(sensorId, sensor);
    return res.data;
  }
);

const sensorsSlice = createSlice({
  name: "sensors",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSensors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSensors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sensors = action.payload;
      })
      .addCase(fetchSensors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addSensorAsync.fulfilled, (state, action) => {
        state.sensors.push(action.payload);
      })
      .addCase(deleteSensorAsync.fulfilled, (state, action) => {
        state.sensors = state.sensors.filter(
          (sensor) => sensor.id !== action.payload
        );
      })
      .addCase(updateSensorAsync.fulfilled, (state, action) => {
        const index = state.sensors.findIndex(
          (sensor) => sensor.id === action.payload.id
        );

        // If the sensor is found (index !== -1), it updates that specific sensor with the new data (action.payload) returned from the server (db).
        if (index !== -1) {
          state.sensors[index] = action.payload;
        }
      });
  },
});

export default sensorsSlice.reducer;
