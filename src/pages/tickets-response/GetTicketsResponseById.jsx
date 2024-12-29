import React, { useEffect } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { IoMdReturnLeft } from "react-icons/io";

const GetTicketsResponseById = () => {
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
        `http://localhost:3000/ticket-responses/${formatedData.ticket_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data === true);
      if (response.data.is_success) {
        setBookingData(response.data);
      } else {
        setBookingData(null);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="">
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
              className="btn btn- text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
              style={{
                backgroundColor: "#439ab6",
              }}
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
                          <th>Response ID</th>
                          <th>Message</th>
                          <th>Created At</th>
                          <th>Ticket ID</th>
                          <th>Subject</th>
                          <th>Status</th>
                          <th>Priority</th>
                          <th>Responder ID</th>
                          <th>Full Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingData ? (
                          <tr>
                            <td>{bookingData.response_id}</td>
                            <td>{bookingData.message}</td>
                            <td>
                              {new Date(
                                bookingData.data.created_at
                              ).toLocaleString()}
                            </td>
                            <td>{bookingData.data.ticket.ticket_id}</td>
                            <td>{bookingData.data.ticket.subject}</td>
                            <td>{bookingData.data.ticket.status}</td>
                            <td>{bookingData.data.ticket.priority}</td>
                            <td>{bookingData.data.responder.user_id}</td>
                            <td>{bookingData.data.responder.full_name}</td>
                            {/* <td>
                              <button className="btn btn-primary btn-sm">
                                View
                              </button>
                              <button className="btn btn-danger btn-sm ml-2">
                                Delete
                              </button>
                            </td> */}
                          </tr>
                        ) : (
                          <tr>
                            <td colSpan="10" className="text-center">
                              No response data available.
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
    </div>
  );
};

export default GetTicketsResponseById;
