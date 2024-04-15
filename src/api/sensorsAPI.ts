import axios from "axios";

interface Sensor {
  id: string;
  name: string;
  type: string;
  location: string;
  status: string;
}

const API_URL = `http://localhost:3001`;

export const fetchSensors = async (): Promise<Sensor[]> => {
  const res = await axios.get<Sensor[]>(`${API_URL}/sensors`);
  return res.data;
};

export const addSensor = async (
  sensor: Omit<Sensor, "id">
): Promise<Sensor> => {
  const res = await axios.post<Sensor>(`${API_URL}/sensors`, sensor);
  return res.data;
};

export const deleteSensor = async (id: string): Promise<void> => {
  return await axios.delete(`${API_URL}/sensors/${id}`);
};

export const updateSensor = async (
  id: string,
  sensorData: Omit<Sensor, "id">
): Promise<Sensor> => {
  const res = await axios.put<Sensor>(`${API_URL}/sensors/${id}`, sensorData);
  return res.data;
};
