import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { IoMdClose, IoMdReturnLeft } from "react-icons/io";

const CreateTransportServices = ({ transportService, setShowModal }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      transport_company_id: parseInt(data.transport_company_id, 10),
      from_city_id: parseInt(data.from_city_id, 10),
      to_city_id: parseInt(data.to_city_id, 10),
      price: parseFloat(data.price),
      active: data.active === "true",
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/transport-services/${transportService.transport_service_id}/update`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.is_success) {
        toast.success("Transport service updated successfully.");
        reset();
        navigate("/transport-services-layer");
      } else {
        toast.error(response.data.message || "An error occurred.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section className="w-100">
      <div className="auth-right py-10 px-24 w-100">
        <div className="max-w-500-px mx-md-auto mx-0 w-100">
          <p className="mb-32 text-secondary-light text-lg">
            Update Transport Service ID: {transportService.transport_service_id}
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-100">
            <div className="col-12">
              <label className="form-label">Transport Company ID</label>
              <input
                type="number"
                className="form-control"
                defaultValue={
                  transportService.transport_company.transport_company_id
                }
                {...register("transport_company_id", {
                  required: "Transport Company ID is required",
                })}
              />
              {errors.transport_company_id && (
                <span className="text-danger">
                  {errors.transport_company_id.message}
                </span>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">Service Type</label>
              <select
                className="form-control"
                defaultValue={transportService.service_type}
                {...register("service_type", {
                  required: "Service Type is required",
                })}
              >
                <option value="">Select Service Type</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Taxi">Taxi</option>
              </select>
              {errors.service_type && (
                <span className="text-danger">
                  {errors.service_type.message}
                </span>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">From City ID</label>
              <input
                type="number"
                className="form-control"
                defaultValue={transportService.from_city.city_id}
                {...register("from_city_id", {
                  required: "From City ID is required",
                })}
              />
              {errors.from_city_id && (
                <span className="text-danger">
                  {errors.from_city_id.message}
                </span>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">To City ID</label>
              <input
                type="number"
                className="form-control"
                defaultValue={transportService.to_city.city_id}
                {...register("to_city_id", {
                  required: "To City ID is required",
                })}
              />
              {errors.to_city_id && (
                <span className="text-danger">{errors.to_city_id.message}</span>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">Departure Time</label>
              <input
                type="datetime-local"
                className="form-control"
                defaultValue={new Date(transportService.departure_time)
                  .toISOString()
                  .slice(0, 16)}
                {...register("departure_time", {
                  required: "Departure Time is required",
                })}
              />
              {errors.departure_time && (
                <span className="text-danger">
                  {errors.departure_time.message}
                </span>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">Arrival Time</label>
              <input
                type="datetime-local"
                className="form-control"
                defaultValue={new Date(transportService.arrival_time)
                  .toISOString()
                  .slice(0, 16)}
                {...register("arrival_time", {
                  required: "Arrival Time is required",
                })}
              />
              {errors.arrival_time && (
                <span className="text-danger">
                  {errors.arrival_time.message}
                </span>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                defaultValue={transportService.price}
                step="0.01"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && (
                <span className="text-danger">{errors.price.message}</span>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">Active</label>
              <select
                className="form-control"
                defaultValue={transportService.active ? "true" : "false"}
                {...register("active", {
                  required: "Active status is required",
                })}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              {errors.active && (
                <span className="text-danger">{errors.active.message}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              Update Service
            </button>
          </form>
          <button
            className="btn btn-secondary w-100 mt-2 d-flex align-items-center justify-content-center gap-2"
            onClick={() => setShowModal(false)}
          >
            Cancel Update <IoMdClose />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateTransportServices;
