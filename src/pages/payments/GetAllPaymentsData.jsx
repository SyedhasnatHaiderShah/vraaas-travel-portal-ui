import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import UpdateBooking from "./UpdatePayments";
import UpdatePayments from "./UpdatePayments";

const GetAllPaymentsData = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState([]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [restaurantData, setRestaurantData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch all room data
  const getAllRoomData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/payments", {
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
  const deleteRestaurantHandle = async (payment_id) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/payments/${payment_id}/delete`,
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
            <h5 className="card-title mb-0">All the available payments</h5>
          </div>
          {/* card body start */}
          <div className="card-body">
            <div className="table-responsive">
              <table className="table basic-border-table mb-0">
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Amount</th>
                    <th>Payment Date</th>
                    <th>Payment Method</th>
                    <th>Status</th>
                    <th>Actions</th>
                    {/* user data */}
                    {/* <th>User ID</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Role</th>
                    <th>User Status</th>
                    */}
                  </tr>
                </thead>
                <tbody>
                  {roomData.length > 0 ? (
                    roomData.map((room, index) => (
                      <tr key={index}>
                        <td>{room.payment_id}</td>
                        <td>$ {room.amount}</td>
                        <td>{new Date(room.payment_date).toDateString()}</td>
                        <td>{room.payment_method}</td>
                        <td>{room.status}</td>
                        {/* customer data */}
                        {/* <td>{room.customer.user_id}</td>
                        <td>{room.customer.username}</td>
                        <td>{room.customer.full_name}</td>
                        <td>{room.customer.phone_number}</td>
                        <td>{room.customer.email}</td>
                        <td>{room.customer.country}</td>
                        <td>{room.customer.role}</td>
                        <td>{room.customer.status}</td> */}

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
                              deleteRestaurantHandle(room.payment_id)
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
                        No Payments data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div
              className="text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3"
              onClick={() => navigate("/payments-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Payments Page
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
          <Modal.Title>Update Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <UpdatePayments
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

export default GetAllPaymentsData;
