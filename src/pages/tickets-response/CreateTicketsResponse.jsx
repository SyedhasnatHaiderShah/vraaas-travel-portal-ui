import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";
const CreateTicketsResponse = () => {
  const user_id = localStorage.getItem("user_id");
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
      ticket_id: Number(data.ticket_id),
      responder_id: Number(data.responder_id),
    };

    console.log("formattedData", formattedData);

    try {
      const response = await axios.post(
        "http://localhost:3000/ticket-responses",
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
      <MasterLayout>
        <div className="auth-right py-10 px-24 w-100">
          <div className="max-w-500-px mx-md-auto mx-0 w-100">
            <div>
              {/* <Link to="/" className="mb-40 max-w-290-px">
              <img src="assets/images/logo.png" alt="" />
            </Link> */}
              <h4 className="mb-12">Create Ticket Response </h4>
              <p className="mb-32 text-secondary-light text-lg">
                {" "}
                Following are the fields required to create a new ticket
                response.
              </p>
            </div>
            <form
              action="#"
              onSubmit={handleSubmit(onSubmit)}
              className="  w-100"
            >
              {/* ticket_id */}
              <div className=" col-12">
                <label className="form-label">Ticket ID</label>
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
                    placeholder="Enter Ticket ID"
                    required=""
                    {...register("ticket_id", {
                      required: "Ticket ID is required",
                    })}
                  />
                  {errors.ticket_id && (
                    <div className="fw-normal text-danger">
                      {errors.ticket_id.message}
                    </div>
                  )}
                </div>
              </div>
              {/* responder_id */}
              <div className=" col-12">
                <label className="form-label">Responder ID</label>
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
                    placeholder="Enter Responder ID"
                    required=""
                    {...register("responder_id", {
                      required: "Responder ID is required",
                    })}
                  />
                  {errors.responder_id && (
                    <div className="fw-normal text-danger">
                      {errors.responder_id.message}
                    </div>
                  )}
                </div>
              </div>

              <div className=" col-12">
                <label className="form-label">Message</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <textarea
                    cols={12}
                    rows={4}
                    style={{
                      resize: "none",
                    }}
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Description"
                    required=""
                    {...register("message", {
                      required: "Description is required",
                    })}
                  />
                  {errors.message && (
                    <div className="fw-normal text-danger">
                      {errors.message.message}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn- text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                style={{
                  backgroundColor: "#439ab6",
                }}
              >
                {" "}
                Submit
              </button>
            </form>
            <div
              className=" text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3 "
              onClick={() => navigate("/tickets-response-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Tickets Response Page
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>
    </section>
  );
};

export default CreateTicketsResponse;
