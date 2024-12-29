import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const RoomTableAllData = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all room data
  const getAllRoomData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/room-types", {
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
  const deleteRoom = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/room-types/${id}/delete`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.is_success) {
        setRoomData(roomData.filter((room) => room.room_type_id !== id));
        toast.success("Room type deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting room type:", error.message);
    }
  };

  // Handle update
  const updateRoom = async (updatedRoom) => {
    const { room_type_id, type_name, ...rest } = updatedRoom;
    try {
      const response = await axios.post(
        `http://localhost:3000/room-types/${room_type_id}/update`,
        rest,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.is_success) {
        const updatedList = roomData.map((room) =>
          room.room_type_id === updatedRoom.room_type_id ? updatedRoom : room
        );
        setRoomData(updatedList);
        setShowModal(false);
        toast.success("Room type updated successfully!");
      }
    } catch (error) {
      console.error("Error updating room type:", error.message);
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
                    <th>ID</th>
                    <th>Room Type Name</th>
                    <th>Room Type Description</th>
                    <th>Is Active?</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roomData.length > 0 ? (
                    roomData.map((room, index) => (
                      <tr key={index}>
                        <td>{room.room_type_id}</td>
                        <td>{room.type_name}</td>
                        <td>{room.description}</td>
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
                            className="btn  btn-sm me-2"
                            onClick={() => {
                              setSelectedRoom(room);
                              setShowModal(true);
                            }}
                            style={{ backgroundColor: "#57bcce" }}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteRoom(room.room_type_id)}
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
              onClick={() => navigate("/room-type")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Room Type Page
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>

      {/* Modal for Updating Room */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Room Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRoom && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedRoom = {
                  ...selectedRoom,
                  type_name: e.target.type_name.value,
                  description: e.target.description.value,
                  active: e.target.active.checked,
                };
                updateRoom(updatedRoom);
              }}
            >
              <div className="mb-3">
                <label className="form-label">Room Type Name</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={selectedRoom.type_name}
                  name="type_name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  defaultValue={selectedRoom.description}
                  name="description"
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  defaultChecked={selectedRoom.active}
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

export default RoomTableAllData;
