import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";

const CreateHotel = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      active: data.active === "true",
      is_partner: data.is_partner === "true",
      city_id: Number(data.city_id),
    };
    try {
      console.log(data);

      const response = await axios.post(
        "http://localhost:3000/hotels/create",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data.message);

      if (response.data.is_success) {
        // Registration was successful
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section className=" w-100">
      <MasterLayout>
        <div className="auth-right py-10 px-24">
          <div className="max-w-464-px mx-md-auto mx-0 w-100">
            <div>
              {/* <Link to="/" className="mb-40 max-w-290-px">
              <img src="assets/images/logo.png" alt="" />
            </Link> */}
              <h4 className="mb-12">Create Hotel </h4>
              <p className="mb-32 text-secondary-light text-lg">
                {" "}
                Enter Hotel Data
              </p>
            </div>
            <form
              action="#"
              onSubmit={handleSubmit(onSubmit)}
              className=" d-flex align-items-center justify-content-center flex-wrap gap-3"
            >
              <div className=" col-12">
                <label className="form-label">Hotel Name</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Hotel Name"
                    required=""
                    {...register("hotel_name", {
                      required: "hotel name is required",
                    })}
                  />

                  {errors.hotel_name && (
                    <div className="fw-normal text-danger">
                      {errors.hotel_name.message}
                    </div>
                  )}
                </div>
              </div>
              <div className=" col-12">
                <label className="form-label">Address</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <textarea
                    type=""
                    name="#0"
                    className="form-control"
                    placeholder="Enter Address"
                    required=""
                    style={{
                      resize: "none",
                    }}
                    cols={12}
                    rows={3}
                    {...register("address", {
                      required: "address is required",
                    })}
                  />

                  {errors.address && (
                    <div className="fw-normal text-danger">
                      {errors.address.message}
                    </div>
                  )}
                </div>
              </div>
              <div className=" col-12">
                <label className="form-label">Details</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <textarea
                    type="number"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Details"
                    required=""
                    style={{
                      resize: "none",
                    }}
                    cols={12}
                    rows={3}
                    {...register("details", {
                      required: "details is required",
                    })}
                  />

                  {errors.details && (
                    <div className="fw-normal text-danger">
                      {errors.details.message}
                    </div>
                  )}
                </div>
              </div>
              <div className=" col-12">
                <label className="form-label">Active Condition</label>
                <div className="icon-field has-validation">
                  <div className="form-check checked-success d-flex align-items-center gap-2 border border-2 p-3 rounded-2 gap-5">
                    {/* <label className="form-label">Active</label> */}
                    <div className="form-check checked-success d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="true"
                        id="radio33"
                        value="true"
                        {...register("active", {
                          required: "active is required",
                        })}
                      />
                      <label
                        className="form-check-label line-height-1 fw-medium text-secondary-light"
                        htmlFor="radio33"
                      >
                        True
                      </label>
                    </div>
                    <div className="form-check checked-warning d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="false"
                        id="radio44"
                        value="false"
                        {...register("active", {
                          required: "active is required",
                          setValueAs: (v) => Boolean(v),
                        })}
                      />
                      <label
                        className="form-check-label line-height-1 fw-medium text-secondary-light"
                        htmlFor="radio44"
                      >
                        False
                      </label>
                      {
                        // if there is an error, display it
                        errors.active && (
                          <div className="fw-normal text-danger">
                            {errors.active.message}
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-12">
                <label className="form-label">Is Partner?</label>
                <div className="icon-field has-validation">
                  <div className="form-check checked-success d-flex align-items-center gap-2 border border-2 p-3 rounded-2 gap-5">
                    {/* <label className="form-label">Active</label> */}
                    <div className="form-check checked-success d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="radio"
                        id="radio33"
                        value="true"
                        {...register("is_partner", {
                          required: "is partner is required",
                        })}
                      />
                      <label
                        className="form-check-label line-height-1 fw-medium text-secondary-light"
                        htmlFor="radio33"
                      >
                        True
                      </label>
                    </div>
                    <div className="form-check checked-warning d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="radio"
                        id="radio44"
                        value="false"
                        {...register("is_partner", {
                          required: "is partner is required",
                        })}
                      />
                      <label
                        className="form-check-label line-height-1 fw-medium text-secondary-light"
                        htmlFor="radio44"
                      >
                        False
                      </label>

                      {errors.is_partner && (
                        <div className="fw-normal text-danger">
                          {errors.is_partner.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-12">
                <label className="form-label">City ID</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="number"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Country ID"
                    required=""
                    {...register("city_id", {
                      required: "country id is required",
                      // convert the value to a number
                      setValueAs: (v) => Number(v),
                    })}
                  />

                  {errors.country_id && (
                    <div className="fw-normal text-danger">
                      {errors.country_id.message}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
              >
                {" "}
                Submit
              </button>
            </form>
            <div
              className=" text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3 "
              onClick={() => navigate("/hotels")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Click to go back to home
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>
    </section>
  );
};

export default CreateHotel;
