import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import PassportUpload from "./TravelDocuments/PassportUpload";
import IdUpload from "./TravelDocuments/IdUpload";
import VisaUpload from "./TravelDocuments/VisaUpload";
import InsuranceUpload from "./TravelDocuments/InsuranceUpload";
import TicketUpload from "./TravelDocuments/TicketUpload";
import HotelBookingUpload from "./TravelDocuments/HotelBookingUpload";
import ItineraryUpload from "./TravelDocuments/ItineraryUpload";
import CountryStatusOne from "./child/CountryStatusOne";
import { allCountries } from "../utils/countries";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

const UserDetailLayer = ({ editUserData, setShowModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const updatedData = { ...data, user_id: "2" };
      console.log(updatedData);
      const response = await axios.post(
        "http://localhost:3000/user-details",
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.is_success === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.response.data); // Log the full error
      toast.error(error.response?.data?.message || "An error occurred");

      toast.error(error.message);
    }
  };

  return (
    <div className="row gy-4">
      <div className="col-lg-4">
        <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
          <img
            src="assets/images/user-grid/user-grid-bg1.png"
            alt=""
            className="w-100 object-fit-cover"
          />
          <div className="pb-24 ms-16 mb-24 me-16  mt--100">
            <div className="text-center border border-top-0 border-start-0 border-end-0">
              <img
                src={
                  editUserData.data.profile_picture ||
                  "assets/images/user-grid/user-grid-img14.png"
                }
                alt=""
                className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
              />
              <h6 className="mb-0 mt-16">{editUserData.data.full_name}</h6>
              <span className="text-secondary-light mb-16">
                {editUserData.data.email}
              </span>
            </div>
            <div className="mt-24">
              <h6 className="text-xl mb-16">Personal Info</h6>
              <ul>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    Full Name
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {editUserData.data.full_name}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Username
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {editUserData.data.username}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Email
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {editUserData.data.email}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Phone Number
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {editUserData.data.phone_number}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Leader ID
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {editUserData.data.leader_id}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Role
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {editUserData.data.role}
                  </span>
                </li>

                <li className="d-flex align-items-center gap-1">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Country
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {editUserData.data.country}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card h-100">
          <div className="card-body p-24">
            <div className="tab-content" id="pills-tabContent">
              <div>
                <h6 className="text-md text-primary-light mb-16">
                  Update Profile Detail
                </h6>
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Full Name
                        </label>
                        <input
                          value={editUserData.data.full_name}
                          type="text"
                          className="form-control radius-8"
                          id="number"
                          placeholder="Enter Full Name"
                          {...register("full_name", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Email
                        </label>
                        <input
                          value={editUserData.data.email}
                          type="email"
                          className="form-control radius-8 bg-dark-200"
                          id="number"
                          // placeholder="Enter Secondary phone number"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Phone Number
                        </label>
                        <input
                          value={editUserData.data.phone_number}
                          type="tel"
                          className="form-control radius-8 bg-dark-200"
                          id="number"
                          placeholder="Enter phone number"
                          {...register("phone_number", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Leader ID
                        </label>
                        <input
                          value={editUserData.data.leader_id}
                          type="text"
                          className="form-control radius-8"
                          id="number"
                          placeholder="Enter Leader ID"
                          {...register("leader_id", {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Role
                        </label>
                        <select
                          name=""
                          id=""
                          className="form-control radius-8"
                          {...register("role", { required: true })}
                        >
                          <option value="leader">Leader</option>
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                        {/* <input
                          value={editUserData.data.leader_id}
                          type=""
                          className="form-control radius-8"
                          id="number"
                          placeholder="Enter Leader ID"
                          {...register("leader_id", {
                            required: true,
                          })}
                        /> */}
                      </div>
                    </div>
                    {/* <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="form-control radius-8"
                          id="number"
                          placeholder="Enter Secondary phone number"
                          {...register("date_of_birth", { required: true })}
                        />
                      </div>
                    </div> */}

                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Country
                        </label>
                        <select
                          className="form-control radius-8"
                          {...register("country", { required: true })}
                          defaultValue={editUserData.data.country}
                        >
                          <option value="">Select a country</option>
                          {allCountries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* Document Checkboxes */}
                    <div className="col-sm-12">
                      <h6 className="mb-16">Select Documents</h6>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Passport"
                          id="passport"
                          {...register("document_list")}
                        />
                        <label className="form-check-label" htmlFor="passport">
                          Passport
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="ID"
                          id="id"
                          {...register("document_list")}
                        />
                        <label className="form-check-label" htmlFor="id">
                          ID
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Visa"
                          id="visa"
                          {...register("document_list")}
                        />
                        <label className="form-check-label" htmlFor="visa">
                          Visa
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Insurance"
                          id="insurance"
                          {...register("document_list")}
                        />
                        <label className="form-check-label" htmlFor="insurance">
                          Profile Picture
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Ticket"
                          id="ticket"
                          {...register("document_list")}
                        />
                        <label className="form-check-label" htmlFor="ticket">
                          Air Ticket
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="Hotel Booking"
                          id="hotelBooking"
                          {...register("document_list")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="hotelBooking"
                        >
                          Hotel Booking
                        </label>
                      </div>
                    </div>

                    {/* document list like [list of ids, passport, visa, id, profile picture, air tickets],  */}
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <button
                      type="button"
                      className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailLayer;
