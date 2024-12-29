import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import UpdateTransportServices from "./UpdateTransportServices";

const AllTransportServices = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Fetch all room data
  const getAllRoomData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/transport-services/all",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
        `http://localhost:3000/transport-services/${airline_id}/delete`,
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
            <h5 className="card-title mb-0">
              All the Available Transports Services
            </h5>
          </div>
          {/* card body start */}
          <div className="card-body">
            <div className="table-responsive">
              <table className="table basic-border-table mb-0">
                <thead>
                  <tr>
                    {/*  transport service data */}
                    <th>Transport Services ID</th>
                    <th>Service Type</th>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                    <th>Price</th>
                    <th>Active</th>
                    {/* Transport Company data */}
                    <th>Transport Company ID</th>
                    <th>Company Name</th>
                    <th>Address</th>
                    <th>Company Type</th>
                    <th>Details</th>
                    <th>Is Partner?</th>
                    <th>Active</th>
                    {/*from City */}
                    <th>From City ID</th>
                    <th>From City Name</th>
                    <th>Country ID</th>
                    {/* to City */}
                    <th>To City ID</th>
                    <th>To City Name</th>
                    <th>County ID</th>
                    {/* action */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomData.length > 0 ? (
                    roomData.map((flight) => (
                      <tr key={flight.transport_service_id}>
                        <td>{flight.transport_service_id}</td>
                        <td>{flight.service_type}</td>
                        <td>
                          {new Date(flight.departure_time).toLocaleString()}
                        </td>
                        <td>
                          {new Date(flight.arrival_time).toLocaleString()}
                        </td>
                        <td>${flight.price}</td>
                        <td>{flight.active ? "Yes" : "No"}</td>
                        {/* Transport Company data */}
                        <td>{flight.transport_company.transport_company_id}</td>
                        <td>{flight.transport_company.company_name}</td>
                        <td>{flight.transport_company.address}</td>
                        <td>{flight.transport_company.company_type}</td>
                        <td>{flight.transport_company.details}</td>
                        <td>
                          {flight.transport_company.is_partner ? "Yes" : "No"}
                        </td>
                        <td>
                          {flight.transport_company.active ? "Yes" : "No"}
                        </td>
                        {/* From city */}
                        <td>{flight.from_city.city_id}</td>
                        <td>{flight.from_city.city_name}</td>
                        <td>{flight.from_city.country_id}</td>
                        {/* To city */}
                        <td>{flight.to_city.city_id}</td>
                        <td>{flight.to_city.city_name}</td>
                        <td>{flight.to_city.country_id}</td>
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
                            onClick={() =>
                              deleteAirline(flight.transport_service_id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="18" className="text-center">
                        No transport services available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div
              className="text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3"
              onClick={() => navigate("/transport-services-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Transport Services Page
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Transport Services</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRestaurant && (
            <UpdateTransportServices
              transportService={selectedRestaurant}
              getAllFlights={getAllRoomData}
              setShowModal={setShowModal}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AllTransportServices;
