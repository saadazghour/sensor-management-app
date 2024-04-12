import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSensors } from "../../../src/features/sensors/sensorsSlice";
import { Table } from "flowbite-react";

function SensorList() {
  const dispatch = useDispatch();
  const sensors = useSelector((state) => state.sensors.sensors);

  useEffect(() => {
    dispatch(fetchSensors());
  }, [dispatch]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="p-4 bg-white">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
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
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor) => (
              <tr
                key={sensor.id}
                className="bg-white border-b hover:bg-gray-50 "
              >
                <td className="px-6 py-4">{sensor.name}</td>
                <td className="px-6 py-4">{sensor.type}</td>
                <td className="px-6 py-4">{sensor.location}</td>
                <td className="px-6 py-4">{sensor.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SensorList;
