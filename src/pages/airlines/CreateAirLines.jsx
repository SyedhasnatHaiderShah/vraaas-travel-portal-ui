import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";
const CreateAirLines = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    // Convert `active` field to a boolean
    const formattedData = {
      ...data,
      country_id: parseInt(data.country_id),
    };

    console.log("formattedData", formattedData);

    try {
      const response = await axios.post(
        "http://localhost:3000/airlines/create",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.is_success) {
        toast.success(response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section className=" w-100">
      <MasterLayout>
        <div className="auth-right py-10 px-24 w-100">
          <div className="max-w-500-px mx-md-auto mx-0 w-100">
            <div>
              <h4 className="mb-12">Create Airport </h4>
              <p className="mb-32 text-secondary-light text-lg">
                {" "}
                Following are the fields required to create a new Airport.
              </p>
            </div>
            <form
              action="#"
              onSubmit={handleSubmit(onSubmit)}
              className="  w-100"
            >
              <div className=" col-12">
                <label className="form-label">Airline Name</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Airline Name"
                    required=""
                    {...register("airline_name", {
                      required: "airline name is required",
                    })}
                  />

                  {errors.airline_name && (
                    <div className="fw-normal text-danger">
                      {errors.airline_name.message}
                    </div>
                  )}
                </div>
              </div>
              <div className=" col-12">
                <label className="form-label">IATA Code</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter IATA Name"
                    required=""
                    {...register("iata_code", {
                      required: "IATA Code is required",
                      minLength: {
                        value: 3,
                        message: "IATA Code must be at least 3 characters",
                      },
                      maxLength: {
                        value: 3,
                        message: "IATA Code must not exceed 3 characters",
                      },
                    })}
                  />

                  {errors.iata_code && (
                    <div className="fw-normal text-danger">
                      {errors.iata_code.message}
                    </div>
                  )}
                </div>
              </div>
              <div className=" col-12">
                <label className="form-label">ICAO Code</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter ICAO Code"
                    required=""
                    {...register("icao_code", {
                      required: "ICAO Code is required",
                      minLength: {
                        value: 4,
                        message: "ICAO Code must be at least 4 characters",
                      },
                      maxLength: {
                        value: 4,
                        message: "ICAO Code must not exceed 4 characters",
                      },
                    })}
                  />

                  {errors.icao_code && (
                    <div className="fw-normal text-danger">
                      {errors.icao_code.message}
                    </div>
                  )}
                </div>
              </div>
              <div className=" col-12">
                <label className="form-label">Call Sign</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Call Sign"
                    required=""
                    {...register("callsign", {
                      required: "call sign is required",
                    })}
                  />

                  {errors.callsign && (
                    <div className="fw-normal text-danger">
                      {errors.callsign.message}
                    </div>
                  )}
                </div>
              </div>
              <div className=" col-12">
                <label className="form-label">Country ID</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    min={1}
                    maxLength={100}
                    type="number"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Country ID"
                    required=""
                    {...register("country_id", {
                      required: "country id  is required",
                    })}
                  />

                  {errors.country_id && (
                    <div className="fw-normal text-danger">
                      {errors.country_id.message}
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="col-12">
                <label className="form-label">Time Zone</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:world" />
                  </span>
                  <select
                    name="timezone"
                    className="form-control"
                    required
                    {...register("timezone", {
                      required: "Time Zone is required",
                    })}
                  >
                    <option value="">Select Time Zone</option>
                    <option value="Asia/Dubai">
                      Asia/Dubai (UAE - Gulf Standard Time)
                    </option>
                    <option value="Asia/Muscat">
                      Asia/Muscat (Oman - Gulf Standard Time)
                    </option>
                    <option value="Asia/Bahrain">
                      Asia/Bahrain (Bahrain - Arabian Standard Time)
                    </option>
                    <option value="Asia/Kuwait">
                      Asia/Kuwait (Kuwait - Arabian Standard Time)
                    </option>
                    <option value="Asia/Riyadh">
                      Asia/Riyadh (Saudi Arabia - Arabian Standard Time)
                    </option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">
                      America/New_York (EST)
                    </option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Europe/Paris">Europe/Paris (CET)</option>
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                    <option value="Australia/Sydney">
                      Australia/Sydney (AEDT)
                    </option>
                  </select>
                  {errors.timezone && (
                    <div className="fw-normal text-danger">
                      {errors.timezone.message}
                    </div>
                  )}
                </div>
              </div> */}

              <button
                type="submit"
                className="btn text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                style={{ backgroundColor: "#57bcce" }}
              >
                {" "}
                Submit
              </button>
            </form>
            <div
              className=" text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3 "
              onClick={() => navigate("/airlines-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Airlines Page
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>
    </section>
  );
};

export default CreateAirLines;
