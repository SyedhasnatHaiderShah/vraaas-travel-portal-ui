import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const GetAllRestaurantsData = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [restaurantData, setRestaurantData] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Fetch all room data
  const getAllRoomData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/restaurants/all",
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
  const deleteRestaurantHandle = async (restaurant_id) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/restaurants/${restaurant_id}/delete`,
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
                    <th>Restaurants ID</th>
                    <th>Restaurants Name</th>
                    <th>Address</th>
                    <th>Cuisine Type</th>
                    <th>Details</th>
                    <th>Is Partner?</th>
                    <th>Is Active?</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomData.length > 0 ? (
                    roomData.map((room, index) => (
                      <tr key={index}>
                        <td>{room.restaurant_id}</td>
                        <td>{room.restaurant_name}</td>
                        <td>{room.address}</td>
                        <td>{room.cuisine_type}</td>
                        <td>{room.details}</td>
                        <td
                          style={{
                            color: room.is_partner ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {room.is_partner ? "Yes" : "No"}
                        </td>
                        <td
                          style={{
                            color: room.active ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {room.active ? "Yes" : "No"}
                        </td>
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
                              deleteRestaurantHandle(room.restaurant_id)
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
              onClick={() => navigate("/restaurants-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Restaurant Page
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
          <Modal.Title>Update Restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRestaurant && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedRestaurant = {
                  ...selectedRestaurant,
                  restaurant_name: e.target.restaurant_name.value,
                  address: e.target.address.value,
                  cuisine_type: e.target.cuisine_type.value,
                  details: e.target.details.value,
                  is_partner: e.target.is_partner.checked,
                  active: e.target.active.checked,
                };
                updateRestaurant(updatedRestaurant);
              }}
            >
              <div className="mb-3">
                <label className="form-label">Restaurant Name</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={selectedRestaurant.restaurant_name}
                  name="restaurant_name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={selectedRestaurant.address}
                  name="address"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cuisine Type</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={selectedRestaurant.cuisine_type}
                  name="cuisine_type"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Details</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={selectedRestaurant.details}
                  name="details"
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  defaultChecked={selectedRestaurant.is_partner}
                  name="is_partner"
                />
                <label className="form-check-label">Is Partner</label>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  defaultChecked={selectedRestaurant.active}
                  name="active"
                />
                <label className="form-check-label">Is Active</label>
              </div>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GetAllRestaurantsData;
