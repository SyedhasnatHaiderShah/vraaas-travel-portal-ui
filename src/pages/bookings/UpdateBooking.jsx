import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdClose, IoMdReturnLeft } from "react-icons/io";
const UpdateBooking = ({ bookingData, setShowModal }) => {
  console.log("bookingData", bookingData);
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
      customer_id: Number(data.customer_id),
      service_id: Number(data.service_id),
    };

    console.log("formattedData", formattedData);

    try {
      const response = await axios.post(
        `http://localhost:3000/bookings/${bookingData.booking_id}/update`,
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
        setShowModal(false);
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
            <p className="mb-32 text-secondary-light text-lg">
              {" "}
              Following fields can be updated to Booking with the ID{" "}
              {bookingData.booking_id}.
            </p>
          </div>
          <form
            action="#"
            onSubmit={handleSubmit(onSubmit)}
            className="  w-100"
          >
            <div className=" col-12">
              <label className="form-label">Customer ID</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  min={1}
                  maxLength={10000}
                  type="number"
                  name="#0"
                  className="form-control"
                  placeholder="Enter Customer ID"
                  defaultValue={bookingData.customer.user_id}
                  required=""
                  {...register("customer_id", {
                    required: "Customer ID is required",
                  })}
                />
                {errors.customer_id && (
                  <div className="fw-normal text-danger">
                    {errors.customer_id.message}
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
                  defaultValue={bookingData.service_type}
                  {...register("service_type", { required: true })}
                  //   defaultValue={editUserData?.data?.role || ""}
                >
                  {/* <option value="leader">Leader</option> */}
                  <option value="">Choose any services</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Flight">Flight</option>
                  <option value="Transport">Transport</option>
                </select>
              </div>
            </div>
            <div className=" col-12">
              <label className="form-label">Service ID</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  min={1}
                  maxLength={10000}
                  type="number"
                  name="#0"
                  className="form-control"
                  placeholder="Enter Service ID"
                  defaultValue={bookingData.service_id}
                  required=""
                  {...register("service_id", {
                    required: "Service ID is required",
                  })}
                />
                {errors.service_id && (
                  <div className="fw-normal text-danger">
                    {errors.service_id.message}
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
                  Status
                </label>
                <select
                  name=""
                  id=""
                  className="form-control radius-8"
                  defaultValue={bookingData.status}
                  {...register("status", { required: true })}
                  //   defaultValue={editUserData?.data?.role || ""}
                >
                  {/* <option value="leader">Leader</option> */}
                  <option value="">Choose Status</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
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
            onClick={() => setShowModal(false)}
            style={{
              cursor: "pointer",
            }}
          >
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              Cancel Update
            </button>
            <IoMdClose />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateBooking;
{
}
