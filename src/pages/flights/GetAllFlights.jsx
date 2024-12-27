import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import UpdateFligts from "./UpdateFligts";

const GetAllFlights = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Fetch all room data
  const getAllRoomData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/flights/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.is_success) {
        setRoomData(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle delete
  const deleteAirline = async (airline_id) => {
    console.log("Delete airline ID:", airline_id);
    try {
      const response = await axios.post(
        `http://localhost:3000/flights/${airline_id}/delete`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.is_success) {
        getAllRoomData();
        toast.success("Restaurant deleted successfully!");
      } else {
        toast.error(response.data.message || "Failed to delete restaurant.");
      }
    } catch (error) {
      console.error(
        "Error deleting room type:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message ||
          "An unexpected error occurred while deleting."
      );
    }
  };

  useEffect(() => {
    getAllRoomData();
  }, []);

  return (
    <div className="col-lg-6 w-100">
      <MasterLayout>
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">All the Available Flights</h5>
          </div>
          {/* card body start */}
          <div className="card-body">
            <div className="table-responsive">
              <table className="table basic-border-table mb-0">
                <thead>
                  <tr>
                    {/* 
                     <th>Airlines ID</th>
                    <th>Airlines Name</th>
                    <th>IATA Code</th>
                    <th>ICAO Code</th>
                    <th>Call Sign</th>
                    <th>Country</th>
                    <th>Flight ID</th>
                    <th>Flight Number</th>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                    <th>Price</th>
                    <th>Active</th>
                    <th>Actions</th>
                    */}
                    {/* flight data */}
                    <th>Flight ID</th>
                    <th>Flight Number</th>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                    <th>Price</th>
                    <th>Active</th>
                    {/* airline data */}
                    <th>Airlines ID</th>
                    <th>Airlines Name</th>
                    <th>IATA Code</th>
                    <th>ICAO Code</th>
                    <th>Call Sign</th>
                    {/* source_airport */}
                    <th>Source Airport ID</th>
                    <th>Airlines Name</th>
                    <th>IATA Code</th>
                    <th>ICAO Code</th>
                    <th>Time Zone</th>
                    {/* destination_airport */}
                    <th>Destination Airport ID</th>
                    <th>Airlines Name</th>
                    <th>IATA Code</th>
                    <th>ICAO Code</th>
                    <th>Time Zone</th>
                    {/* action */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomData.length > 0 ? (
                    roomData.map((flight) => (
                      <tr key={flight.flight_id}>
                        <td>{flight.flight_id}</td>
                        <td>{flight.flight_number}</td>
                        <td>
                          {new Date(flight.departure_time).toLocaleString()}
                        </td>
                        <td>
                          {new Date(flight.arrival_time).toLocaleString()}
                        </td>
                        <td>${flight.price}</td>
                        <td>{flight.active ? "Yes" : "No"}</td>
                        {/* airline data*/}
                        <td>{flight.airline.airline_id}</td>
                        <td>{flight.airline.airline_name}</td>
                        <td>{flight.airline.iata_code}</td>
                        <td>{flight.airline.icao_code}</td>
                        <td>{flight.airline.callsign}</td>
                        {/* source_airport */}
                        <td>{flight.source_airport.airport_id}</td>
                        <td>{flight.source_airport.airport_name}</td>
                        <td>{flight.source_airport.iata_code}</td>
                        <td>{flight.source_airport.icao_code}</td>
                        <td>{flight.source_airport.timezone}</td>
                        {/* destination_airport */}
                        <td>{flight.destination_airport.airport_id}</td>
                        <td>{flight.destination_airport.airport_name}</td>
                        <td>{flight.destination_airport.iata_code}</td>
                        <td>{flight.destination_airport.icao_code}</td>
                        <td>{flight.destination_airport.timezone}</td>
                        <td>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => {
                              setSelectedRestaurant(flight);
                              setShowModal(true);
                            }}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteAirline(flight.flight_id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center">
                        No flights available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div
              className="text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3"
              onClick={() => navigate("/flights-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Flights Page
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Airport</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRestaurant && (
            <UpdateFligts
              selectedFlight={selectedRestaurant}
              getAllFlights={getAllRoomData}
              setShowModal={setShowModal}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GetAllFlights;
