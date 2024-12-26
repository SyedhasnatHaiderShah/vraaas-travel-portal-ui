import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const HotelTableAllData = () => {
  const [hotelData, setHotelData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all hotel data
  const getAllHotelData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hotels/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.is_success) {
        setHotelData(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle delete
  const deleteHotel = async (id) => {
    console.log(localStorage.getItem("token"));
    try {
      const response = await axios.post(
        `http://localhost:3000/hotels/${id}/delete`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.is_success) {
        setHotelData(hotelData.filter((hotel) => hotel.hotel_id !== id));
        toast.success("Hotel deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting hotel:", error.message);
    }
  };

  // Handle update
  const updateHotel = async (updatedHotel) => {
    const { hotel_id, ...rest } = updatedHotel;
    try {
      const response = await axios.post(
        `http://localhost:3000/hotels/${hotel_id}/update`,
        rest,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.is_success) {
        const updatedList = hotelData.map((hotel) =>
          hotel.hotel_id === updatedHotel.hotel_id ? updatedHotel : hotel
        );
        setHotelData(updatedList);
        toast.success("Hotel updated successfully!");
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating hotel:", error.message);
    }
  };

  useEffect(() => {
    getAllHotelData();
  }, []);

  return (
    <div className="col-lg-6 w-100">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">All the available hotels list</h5>
        </div>
        {/* card body start */}
        <div className="card-body">
          <div className=" p-3">
            <h2 className="card-title mb-0">Hotels can be update or delete</h2>
          </div>

          <div className="table-responsive">
            <table className="table basic-border-table mb-0">
              <thead>
                <tr>
                  <th>Hotel ID</th>
                  <th>Hotel Name</th>
                  <th>Hotel Details</th>
                  <th>Hotel Address</th>
                  <th>Is Partner?</th>
                  <th>Is Active?</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotelData.length > 0 ? (
                  hotelData.map((hotel, index) => (
                    <tr key={index}>
                      <td>{hotel.hotel_id}</td>
                      <td>{hotel.hotel_name}</td>
                      <td>{hotel.details}</td>
                      <td>{hotel.address}</td>
                      <td>{hotel.is_partner ? "Yes" : "No"}</td>
                      <td>{hotel.active ? "Yes" : "No"}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => {
                            setSelectedHotel(hotel);
                            setShowModal(true);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteHotel(hotel.hotel_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No hotel data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Updating Hotel */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedHotel && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedHotel = {
                  ...selectedHotel,
                  hotel_name: e.target.hotel_name.value,
                  details: e.target.details.value,
                  address: e.target.address.value,
                  is_partner: e.target.is_partner.checked,
                  active: e.target.active.checked,
                };
                updateHotel(updatedHotel);
              }}
            >
              <div className="mb-3">
                <label className="form-label">Hotel Name</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={selectedHotel.hotel_name}
                  name="hotel_name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Details</label>
                <textarea
                  className="form-control"
                  defaultValue={selectedHotel.details}
                  name="details"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={selectedHotel.address}
                  name="address"
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  defaultChecked={selectedHotel.is_partner}
                  name="is_partner"
                />
                <label className="form-check-label">Is Partner</label>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  defaultChecked={selectedHotel.active}
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

export default HotelTableAllData;
