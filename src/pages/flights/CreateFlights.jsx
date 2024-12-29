import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";

const CreateFlights = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      airline_id: parseInt(data.airline_id),
      source_airport_id: parseInt(data.source_airport_id),
      destination_airport_id: parseInt(data.destination_airport_id),
      price: parseFloat(data.price),
      active: data.active === "true",
    };
    console.log("formattedData", formattedData);
    try {
      const response = await axios.post(
        "http://localhost:3000/flights/create",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.is_success) {
        toast.success("Flight created successfully.");
        navigate("/flights-layer");
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
      <MasterLayout>
        <div className="auth-right py-10 px-24 w-100">
          <div className="max-w-500-px mx-md-auto mx-0 w-100">
            <div>
              <h4 className="mb-12">Create Flight</h4>
              <p className="mb-32 text-secondary-light text-lg">
                Following are the fields required to create a new Flight.
              </p>
            </div>
            <form
              action="#"
              onSubmit={handleSubmit(onSubmit)}
              className="w-100"
            >
              <div className="col-12">
                <label className="form-label">Flight Number</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Flight Number"
                    required=""
                    {...register("flight_number", {
                      required: "Flight number is required",
                    })}
                  />
                  {errors.flight_number && (
                    <div className="fw-normal text-danger">
                      {errors.flight_number.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">Airline ID</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Airline ID"
                    required=""
                    {...register("airline_id", {
                      required: "Airline ID is required",
                    })}
                  />
                  {errors.airline_id && (
                    <div className="fw-normal text-danger">
                      {errors.airline_id.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">Source Airport ID</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Source Airport ID"
                    required=""
                    {...register("source_airport_id", {
                      required: "Source Airport ID is required",
                    })}
                  />
                  {errors.source_airport_id && (
                    <div className="fw-normal text-danger">
                      {errors.source_airport_id.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">Destination Airport ID</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Destination Airport ID"
                    required=""
                    {...register("destination_airport_id", {
                      required: "Destination Airport ID is required",
                    })}
                  />
                  {errors.destination_airport_id && (
                    <div className="fw-normal text-danger">
                      {errors.destination_airport_id.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">Departure Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  required=""
                  {...register("departure_time", {
                    required: "Departure time is required",
                  })}
                />
                {errors.departure_time && (
                  <div className="fw-normal text-danger">
                    {errors.departure_time.message}
                  </div>
                )}
              </div>

              <div className="col-12">
                <label className="form-label">Arrival Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  required=""
                  {...register("arrival_time", {
                    required: "Arrival time is required",
                  })}
                />
                {errors.arrival_time && (
                  <div className="fw-normal text-danger">
                    {errors.arrival_time.message}
                  </div>
                )}
              </div>

              <div className="col-12">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Enter Price"
                  required=""
                  {...register("price", {
                    required: "Price is required",
                  })}
                />
                {errors.price && (
                  <div className="fw-normal text-danger">
                    {errors.price.message}
                  </div>
                )}
              </div>

              <div className="col-12">
                <label className="form-label">Active</label>
                <select
                  className="form-control"
                  {...register("active", {
                    required: "Active status is required",
                  })}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
                {errors.active && (
                  <div className="fw-normal text-danger">
                    {errors.active.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                style={{ backgroundColor: "#57bcce" }}
              >
                Submit
              </button>
            </form>

            <div
              className="text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3"
              onClick={() => navigate("/flights-layer")}
              style={{ cursor: "pointer" }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Flights Page
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>
    </section>
  );
};

export default CreateFlights;
