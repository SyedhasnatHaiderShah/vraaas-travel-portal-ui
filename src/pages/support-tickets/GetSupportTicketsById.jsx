import React, { useEffect } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { IoMdReturnLeft } from "react-icons/io";

const GetSupportTicketsById = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const [bookingData, setBookingData] = React.useState(null);
  const onSubmit = async (data) => {
    const formatedData = {
      ticket_id: Number(data.ticket_id),
    };
    try {
      const response = await axios.get(
        `http://localhost:3000/support-tickets/${formatedData.ticket_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data === true);
      if (response.data.is_success) {
        setBookingData(response.data.data);
      } else {
        setBookingData(null);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className=" w-100">
      <MasterLayout>
        <div className=" w-100 border p-3 ">
          {/* <h1>All the Countries List</h1> */}
          {/* <HotelTableAllData /> */}
          <h3>Get Support Ticket by ID</h3>
          <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <div className=" col-12">
              <label className="form-label">Enter Support Ticket ID</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  type="text"
                  name="#0"
                  className="form-control"
                  placeholder="Enter Support Ticket ID"
                  required=""
                  {...register("ticket_id", {
                    required: "ticket id is required",
                  })}
                />

                {errors.ticket_id && (
                  <div className="fw-normal text-danger">
                    {errors.ticket_id.message}
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

          <div>
            <div className="col-lg-6 w-100">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">
                    The available Booking list
                  </h5>
                </div>
                {/* card body start */}
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table basic-border-table mb-0">
                      <thead>
                        <tr>
                          <th>Ticket ID</th>
                          <th>Subjects</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Priority</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                          {/* user data */}
                          <th>User ID</th>
                          {/* <th>Username</th> */}
                          <th>Full Name</th>
                          {/* <th>Phone Number</th> */}
                          {/* <th>Email</th> */}
                          {/* <th>Country</th> */}
                          {/* <th>Role</th> */}
                          {/* <th>User Status</th> */}
                          {/* category */}
                          <th>Category ID</th>
                          <th>Category Name</th>
                          {/* responses */}
                          <th>Responses</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingData ? (
                          <tr key={bookingData.ticket_id}>
                            <td>{bookingData?.ticket_id}</td>
                            <td>{bookingData?.subject}</td>
                            <td>{bookingData?.description}</td>
                            <td>{bookingData?.status}</td>
                            <td>{bookingData?.priority}</td>
                            <td>
                              {new Date(
                                bookingData?.created_at
                              ).toLocaleString()}
                            </td>
                            <td>
                              {new Date(
                                bookingData?.updated_at
                              ).toLocaleString()}
                            </td>
                            {/* User Data */}
                            <td>{bookingData?.user?.user_id || "N/A"}</td>
                            {/* <td>{bookingData?.user?.username || "N/A"}</td> */}
                            <td>{bookingData?.user?.full_name || "N/A"}</td>
                            {/* <td>{bookingData?.user?.phone_number || "N/A"}</td> */}
                            {/* <td>{bookingData?.user?.email || "N/A"}</td> */}
                            {/* <td>{bookingData?.user?.country || "N/A"}</td> */}
                            {/* <td>{bookingData?.user?.role || "N/A"}</td> */}
                            {/* <td>{bookingData?.user?.status || "N/A"}</td> */}

                            {/* Category Data */}
                            <td>
                              {bookingData?.category?.category_id || "N/A"}
                            </td>
                            <td>{bookingData?.category?.name || "N/A"}</td>

                            {/* Responses */}
                            <td>
                              {bookingData?.responses?.length > 0 ? (
                                bookingData.responses.map((response) => (
                                  <div key={response.response_id}>
                                    <p>{response.message}</p>
                                    <p>
                                      <strong>Responder:</strong>{" "}
                                      {response.responder?.full_name || "N/A"}
                                    </p>
                                    <p>
                                      <strong>Created At:</strong>{" "}
                                      {new Date(
                                        response.created_at
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <span>No responses</span>
                              )}
                            </td>
                          </tr>
                        ) : (
                          <tr>
                            <td colSpan="13" className="text-center">
                              No data available. Please submit a valid Booking
                              ID.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* card end */}
            </div>
            <div
              className=" text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3 "
              onClick={() => navigate("/support-tickets-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Support Tickets Page
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>
    </div>
  );
};

export default GetSupportTicketsById;
