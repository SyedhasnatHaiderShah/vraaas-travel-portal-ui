import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import UpdateBooking from "./UpdateSupportTickets";
import UpdateSupportTickets from "./UpdateSupportTickets";

const GetAllSupportTicketsData = () => {
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
        "http://localhost:3000/support-tickets",
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
  const deleteRestaurantHandle = async (ticket_id) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/support-tickets/${ticket_id}/delete`,
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
              All the available support tickets
            </h5>
          </div>
          {/* card body start */}
          <div className="card-body">
            <div className="table-responsive">
              <table className="table basic-border-table mb-0">
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Subjects</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    {/* user data */}
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Role</th>
                    <th>User Status</th>
                    {/* category */}
                    <th>Category ID</th>
                    <th>Category Name</th>
                    {/* responses */}
                    <th>Responses</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomData.length > 0 ? (
                    roomData.map((room, index) => (
                      <tr key={index}>
                        <td>{room?.ticket_id}</td>
                        <td>{room?.subject}</td>
                        <td>{room?.description}</td>
                        <td>{room?.status}</td>
                        <td>{room?.priority}</td>
                        <td>{new Date(room?.created_at).toLocaleString()}</td>
                        <td>{new Date(room?.updated_at).toLocaleString()}</td>
                        {/* User Data */}
                        <td>{room?.user?.user_id || "N/A"}</td>
                        <td>{room?.user?.username || "N/A"}</td>
                        <td>{room?.user?.full_name || "N/A"}</td>
                        <td>{room?.user?.phone_number || "N/A"}</td>
                        <td>{room?.user?.email || "N/A"}</td>
                        <td>{room?.user?.country || "N/A"}</td>
                        <td>{room?.user?.role || "N/A"}</td>
                        <td>{room?.user?.status || "N/A"}</td>

                        {/* Category Data */}
                        <td>{room?.category?.category_id || "N/A"}</td>
                        <td>{room?.category?.name || "N/A"}</td>

                        {/* Responses */}
                        <td>
                          {room?.responses?.length > 0 ? (
                            room.responses.map((response) => (
                              <div key={response.response_id}>
                                <p>{response.message}</p>
                              </div>
                            ))
                          ) : (
                            <span>No responses</span>
                          )}
                        </td>

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
                              deleteRestaurantHandle(room.ticket_id)
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
              className="text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3"
              onClick={() => navigate("/support-tickets-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Support Ticket Page
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
          <Modal.Title>Update Support Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <UpdateSupportTickets
              supportTicketData={selectedBooking}
              setShowModal={setShowModal}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GetAllSupportTicketsData;
