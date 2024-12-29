import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { get, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdClose, IoMdReturnLeft } from "react-icons/io";
const UpdatePayments = ({ updateData, setShowModal, getAllRoomData }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    // Convert `active` field to a boolean
    const formattedData = {
      ...data,
    };

    console.log("formattedData", formattedData);

    try {
      const response = await axios.post(
        `http://localhost:3000/payments/${updateData.payment_id}/update`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.is_success === true) {
        toast.success(response.data.message);
        setShowModal(false);
        getAllRoomData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
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
              Following are the fields required to update the payment.
            </p>
          </div>
          <form
            action="#"
            onSubmit={handleSubmit(onSubmit)}
            className="  w-100"
          >
            {/* <div className=" col-12">
                <label className="form-label">Customer ID</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    value={userId || ""}
                    min={1}
                    maxLength={10000}
                    type="number"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Customer ID"
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
              </div> */}

            <div className="col-12">
              <div className="mb-20">
                <label
                  htmlFor="payment-method"
                  className="form-label fw-semibold text-primary-light text-sm mb-8"
                >
                  Payment Method
                </label>
                <select
                  name="payment_method"
                  id="payment-method"
                  className="form-control radius-8"
                  defaultValue={updateData.payment_method}
                  {...register("payment_method", { required: true })}
                >
                  <option value="">Select a payment method</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            {/* <div className=" col-12">
              <label className="form-label">Amount</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  min={1}
                  maxLength={10000000}
                  type="number"
                  name="#0"
                  className="form-control"
                  placeholder="Enter Amount"
                  required=""
                  {...register("amount", {
                    required: "Amount is required",
                  })}
                />
                {errors.amount && (
                  <div className="fw-normal text-danger">
                    {errors.amount.message}
                  </div>
                )}
              </div>
            </div> */}
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
                  defaultValue={updateData.status}
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
              Update
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
              Cancel Payment
            </button>
            <IoMdClose />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatePayments;
