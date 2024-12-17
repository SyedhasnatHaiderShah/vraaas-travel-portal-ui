import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useRef } from "react";
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
import { IoCameraReverseOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";

const UserDetailLayer = ({ editUserData = {}, setShowModal }) => {
  // save in upload document table

  // passport, id, visa, air_ticket, other_document, itinerary
  const passportInputRef = useRef(null);
  const [selectPassport, setSelectPassport] = React.useState(null);
  const [previewPassport, setPreviewPassport] = React.useState(null);

  const idInputRef = useRef(null);
  const [selectId, setSelectId] = React.useState(null);
  const [previewId, setPreviewId] = React.useState(null);

  const visaInputRef = useRef(null);
  const [selectVisa, setSelectVisa] = React.useState(null);
  const [previewVisa, setPreviewVisa] = React.useState(null);

  const airTicketInputRef = useRef(null);
  const [selectAirTicket, setSelectAirTicket] = React.useState(null);
  const [previewAirTicket, setPreviewAirTicket] = React.useState(null);

  const otherDocumentInputRef = useRef(null);
  const [selectOtherDocument, setSelectOtherDocument] = React.useState(null);
  const [previewOtherDocument, setPreviewOtherDocument] = React.useState(null);

  const itineraryInputRef = useRef(null);
  const [selectItinerary, setSelectItinerary] = React.useState(null);
  const [previewItinerary, setPreviewItinerary] = React.useState(null);

  // file change and remove handle for all above
  const passportHandleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectPassport(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPassport(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewPassport(null);
    }
  };

  const passportRemoveFile = () => {
    setSelectPassport(null);
    setPreviewPassport(null);
    if (passportInputRef.current) {
      passportInputRef.current.value = "";
    }
  };

  const idHandleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectId(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewId(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewId(null);
    }
  };

  const idRemoveFile = () => {
    setSelectId(null);
    setPreviewId(null);
    if (idInputRef.current) {
      idInputRef.current.value = "";
    }
  };

  const visaHandleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectVisa(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewVisa(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewVisa(null);
    }
  };

  const visaRemoveFile = () => {
    setSelectVisa(null);
    setPreviewVisa(null);
    if (visaInputRef.current) {
      visaInputRef.current.value = "";
    }
  };

  const airTicketHandleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectAirTicket(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAirTicket(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewAirTicket(null);
    }
  };

  const airTicketRemoveFile = () => {
    setSelectAirTicket(null);
    setPreviewAirTicket(null);
    if (airTicketInputRef.current) {
      airTicketInputRef.current.value = "";
    }
  };

  const otherDocumentHandleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectOtherDocument(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewOtherDocument(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewOtherDocument(null);
    }
  };

  const otherDocumentRemoveFile = () => {
    setSelectOtherDocument(null);
    setPreviewOtherDocument(null);
    if (otherDocumentInputRef.current) {
      otherDocumentInputRef.current.value = "";
    }
  };

  const itineraryHandleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectItinerary(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewItinerary(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewItinerary(null);
    }
  };

  const itineraryRemoveFile = () => {
    setSelectItinerary(null);
    setPreviewItinerary(null);
    if (itineraryInputRef.current) {
      itineraryInputRef.current.value = "";
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        username: editUserData?.data?.username,
        user_id: "2",
        passport: selectPassport,
        id: selectId,
        visa: selectVisa,
        air_ticket: selectAirTicket,
        other_document: selectOtherDocument,
        itinerary: selectItinerary,
      };
      console.log("updated data", updatedData);
      const response = await axios.post(
        `http://localhost:3000/user/update/${editUserData?.data?.username}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
                  editUserData?.data?.profile_picture ||
                  "assets/images/user-grid/user-grid-img14.png"
                }
                alt=""
                className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
              />
              {/* camera icon */}
              <div className="camera-icon">
                <IoCameraReverseOutline size="5em" />
              </div>
              <h6 className="mb-0 mt-16">
                {editUserData?.data?.full_name || "No full name available"}
              </h6>
              <span className="text-secondary-light mb-16">
                {editUserData?.data?.email || "No email available"}
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
                    :{" "}
                    {editUserData?.data?.full_name || "No full name available"}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Username
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {editUserData?.data?.username || "No username available"}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Email
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {editUserData?.data?.email || "No email available"}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Phone Number
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {editUserData?.data?.phone_number || "No phone number"}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Leader ID
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    :{" "}
                    {editUserData?.data?.leader_id || "No leader ID available"}
                  </span>
                </li>
                <li className="d-flex align-items-center gap-1 mb-12">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Role
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {editUserData?.data?.role || "No role available"}
                  </span>
                </li>

                <li className="d-flex align-items-center gap-1">
                  <span className="w-30 text-md fw-semibold text-primary-light">
                    {" "}
                    Country
                  </span>
                  <span className="w-70 text-secondary-light fw-medium">
                    : {editUserData?.data?.country || "No country available"}
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
                          defaultValue={editUserData?.data?.full_name || ""}
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
                          value={editUserData?.data?.email || ""}
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
                          defaultValue={editUserData?.data?.phone_number || ""}
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
                          defaultValue={editUserData?.data?.leader_id || ""}
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
                          defaultValue={editUserData?.data?.role || ""}
                        >
                          <option value="leader">Leader</option>
                          <option value="member">Vendor</option>
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
                          defaultValue={editUserData?.data?.country || ""}
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

                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Passport Number
                        </label>
                        <input
                          defaultValue={
                            editUserData?.data?.passport_number || ""
                          }
                          type="text"
                          className="form-control radius-8"
                          id="number"
                          placeholder="Enter Leader ID"
                          {...register("passport_number", {
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
                          Date of Birth
                        </label>
                        <input
                          defaultValue={editUserData?.data?.leader_id || ""}
                          type="date"
                          className="form-control radius-8"
                          id="number"
                          placeholder="Enter Leader ID"
                          {...register("date_of_birth", {
                            required: "Date of Birth is required",
                            validate: (value) => {
                              const today = new Date();
                              const selectedDate = new Date(value);
                              if (!value) {
                                return "Date of Birth is required";
                              }
                              if (selectedDate > today) {
                                return "Date of Birth cannot be in the future";
                              }
                              const age =
                                today.getFullYear() -
                                selectedDate.getFullYear();
                              const isBeforeBirthdayThisYear =
                                today.getMonth() < selectedDate.getMonth() ||
                                (today.getMonth() === selectedDate.getMonth() &&
                                  today.getDate() < selectedDate.getDate());
                              if (
                                age < 18 ||
                                (age === 18 && isBeforeBirthdayThisYear)
                              ) {
                                return "Age must be at least 18";
                              }
                              if (selectedDate.getFullYear() < 1900) {
                                return "Date of Birth must be after 1900";
                              }
                              return true;
                            },
                          })}
                        />
                      </div>
                    </div>
                    {/* Document Checkboxes */}
                    {/* <div className="col-sm-12">
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
                    </div> */}

                    {/* passport */}
                    <div className=" w-100 d-flex flex-column align-items-center justify-content-center">
                      <div className="col-12 mb-20">
                        <label className="form-label">Upload Passport</label>
                        <input
                          className="form-control"
                          type="file"
                          // accept file image and pdf
                          accept="image/*,application/pdf"
                          onChange={passportHandleFileChange}
                          ref={passportInputRef}
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please choose a file.
                        </div>
                      </div>
                      <div className=" col-12">
                        {previewPassport && (
                          <div className="mt-3 relative">
                            <img
                              src={previewPassport}
                              alt="Selected File"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100px",
                                borderRadius: "8px",
                              }}
                              className="relative"
                            />
                            <MdDeleteForever
                              size="30px"
                              className=" absolute top-0 right-0 text-danger cursor-pointer"
                              onClick={passportRemoveFile}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className=" w-100 d-flex flex-column align-items-center justify-content-center">
                      <div className="col-12 mb-20">
                        <label className="form-label">Upload ID</label>
                        <input
                          className="form-control"
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={idHandleFileChange}
                          ref={idInputRef}
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please choose a file.
                        </div>
                      </div>
                      <div className=" col-12">
                        {previewId && (
                          <div className="mt-3 relative">
                            <img
                              src={previewId}
                              alt="Selected File"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100px",
                                borderRadius: "8px",
                              }}
                              className="relative"
                            />
                            <MdDeleteForever
                              size="30px"
                              className=" absolute top-0 right-0 text-danger cursor-pointer"
                              onClick={idRemoveFile}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className=" w-100 d-flex flex-column align-items-center justify-content-center">
                      <div className="col-12 mb-20">
                        <label className="form-label">Upload Visa</label>
                        <input
                          className="form-control"
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={visaHandleFileChange}
                          ref={visaInputRef}
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please choose a file.
                        </div>
                      </div>
                      <div className=" col-12">
                        {previewVisa && (
                          <div className="mt-3 relative">
                            <img
                              src={previewVisa}
                              alt="Selected File"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100px",
                                borderRadius: "8px",
                              }}
                              className="relative"
                            />
                            <MdDeleteForever
                              size="30px"
                              className=" absolute top-0 right-0 text-danger cursor-pointer"
                              onClick={visaRemoveFile}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className=" w-100 d-flex flex-column align-items-center justify-content-center">
                      <div className="col-12 mb-20">
                        <label className="form-label">Upload Air Ticket</label>
                        <input
                          className="form-control"
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={airTicketHandleFileChange}
                          ref={airTicketInputRef}
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please choose a file.
                        </div>
                      </div>
                      <div className=" col-12">
                        {previewAirTicket && (
                          <div className="mt-3 relative">
                            <img
                              src={previewAirTicket}
                              alt="Selected File"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100px",
                                borderRadius: "8px",
                              }}
                              className="relative"
                            />
                            <MdDeleteForever
                              size="30px"
                              className=" absolute top-0 right-0 text-danger cursor-pointer"
                              onClick={airTicketRemoveFile}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className=" w-100 d-flex flex-column align-items-center justify-content-center">
                      <div className="col-12 mb-20">
                        <label className="form-label">
                          Upload Other Document
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={otherDocumentHandleFileChange}
                          ref={otherDocumentInputRef}
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please choose a file.
                        </div>
                      </div>
                      <div className=" col-12">
                        {previewOtherDocument && (
                          <div className="mt-3 relative">
                            <img
                              src={previewOtherDocument}
                              alt="Selected File"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100px",
                                borderRadius: "8px",
                              }}
                              className="relative"
                            />
                            <MdDeleteForever
                              size="30px"
                              className=" absolute top-0 right-0 text-danger cursor-pointer"
                              onClick={otherDocumentRemoveFile}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className=" w-100 d-flex flex-column align-items-center justify-content-center">
                      <div className="col-12 mb-20">
                        <label className="form-label">Upload Itinerary </label>
                        <input
                          className="form-control"
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={itineraryHandleFileChange}
                          ref={itineraryInputRef}
                          required=""
                        />
                        <div className="invalid-feedback">
                          Please choose a file.
                        </div>
                      </div>
                      <div className=" col-12">
                        {previewItinerary && (
                          <div className="mt-3 relative">
                            <img
                              src={previewItinerary}
                              alt="Selected File"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100px",
                                borderRadius: "8px",
                              }}
                              className="relative"
                            />
                            <MdDeleteForever
                              size="30px"
                              className=" absolute top-0 right-0 text-danger cursor-pointer"
                              onClick={itineraryRemoveFile}
                            />
                          </div>
                        )}
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
