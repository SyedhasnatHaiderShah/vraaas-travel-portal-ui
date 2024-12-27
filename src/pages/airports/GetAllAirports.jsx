import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import UpdateAirport from "./UpdateAirport";

const GetAllAirports = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Fetch all room data
  const getAllRoomData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/airports/all", {
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
  const deleteRestaurantHandle = async (airport_id) => {
    console.log("Delete Restaurant ID:", airport_id);
    try {
      const response = await axios.post(
        `http://localhost:3000/airports/${airport_id}/delete`,
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
            <h5 className="card-title mb-0">All the available room types</h5>
          </div>
          {/* card body start */}
          <div className="card-body">
            <div className="table-responsive">
              <table className="table basic-border-table mb-0">
                <thead>
                  <tr>
                    <th>Airports ID</th>
                    <th>Airports Name</th>
                    <th>IATA Code</th>
                    <th>ICAO Code</th>
                    <th>Time Zone</th>
                    <th>City ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomData.length > 0 ? (
                    roomData.map((room, index) => (
                      <tr key={index}>
                        <td>{room.airport_id}</td>
                        <td>{room.airport_name}</td>
                        <td>{room.iata_code}</td>
                        <td>{room.icao_code}</td>
                        <td>{room.timezone}</td>
                        <td>{room.city_id}</td>
                        <td>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => {
                              // setSelectedRoom(room);
                              setSelectedRestaurant(room);
                              setShowModal(true);
                            }}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              deleteRestaurantHandle(room.airport_id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No room type data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div
              className="text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3"
              onClick={() => navigate("/airports-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Airports Page
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
            <UpdateAirport
              selectedRestaurant={selectedRestaurant}
              getAllRoomData={getAllRoomData}
              setShowModal={setShowModal}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GetAllAirports;
