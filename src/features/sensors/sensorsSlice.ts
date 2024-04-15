import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as sensorsAPI from "../../api/sensorsAPI";

export interface Sensor {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
}

interface SensorsState {
  sensors: Sensor[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SensorsState = {
  sensors: [],
  status: "idle",
  error: null,
};

// **** Async Thunks: Asynchronous logic, dispatching actions that reducers can respond to once the async operations are completed.

// **** State Updates in Reducers: When these thunks are dispatched, they transition through several states (pending, fulfilled, rejected). I handle these states in the slice’s reducers to update the application state accordingly.

export const fetchSensors = createAsyncThunk<Sensor[]>(
  "sensors/fetchSensors",
  async () => {
    return await sensorsAPI.fetchSensors();
  }
);

export const addSensorAsync = createAsyncThunk<Sensor, Omit<Sensor, "id">>(
  "sensors/addSensor",
  async (sensor) => {
    return await sensorsAPI.addSensor(sensor);
  }
);

export const deleteSensorAsync = createAsyncThunk<string, string>(
  "sensors/deleteSensor",
  async (sensorId) => {
    await sensorsAPI.deleteSensor(sensorId);
    return sensorId;
  }
);

export const updateSensorAsync = createAsyncThunk<
  Sensor,
  { sensorId: Sensor["id"]; sensorData: Omit<Sensor, "id"> }
>("sensors/updateSensor", async ({ sensorId, sensorData }) => {
  return await sensorsAPI.updateSensor(sensorId, sensorData);
});

const sensorsSlice = createSlice({
  name: "sensors",
  initialState,
  reducers: {
    // Reducers for synchronous actions.
    addSensors: (state, action: PayloadAction<Sensor>) => {
      state.sensors.push(action.payload);
    },
    removeSensor: (state, action: PayloadAction<Sensor["id"]>) => {
      state.sensors = state.sensors.filter(
        (sensor) => sensor.id !== action.payload
      );
    },
    updateSensor: (state, action: PayloadAction<Sensor>) => {
      const index = state.sensors.findIndex(
        (sensor) => sensor.id === action.payload.id
      );

      // If the sensor is found (index !== -1), it updates that specific sensor with the new data (action.payload) returned from the server (db).
      if (index !== -1) {
        state.sensors[index] = { ...state.sensors[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSensors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSensors.fulfilled,
        (state, action: PayloadAction<Sensor[]>) => {
          state.status = "succeeded";
          state.sensors = action.payload;
        }
      )
      .addCase(fetchSensors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null; // Default to null if message is undefined
      })
      .addCase(
        addSensorAsync.fulfilled,
        (state, action: PayloadAction<Sensor>) => {
          state.sensors.push(action.payload);
        }
      )
      .addCase(
        deleteSensorAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.sensors = state.sensors.filter(
            (sensor) => sensor.id !== action.payload
          );
        }
      )
      .addCase(
        updateSensorAsync.fulfilled,
        (state, action: PayloadAction<Sensor>) => {
          const index = state.sensors.findIndex(
            (sensor) => sensor.id === action.payload.id
          );

          // If the sensor is found (index !== -1), it updates that specific sensor with the new data (action.payload) returned from the server (db).
          if (index !== -1) {
            state.sensors[index] = action.payload;
          }
        }
      );
  },
});

export const { addSensors, removeSensor, updateSensor } = sensorsSlice.actions;
export default sensorsSlice.reducer;
