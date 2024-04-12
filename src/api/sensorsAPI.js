import axios from "axios";

const API_URL = "http://localhost:3001";

export const fetchSensors = async () => {
  return await axios.get(`${API_URL}/sensors`);
};

export const addSensor = async (sensor) => {
  return await axios.post(`${API_URL}`, sensor);
};

export const deleteSensor = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const updateSensor = async (id, sensorData) => {
  return await axios.put(`${API_URL}/${id}`, sensorData);
};
