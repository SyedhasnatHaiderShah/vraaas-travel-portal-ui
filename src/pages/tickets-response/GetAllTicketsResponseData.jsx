import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import UpdateTicketsResponse from "./UpdateTicketsResponse";

const GetAllTicketsResponseData = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState([]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [restaurantData, setRestaurantData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch all room data
  const getAllRoomData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/ticket-responses",
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
  const deleteRestaurantHandle = async (response_id) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/ticket-responses/${response_id}/delete`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.is_success === true) {
        getAllRoomData();
        toast.success("Support ticket deleted successfully!");
      } else {
        toast.error(
          response.data.message || "Failed to delete Support Ticket."
        );
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

  // Handle update
  const updateRestaurant = async (updatedRestaurant) => {
    const { restaurant_id, ...rest } = updatedRestaurant;
    try {
      const response = await axios.post(
        `http://localhost:3000/restaurants/${restaurant_id}/update`,
        rest,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.is_success) {
        const updatedList = restaurantData.map((restaurant) =>
          restaurant.restaurant_id === updatedRestaurant.restaurant_id
            ? updatedRestaurant
            : restaurant
        );
        getAllRoomData();
        setRestaurantData(updatedList);
        setShowModal(false);
        toast.success("Restaurant updated successfully!");
      }
    } catch (error) {
      console.error("Error updating restaurant:", error.message);
    }
  };

  useEffect(() => {
    getAllRoomData();
  }, []);
  console.log("room data", roomData);

  return (
    <div className="col-lg-6 w-100">
      <MasterLayout>
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">
              All the available ticket responses
            </h5>
          </div>
          {/* card body start */}
          <div className="card-body">
            <div className="table-responsive">
              <table className="table basic-border-table mb-0">
                <thead>
                  <tr>
                    <th>Response ID</th>
                    <th>message</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    {/* ticket */}
                    <th>Ticket ID</th>
                    <th>Subject</th>
                    {/* responder */}
                    <th>User ID</th>
                    <th>Full Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomData.length > 0 ? (
                    roomData.map((room, index) => (
                      <tr key={index}>
                        <td>{room?.response_id}</td>
                        <td>{room?.message}</td>
                        <td>{new Date(room?.created_at).toLocaleString()}</td>
                        <td>{new Date(room?.updated_at).toLocaleString()}</td>
                        {/* ticket */}
                        <td>{room?.ticket?.ticket_id || "N/A"}</td>
                        <td>{room?.ticket?.subject || "N/A"}</td>
                        {/* User Data */}
                        <td>{room?.responder?.user_id || "N/A"}</td>
                        <td>{room?.responder?.full_name || "N/A"}</td>
                        {/* responder */}

                        {/* Actions */}
                        <td>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => {
                              // setSelectedRoom(room);
                              setSelectedBooking(room);
                              setShowModal(true);
                            }}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              deleteRestaurantHandle(room.response_id)
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
                        No tickets available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div
              className=" text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3 "
              onClick={() => navigate("/tickets-response-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Tickets Response Page
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>

      {/* Modal for Updating Room */}
      {/* Modal for Updating Restaurant */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Ticket Response</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <UpdateTicketsResponse
              updateData={selectedBooking}
              setShowModal={setShowModal}
              getAllRoomData={getAllRoomData}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GetAllTicketsResponseData;
