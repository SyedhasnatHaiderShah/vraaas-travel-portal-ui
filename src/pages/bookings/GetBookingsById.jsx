import React, { useEffect } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { IoMdReturnLeft } from "react-icons/io";

const GetBookingsById = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const [bookingData, setBookingData] = React.useState(null);
  const onSubmit = async (data) => {
    const formatedData = {
      booking_id: Number(data.booking_id),
    };
    try {
      const response = await axios.get(
        `http://localhost:3000/bookings/${formatedData.booking_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
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
          <h3>Get Restuarant by ID</h3>
          <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <div className=" col-12">
              <label className="form-label">Booking ID</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  type="text"
                  name="#0"
                  className="form-control"
                  placeholder="Enter Booking ID"
                  required=""
                  {...register("booking_id", {
                    required: "hotel id is required",
                  })}
                />

                {errors.booking_id && (
                  <div className="fw-normal text-danger">
                    {errors.booking_id.message}
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
                          <th>Booking ID</th>
                          <th>Service Type</th>
                          <th>Service ID</th>
                          <th>Booking Date</th>
                          <th>Status</th>
                          {/* user data */}
                          <th>User ID</th>
                          <th>Username</th>
                          <th>Full Name</th>
                          <th>Phone Number</th>
                          <th>Email</th>
                          <th>Country</th>
                          <th>Role</th>
                          <th>User Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingData ? (
                          <tr>
                            <td>{bookingData.booking_id}</td>
                            <td>{bookingData.service_type}</td>
                            <td>{bookingData.service_id}</td>
                            <td>{bookingData.booking_date}</td>
                            <td>{bookingData.status}</td>
                            {/* customer data */}
                            <td>{bookingData.customer.user_id}</td>
                            <td>{bookingData.customer.username}</td>
                            <td>{bookingData.customer.full_name}</td>
                            <td>{bookingData.customer.phone_number}</td>
                            <td>{bookingData.customer.email}</td>
                            <td>{bookingData.customer.country}</td>
                            <td>{bookingData.customer.role}</td>
                            <td>{bookingData.customer.status}</td>
                          </tr>
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">
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
              onClick={() => navigate("/bookings-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Bookings Page
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>
    </div>
  );
};

export default GetBookingsById;
