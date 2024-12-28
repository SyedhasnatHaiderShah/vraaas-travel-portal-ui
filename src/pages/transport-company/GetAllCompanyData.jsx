import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import UpdateCompany from "./UpdateCompany";

const GetAllCompanyData = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [restaurantData, setRestaurantData] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  console.log("selectedRestaurant", selectedRestaurant);

  // Fetch all room data
  const getAllCompanies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/transport-companies/all",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.is_success) {
        setCompanyData(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle delete
  const deleteRestaurantHandle = async (restaurant_id) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/transport-companies/${restaurant_id}/delete`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.is_success) {
        getAllCompanies();
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
        getAllCompanies();
        setRestaurantData(updatedList);
        setShowModal(false);
        toast.success("Restaurant updated successfully!");
      }
    } catch (error) {
      console.error("Error updating restaurant:", error.message);
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  return (
    <div className="col-lg-6 w-100">
      <MasterLayout>
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">
              All the available Transport Companies
            </h5>
          </div>
          {/* card body start */}
          <div className="card-body">
            <div className="table-responsive">
              <table className="table basic-border-table mb-0">
                <thead>
                  <tr>
                    <th>Company ID</th>
                    <th>Company Name</th>
                    <th>Address</th>
                    <th>Company Type</th>
                    <th>Details</th>
                    <th>City</th>
                    <th>City ID</th>
                    <th>Country</th>
                    <th>Is Partner?</th>
                    <th>Is Active?</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companyData.length > 0 ? (
                    companyData.map((room, index) => (
                      <tr key={index}>
                        <td>{room.transport_company_id}</td>
                        <td>{room.company_name}</td>
                        <td>{room.address}</td>
                        <td>{room.company_type}</td>
                        <td>{room.details}</td>
                        <td>{room.city ? room.city.city_name : "N/A"}</td>
                        <td>{room.city ? room.city.city_id : "N/A"}</td>
                        <td>{room.city ? room.city.country_id : "N/A"}</td>
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
                              deleteRestaurantHandle(room.transport_company_id)
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
              className=" text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3 "
              onClick={() => navigate("/transport-company-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Transport Company Page
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
          <Modal.Title>Update Transport Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRestaurant && (
            <UpdateCompany selectedRestaurant={selectedRestaurant} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GetAllCompanyData;
