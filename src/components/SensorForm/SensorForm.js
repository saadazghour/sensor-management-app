import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  fetchSensors,
  addSensor,
  deleteSensor,
  updateSensor,
} from "../../api/sensorsAPI";
import {
  addSensorAsync,
  updateSensorAsync,
} from "../../features/sensors/sensorsSlice";
import Alert from "../Alert/Alert";

const SensorForm = () => {
  const { id } = useParams();

  const sensor = useSelector((state) =>
    state.sensors.sensors.find((s) => s.id === id)
  );

  const [sensorData, setSensorData] = useState({
    id: sensor?.id || uuidv4(),
    name: sensor?.name || "",
    type: sensor?.type || "",
    status: sensor?.status || "",
    location: sensor?.location || "",
  });

  const [status, setStatus] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && sensor) {
      setSensorData({
        id: sensor.id,
        name: sensor.name,
        type: sensor.type,
        status: sensor.status,
        location: sensor.location,
      });
    }
  }, [id, sensor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSensorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseAlert = () => setShowAlert(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = id
      ? updateSensorAsync({ sensorId: id, sensor: sensorData })
      : addSensorAsync(sensorData);

    dispatch(action)
      .then(() => {
        // After submission, the form fields are cleared.
        setSensorData({ name: "", type: "", location: "", status: "" });
        setAlertMessage(
          `Sensor has been ${sensor ? "Updated" : "Added"} successfully!`
        );
        setShowAlert(true);
        setTimeout(() => navigate("/"), 3000); // navigate after showing alert
      })
      .catch((error) => {
        setAlertMessage("Failed to update the sensor.");
        setShowAlert(false);
        console.error("Error submitting sensor:", error);
      });
  };
  return (
    <form className="max-w-lg mx-auto my-44" onSubmit={handleSubmit}>
      <div className="px-4 py-4">
        {showAlert && (
          <Alert
            message={alertMessage}
            onClose={handleCloseAlert}
            type={showAlert ? "green" : "red"}
          />
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Sensor Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={sensorData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="type"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Type
        </label>
        <input
          type="text"
          id="type"
          name="type"
          value={sensorData.type}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="location"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={sensorData.location}
          onChange={handleChange}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="status"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={sensorData.status}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={handleChange}
          required
        >
          <option value="">Please select a status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        {sensor ? "Update Sensor" : " Add New Sensor"}
      </button>
    </form>
  );
};

export default SensorForm;
