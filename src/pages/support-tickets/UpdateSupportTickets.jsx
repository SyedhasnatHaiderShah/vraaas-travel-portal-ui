import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdClose, IoMdReturnLeft } from "react-icons/io";
const UpdateSupportTickets = ({ supportTicketData, setShowModal }) => {
  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data", data);
    // Convert `active` field to a boolean
    const formattedData = {
      ...data,
      category_id: Number(data.category_id),
      user_id: Number(user_id),
    };

    console.log("formattedData", formattedData);

    try {
      const response = await axios.post(
        `http://localhost:3000/support-tickets/${supportTicketData.ticket_id}/update`,
        data,
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
            {/* <h4 className="mb-12">Update Support Ticket </h4> */}
            <p className="mb-32 text-secondary-light text-lg">
              {" "}
              Following are the fields required to update a new support ticket.
            </p>
          </div>
          <form
            action="#"
            onSubmit={handleSubmit(onSubmit)}
            className="  w-100"
          >
            {/* <div className=" col-12">
                <label className="form-label">Category ID</label>
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
                    placeholder="Enter Category ID"
                    required=""
                    {...register("category_id", {
                      required: "Category ID is required",
                    })}
                  />
                  {errors.category_id && (
                    <div className="fw-normal text-danger">
                      {errors.category_id.message}
                    </div>
                  )}
                </div>
              </div> */}
            {/* <div className=" col-12">
                <label className="form-label">Subject</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    min={1}
                    maxLength={10000}
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Subject"
                    required=""
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                  />
                  {errors.subject && (
                    <div className="fw-normal text-danger">
                      {errors.subject.message}
                    </div>
                  )}
                </div>
              </div> */}
            {/* <div className=" col-12">
                <label className="form-label">Description</label>
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
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <div className="fw-normal text-danger">
                      {errors.description.message}
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
                  Priority
                </label>
                <select
                  name=""
                  id=""
                  className="form-control radius-8"
                  {...register("priority", { required: true })}
                  defaultValue={supportTicketData?.priority || ""}
                  //   defaultValue={editUserData?.data?.role || ""}
                >
                  {/* <option value="leader">Leader</option> */}
                  <option value="">Choose any Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
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
                  {...register("status", { required: true })}
                  defaultValue={supportTicketData?.status || ""}
                  //   defaultValue={editUserData?.data?.role || ""}
                >
                  {/* set the status to the open, in progress, resolved ,closed */}
                  <option value="">Choose Status</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
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

export default UpdateSupportTickets;
