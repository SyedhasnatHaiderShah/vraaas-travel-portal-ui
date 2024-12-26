import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";
const CreateRoomType = () => {
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
      active: data.active === "true",
    };

    console.log("formattedData", formattedData);

    try {
      const response = await axios.post(
        "http://localhost:3000/room-types/create/room-type",
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
        toast.error(response.data.message);
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
          <div className="max-w-464-px mx-md-auto mx-0 w-100">
            <div>
              {/* <Link to="/" className="mb-40 max-w-290-px">
              <img src="assets/images/logo.png" alt="" />
            </Link> */}
              <h4 className="mb-12">Create Room Type </h4>
              <p className="mb-32 text-secondary-light text-lg">
                {" "}
                Enter Room Data Requirement
              </p>
            </div>
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
              <div className=" col-12">
                <label className="form-label">Room Type Name</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Room Type Name"
                    required=""
                    {...register("type_name", {
                      required: "type name is required",
                    })}
                  />

                  {errors.type_name && (
                    <div className="fw-normal text-danger">
                      {errors.type_name.message}
                    </div>
                  )}
                </div>
              </div>
              <div className=" col-12">
                <label className="form-label">Room Description</label>
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
                    placeholder="Room Description"
                    required=""
                    {...register("description", {
                      required: "description is required",
                    })}
                  />

                  {errors.description && (
                    <div className="fw-normal text-danger">
                      {errors.description.message}
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
                        name="radio"
                        id="radio33"
                        // value="true"
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
                        name="radio"
                        id="radio44"
                        // value="false"
                        {...register("active", {
                          required: "active is required",
                        })}
                      />
                      <label
                        className="form-check-label line-height-1 fw-medium text-secondary-light"
                        htmlFor="radio44"
                      >
                        False
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
          </div>
          <div
            className=" text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3 "
            onClick={() => navigate("/room-type")}
            style={{
              cursor: "pointer",
            }}
          >
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              Go back to Room Type
            </button>
            <IoMdReturnLeft />
          </div>
        </div>
      </MasterLayout>
    </section>
  );
};

export default CreateRoomType;
