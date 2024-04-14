import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteSensorAsync,
  fetchSensors,
} from "../../../src/features/sensors/sensorsSlice";
import { Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import Alert from "../Alert/Alert";
import LoadingSpinner from "../../components/Alert/LoadingSpinner";

function SensorList() {
  const dispatch = useDispatch();

  const sensors = useSelector((state) => state.sensors.sensors);
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchSensors()).finally(() => setIsLoading(false));
  }, [dispatch]);

  const handleDelete = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteSensorAsync(selectedId))
      .then(() => {
        setAlertMessage("Sensor successfully deleted.");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        setIsLoading(true);
        dispatch(fetchSensors()).finally(() => setIsLoading(false));
      })
      .catch((error) => {
        setAlertMessage("Failed to delete the sensor.");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        console.error("Deletion failed:", error);
      });

    setModalOpen(false);
  };

  const handleEdit = (sensor) => {
    navigate(`/edit-sensor/${sensor.id}`, { state: { sensor } });
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <div className="p-12 bg-white">
        <div className="flex items-center justify-between p-4 bg-white">
          <button
            onClick={() => navigate("/add-sensor")}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add New Sensor
          </button>
        </div>

        {showAlert && (
          <Alert
            message={alertMessage}
            type={alertMessage.includes("successfully") ? "green" : "red"}
            onClose={() => setShowAlert(false)}
          />
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <table className="w-full text-xl text-left text-gray-500">
              <thead className="text-xl text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sensor Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sensors.map((sensor) => (
                  <tr
                    key={sensor.id}
                    className="bg-white border-b hover:bg-gray-50 "
                  >
                    <td className="px-6 py-6">{sensor.name}</td>
                    <td className="px-6 py-6">{sensor.type}</td>
                    <td className="px-6 py-6">{sensor.location}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            sensor.status === "active"
                              ? "bg-green-500"
                              : "bg-red-500"
                          } mr-2`}
                        ></span>
                        {sensor.status}
                      </div>
                    </td>
                    <td className="flex items-center justify-start px-6 py-4 space-x-4">
                      <button
                        onClick={() => handleEdit(sensor)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(sensor.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                <ConfirmationModal
                  isOpen={isModalOpen}
                  onClose={() => setModalOpen(false)}
                  onConfirm={confirmDelete}
                />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SensorList;
