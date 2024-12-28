import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";
const UpdateCompany = ({ selectedRestaurant }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    // Convert `active` field to a boolean
    const formattedData = {
      ...data,
      active: data.active === "true",
      is_partner: data.is_partner === "true",
      city_id: Number(data.city_id),
    };

    console.log("formattedData", formattedData);

    try {
      const response = await axios.post(
        "http://localhost:3000/transport-companies/create",
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
        reset();
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
      <div className="auth-right py-10 px-24 w-100">
        <div className="max-w-500-px mx-md-auto mx-0 w-100">
          <div>
            {/* <Link to="/" className="mb-40 max-w-290-px">
              <img src="assets/images/logo.png" alt="" />
            </Link> */}
            {/* <h4 className="mb-12">Update the Transport Company </h4> */}
            <p className="mb-32 text-secondary-light text-lg">
              {" "}
              Following fields can be updated required to update a transport
              company in city {selectedRestaurant.city?.city_name || ""}.
            </p>
          </div>
          <form
            action="#"
            onSubmit={handleSubmit(onSubmit)}
            className="  w-100"
          >
            <div className=" col-12">
              <label className="form-label">Transport Company Name</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  type="text"
                  name="#0"
                  className="form-control"
                  placeholder="Enter Transport Company Name"
                  defaultValue={selectedRestaurant?.company_name}
                  required=""
                  {...register("company_name", {
                    required: "company name is required",
                  })}
                />

                {errors.company_name && (
                  <div className="fw-normal text-danger">
                    {errors.company_name.message}
                  </div>
                )}
              </div>
            </div>
            <div className=" col-12">
              <label className="form-label">City ID</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  min={1}
                  maxLength={1000}
                  type="number"
                  name="#0"
                  className="form-control"
                  placeholder="Enter City ID"
                  defaultValue={selectedRestaurant.city?.city_id}
                  required=""
                  {...register("city_id", {
                    required: "city id  is required",
                  })}
                />

                {errors.city_id && (
                  <div className="fw-normal text-danger">
                    {errors.city_id.message}
                  </div>
                )}
              </div>
            </div>
            <div className=" col-12">
              <label className="form-label">Company Address</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <textarea
                  cols={12}
                  rows={4}
                  type="text"
                  name="#0"
                  style={{
                    resize: "none",
                  }}
                  className="form-control"
                  placeholder="Enter Company Address"
                  defaultValue={selectedRestaurant?.address}
                  required=""
                  {...register("address", {
                    required: "Address is required",
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
              <label className="form-label">Company Details</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <textarea
                  cols={12}
                  rows={4}
                  type="text"
                  name="#0"
                  style={{
                    resize: "none",
                  }}
                  className="form-control"
                  placeholder="Enter Company Details"
                  defaultValue={selectedRestaurant?.details}
                  required=""
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
              <label className="form-label">Company Type</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  type="text"
                  name="#0"
                  className="form-control"
                  placeholder="Enter Company Type"
                  defaultChecked={selectedRestaurant?.company_type}
                  required=""
                  {...register("company_type", {
                    required: "company type is required",
                  })}
                />

                {errors.company_type && (
                  <div className="fw-normal text-danger">
                    {errors.company_type.message}
                  </div>
                )}
              </div>
            </div>
            <div className=" col-12">
              <label className="form-label">Is Parnter?</label>
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
                      defaultChecked={
                        selectedRestaurant?.is_partner === true ? true : false
                      }
                      {...register("is_partner", {
                        required: "is_partner is required",
                      })}
                    />
                    <label
                      className="form-check-label line-height-1 fw-medium text-secondary-light"
                      htmlFor="radio33"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="form-check checked-warning d-flex align-items-center gap-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="radio"
                      id="radio44"
                      value="false"
                      defaultChecked={
                        selectedRestaurant?.is_partner === false ? true : false
                      }
                      {...register("is_partner", {
                        required: "is_partner is required",
                      })}
                    />
                    <label
                      className="form-check-label line-height-1 fw-medium text-secondary-light"
                      htmlFor="radio44"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className=" col-12">
              <label className="form-label">Is Active?</label>
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
                      defaultChecked={selectedRestaurant?.active === true}
                      {...register("active", {
                        required: "active is required",
                      })}
                    />
                    <label
                      className="form-check-label line-height-1 fw-medium text-secondary-light"
                      htmlFor="radio33"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="form-check checked-warning d-flex align-items-center gap-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="radio"
                      id="radio44"
                      value="false"
                      defaultValue={selectedRestaurant?.active === false}
                      {...register("active", {
                        required: "active is required",
                      })}
                    />
                    <label
                      className="form-check-label line-height-1 fw-medium text-secondary-light"
                      htmlFor="radio44"
                    >
                      No
                    </label>
                  </div>
                </div>
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
    </section>
  );
};

export default UpdateCompany;
