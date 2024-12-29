import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";

const CreateTransportServices = () => {
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
      transport_company_id: parseInt(data.transport_company_id),
      from_city_id: parseInt(data.from_city_id),
      to_city_id: parseInt(data.to_city_id),
      price: parseFloat(data.price),
      active: data.active === "true",
    };
    console.log("formattedData", formattedData);
    try {
      const response = await axios.post(
        "http://localhost:3000/transport-services/create",
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
        // navigate("/transport-services-layer");
        reset();
        // navigate("/flights-layer");
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
              <h4 className="mb-12">Create Transport Company Services</h4>
              <p className="mb-32 text-secondary-light text-lg">
                Following are the fields required to create a new Transport
                Company Service.
              </p>
            </div>
            <form
              action="#"
              onSubmit={handleSubmit(onSubmit)}
              className="w-100"
            >
              <div className="col-12">
                <label className="form-label">Transport Company ID</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Transport Company ID"
                    required=""
                    min={1}
                    max={1000}
                    {...register("transport_company_id", {
                      required: "Transport Company IDis required",
                    })}
                  />
                  {errors.transport_company_id && (
                    <div className="fw-normal text-danger">
                      {errors.transport_company_id.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-12">
                <div className="mb-20">
                  <label
                    htmlFor="number"
                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                  >
                    Service Type
                  </label>
                  <select
                    name=""
                    id=""
                    className="form-control radius-8"
                    {...register("service_type", {
                      required: true,
                      message: "Service Type is required",
                    })}
                    //   defaultValue={editUserData?.data?.role || ""}
                  >
                    {/* <option value="leader">Leader</option> */}
                    <option value="">Choose the Service</option>
                    <option value="Train">Train</option>
                    <option value="Flight">Flight</option>
                    <option value="Taxi">Taxi</option>
                  </select>
                  {/* <input
                          value={editUserData.data.leader_id}
                          type=""
                          className="form-control radius-8"
                          id="number"
                          placeholder="Enter Leader ID"
                          {...register("leader_id", {
                            required: true,
                          })}
                        /> */}
                </div>
                {/* errors */}
                {errors.service_type && (
                  <div className="fw-normal text-danger">
                    {errors.service_type.message}
                  </div>
                )}
              </div>
              {/* <div className="col-12">
                <label className="form-label">Service Type</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Transport Service Type"
                    required=""
                    {...register("service_type", {
                      required: "Transport Service Type is required",
                    })}
                  />
                  {errors.service_type && (
                    <div className="fw-normal text-danger">
                      {errors.service_type.message}
                    </div>
                  )}
                </div>
              </div> */}

              <div className="col-12">
                <label className="form-label">From City ID</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter From City ID"
                    min={1}
                    max={1000}
                    required=""
                    {...register("from_city_id", {
                      required: "from city id is required",
                    })}
                  />
                  {errors.from_city_id && (
                    <div className="fw-normal text-danger">
                      {errors.from_city_id.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">To City ID</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    min={1}
                    max={1000}
                    placeholder="Enter To City ID"
                    required=""
                    {...register("to_city_id", {
                      required: "from city id is required",
                    })}
                  />
                  {errors.to_city_id && (
                    <div className="fw-normal text-danger">
                      {errors.to_city_id.message}
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="col-12">
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
              </div> */}

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
              onClick={() => navigate("/transport-services-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Transport Services Page
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>
    </section>
  );
};

export default CreateTransportServices;
