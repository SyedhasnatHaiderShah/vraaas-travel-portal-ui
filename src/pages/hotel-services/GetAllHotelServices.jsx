import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";

const GetAllHotelServices = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [servicesData, setServicesData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch hotel services by hotel ID
  const fetchServices = async (data) => {
    const formattedData = {
      hotel_id: Number(data.hotel_id),
    };
    try {
      const response = await axios.get(
        `http://localhost:3000/hotel-services/${formattedData.hotel_id}/services`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.is_success) {
        setServicesData(response.data.data);
        toast.success("Services retrieved successfully!");
      }
    } catch (error) {
      toast.error("Failed to fetch services. Please try again.");
      console.error(error.message);
    }
  };

  // Delete a service
  const deleteService = async (service) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      const response = await axios.post(
        `http://localhost:3000/hotel-services/${service.hotel_id}/services/${service.hotel_service_id}/delete`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.is_success) {
        setServicesData(
          servicesData.filter(
            (service) => service.hotel_service_id !== service.hotel_service_id
          )
        );
        toast.success("Service deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete service. Please try again.");
      console.error(error.message);
    }
  };

  const updateService = async (updatedService) => {
    const { hotel_id, hotel_service_id, ...rest } = selectedService; // Exclude `hotel_service_id` from the payload
    try {
      const response = await axios.post(
        `http://localhost:3000/hotel-services/${hotel_id}/services/${hotel_service_id}/update`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.is_success) {
        const updatedList = servicesData.map((service) =>
          service.hotel_service_id === updatedService.hotel_service_id
            ? { ...service, ...rest }
            : service
        );
        setServicesData(updatedList);
        setShowModal(false);
        toast.success("Service updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update service. Please try again.");
      console.error(error.message);
    }
  };

  return (
    <div className="col-lg-6 w-100">
      <MasterLayout>
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">All Hotel Services by Hotel ID</h5>
          </div>
          {/* Form */}
          <div className=" px-3">
            <form onSubmit={handleSubmit(fetchServices)}>
              <div className="col-12">
                <label className="form-label">Hotel ID</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:building" />
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Hotel ID"
                    {...register("hotel_id", {
                      required: "Hotel ID is required",
                    })}
                  />
                  {errors.hotel_id && (
                    <div className="fw-normal text-danger">
                      {errors.hotel_id.message}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="btn  btn-sm px-4 py-3 w-100 radius-8 mt-3"
                style={{ backgroundColor: "#57bcce" }}
              >
                Fetch Services
              </button>
            </form>
          </div>
          {/* Table */}
          <div className="card-body">
            <div className="table-responsive">
              <table className="table basic-border-table mb-0">
                <thead>
                  <tr>
                    <th>Hotel Service ID</th>
                    <th>Hotel ID</th>
                    <th>Service Price</th>
                    <th>Service Active?</th>
                    <th>Hotel Name</th>
                    <th>Hotel Address</th>
                    <th>Hotel Details</th>
                    <th>Hotel Partner</th>
                    <th>Hotel Active</th>
                    <th>Room ID</th>
                    <th>Room Name</th>
                    <th>Room Description</th>
                    <th>Room Active?</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {servicesData.length > 0 ? (
                    servicesData.map((service, index) => (
                      <tr key={index}>
                        <td>{service.hotel_service_id}</td>
                        <td>{service.hotel.hotel_id}</td>
                        <td>${service.service_price}</td>
                        <td
                          style={{
                            color: service.active ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {service.active ? "Yes" : "No"}
                        </td>
                        <td>{service.hotel.hotel_name}</td>
                        <td>{service.hotel.address}</td>
                        <td>{service.hotel.details}</td>
                        <td>{service.hotel.is_partner ? "Yes" : "No"}</td>
                        <td
                          style={{
                            color: service.hotel.active ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {service.hotel.active ? "Yes" : "No"}
                        </td>
                        <td>{service.roomType.room_type_id}</td>
                        <td>{service.roomType.type_name}</td>
                        <td>{service.roomType.description}</td>
                        <td
                          style={{
                            color: service.roomType.active ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {service.roomType.active ? "Yes" : "No"}
                        </td>
                        <td>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => {
                              setSelectedService(service);
                              setShowModal(true);
                            }}
                          >
                            Update
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteService(service)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No services available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div
              className="text-center border w-100 rounded-1 my-3"
              onClick={() => navigate("/hotel-services-layer")}
              style={{ cursor: "pointer" }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light px-3 py-2"
              >
                Go back to Services Page
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>

      {/* Modal */}
      {/* Modal */}
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedService && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedService = {
                  hotel_service_id: selectedService.hotel_service_id,
                  service_price: parseFloat(e.target.service_price.value),
                  active: e.target.active.checked,
                  additional_details: e.target.additional_details.value,
                };
                updateService(updatedService);
              }}
            >
              <div className="mb-3">
                <label className="form-label">Service Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  defaultValue={selectedService.service_price}
                  name="service_price"
                  required
                />
              </div>
              {/* <div className="mb-3">
                <label className="form-label">Additional Details</label>
                <textarea
                  className="form-control"
                  defaultValue={selectedService.additional_details || ""}
                  name="additional_details"
                />
              </div> */}
              <div className="mb-3 form-check d-flex gap-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  defaultChecked={selectedService.active}
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

export default GetAllHotelServices;
