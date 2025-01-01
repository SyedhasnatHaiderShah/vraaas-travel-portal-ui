import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useRef, useEffect } from "react";
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
import { FaCamera } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";

const ViewUserDetailLayer = () => {
  // image profile function
  const [selectProfileImage, setSelectProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectProfileImage(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImagePreview(imageUrl);
    }
  };

  const removeSelectedImage = () => {
    setSelectProfileImage(null);
    setProfileImagePreview(null);
  };

  const profileImageHandle = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectProfileImage);

      const response = await axios.post(
        `http://localhost:3000/user/profile-picture/${username}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.is_success) {
        toast.success(response.data.message);
        // Optionally, update the state with the new profile picture
        localStorage.setItem(
          "profile_picture",
          response.data.data.profile_picture
        );
        setProfileImagePreview(null); // Clear preview
        setSelectProfileImage(null); // Clear selected file
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error); // Log full error
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  // end

  const username = localStorage.getItem("username");

  const [editUserData, setEditUserData] = useState({});
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
    reset,
    formState: { errors },
  } = useForm();

  const resetForm = () => {
    reset(); // Reset react-hook-form fields

    // Clear file inputs and previews
    setSelectPassport(null);
    setPreviewPassport(null);
    if (passportInputRef.current) passportInputRef.current.value = "";

    setSelectId(null);
    setPreviewId(null);
    if (idInputRef.current) idInputRef.current.value = "";

    setSelectVisa(null);
    setPreviewVisa(null);
    if (visaInputRef.current) visaInputRef.current.value = "";

    setSelectAirTicket(null);
    setPreviewAirTicket(null);
    if (airTicketInputRef.current) airTicketInputRef.current.value = "";

    setSelectOtherDocument(null);
    setPreviewOtherDocument(null);
    if (otherDocumentInputRef.current) otherDocumentInputRef.current.value = "";

    setSelectItinerary(null);
    setPreviewItinerary(null);
    if (itineraryInputRef.current) itineraryInputRef.current.value = "";
  };

  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        // username: editUserData?.data?.username,
        user_id: localStorage.getItem("user_id"),
        passport: selectPassport,
        id: selectId,
        visa: selectVisa,
        air_ticket: selectAirTicket,
        other_document: selectOtherDocument,
        itinerary: selectItinerary,
      };
      console.log("updated data", updatedData);
      const response = await axios.post(
        `http://localhost:3000/user/update/${username}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.is_success === true) {
        // resetForm();
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

  // get user data from the server
  const getUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/complete-detail/${username}`
      );
      if (response.data.is_success === true) {
        // resetForm();
        // toast.success(response.data.message);
        setEditUserData(response.data);
        console.log("edit user data", response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.response.data); // Log the full error
      toast.error(error.response?.data?.message || "An error occurred");

      toast.error(error.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

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
            {/* start profile image */}

            <div className="text-center border border-top-0 border-start-0 border-end-0 position-relative">
              <div className="position-relative w-200-px h-200-px d-inline-block">
                {/* Profile Image */}
                <img
                  src={
                    profileImagePreview ||
                    editUserData?.data?.profile_picture ||
                    "assets/images/user-grid/user-grid-img14.png"
                  }
                  alt="Profile"
                  className="border br-white border-width-2-px w-100 h-100 rounded-circle object-fit-cover position-relative"
                />

                {/* Camera Icon Button */}
                {/* <button
                  htmlFor="profile-photo-upload"
                  className="position-absolute bottom-2 end-0  p-2 cursor-pointer"
                  style={{ transform: "translate(-50%, 50%)" }}
                >
                  <FaCamera style={{ fontSize: "1.5rem" }} />
                </button> */}

                {/* Remove Button */}
              </div>

              {/* Update Button */}
              <div className=" d-flex align-items-center justify-content-center gap-2  w-100 mt-16 ">
                <div className="  ">
                  {profileImagePreview && (
                    <button
                      className="btn  btn-sm "
                      onClick={removeSelectedImage}
                      style={{
                        backgroundColor: "#ce1d52",
                        color: "#fff",
                      }}
                    >
                      Cancel
                      {/* <AiFillDelete
                        style={
                          {
                            fontSize: "1.5rem",
                            // color: "#ce1d52",
                          }
                        }
                      /> */}
                    </button>
                  )}
                </div>
                <div>
                  {selectProfileImage && (
                    <button
                      className="btn btn-sm"
                      onClick={profileImageHandle}
                      style={{
                        backgroundColor: "#439ab6",
                        color: "#fff",
                      }}
                    >
                      Update
                    </button>
                  )}
                  {/* {!selectProfileImage && ( */}
                </div>
                <div>
                  <label
                    htmlFor="profile-photo-upload"
                    className="btn btn-sm"
                    style={{
                      backgroundColor: "#22C55E",
                      color: "#fff",
                    }}
                  >
                    Upload <FaCamera style={{ fontSize: "1.2rem" }} />
                  </label>
                  {/* )} */}
                  <input
                    type="file"
                    id="profile-photo-upload"
                    accept="image/*"
                    className="d-none"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              {/* User Information */}
              <h6 className="mb-0 mt-3">
                {editUserData?.data?.full_name || "No full name available"}
              </h6>
              <span className="text-secondary-light mb-16">
                {editUserData?.data?.email || "No email available"}
              </span>
            </div>
            {/* <div className="text-center border border-top-0 border-start-0 border-end-0 position-relative">
              <div className="position-relative w-200-px h-200-px d-inline-block">
                <img
                  src={
                    profileImagePreview ||
                    editUserData?.data?.profile_picture ||
                    "assets/images/user-grid/user-grid-img14.png"
                  }
                  alt="Profile"
                  className="border br-white border-width-2-px w-100 h-100 rounded-circle object-fit-cover position-relative"
                />
                <label
                  htmlFor="profile-photo-upload"
                  className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2 cursor-pointer"
                  style={{ transform: "translate(50%, 50%)" }}
                >
                  <i className="bi bi-camera-fill text-white">Camera Icon</i>
                </label>
                <input
                  type="file"
                  id="profile-photo-upload"
                  accept="image/*"
                  className="d-none"
                  onChange={handleImageChange}
                />
                {selectProfileImage && (
                  <button
                    className="btn btn-primary mt-2"
                    onClick={profileImageHandle}
                  >
                    Update Profile Picture
                  </button>
                )}
              </div>
              <h6 className="mb-0 mt-16">
                {editUserData?.data?.full_name || "No full name available"}
              </h6>
              <span className="text-secondary-light mb-16">
                {editUserData?.data?.email || "No email available"}
              </span>
            </div> */}

            {/* <div className="text-center border border-top-0 border-start-0 border-end-0 position-relative">
              <img
                src={
                  editUserData?.data?.profile_picture ||
                  "assets/images/user-grid/user-grid-img14.png"
                }
                alt=""
                className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover position-relative"
              />
              <h6 className="mb-0 mt-16">
                {editUserData?.data?.full_name || "No full name available"}
              </h6>
              <span className="text-secondary-light mb-16">
                {editUserData?.data?.email || "No email available"}
              </span>
            </div> */}

            {/* end */}
            <div className="card mt-4">
              <div
                className="card-header "
                style={{ backgroundColor: "#439ab6" }}
              >
                <h6 className="text-xl mb-0">Personal Info</h6>
              </div>
              <div className="card-body">
                <ul className="list-unstyled mb-0">
                  <li className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <span className="fw-semibold ">Full Name</span>
                    <span className="text-secondary">
                      {editUserData?.data?.full_name ||
                        "No full name available"}
                    </span>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <span className="fw-semibold">Username</span>
                    <span className="text-secondary">
                      {editUserData?.data?.username || "No username available"}
                    </span>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <span className="fw-semibold">Email</span>
                    <span className="text-secondary">
                      {editUserData?.data?.email || "No email available"}
                    </span>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <span className="fw-semibold">Phone Number</span>
                    <span className="text-secondary">
                      {editUserData?.data?.phone_number || "No phone number"}
                    </span>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <span className="fw-semibold">Leader ID</span>
                    <span className="text-secondary">
                      {editUserData?.data?.leader_id ||
                        "No leader ID available"}
                    </span>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <span className="fw-semibold">Role</span>
                    <span className="text-secondary">
                      {editUserData?.data?.role || "No role available"}
                    </span>
                  </li>
                  <li className="d-flex justify-content-between align-items-center py-2">
                    <span className="fw-semibold">Country</span>
                    <span className="text-secondary">
                      {editUserData?.data?.otherDetail?.country ||
                        "No country available"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card h-100">
          <div className="card-body p-24">
            <div className="tab-content" id="pills-tabContent">
              <div>
                <h6 className="text-md-light mb-16">Update Profile Detail</h6>
                <form
                  action="#"
                  onSubmit={handleSubmit(onSubmit)}
                  className=" w-100"
                >
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold-light text-sm mb-8"
                        >
                          Full Name
                        </label>
                        <input
                          defaultValue={editUserData?.data?.full_name || "N/A"}
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
                          className="form-label fw-semibold-light text-sm mb-8"
                        >
                          Email
                        </label>
                        <input
                          value={editUserData?.data?.email || "N/A"}
                          type="email"
                          className="form-control radius-8 bg-dark-200 bg-dark-200"
                          id="number"
                          // placeholder="Enter Secondary phone number"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6 p-1">
                      <label className="form-label">Phone Number</label>
                      <div className="icon-field has-validation">
                        <span className="icon">
                          <Icon icon="solar:phone-calling-linear" />
                        </span>
                        <input
                          type="text"
                          name="phone_number"
                          className="form-control"
                          placeholder="+15550000000"
                          required=""
                          {...register("phone_number", {
                            required: "Phone Number is required",
                            validate: (value) => {
                              if (!/^\+[0-9]{1,14}$/.test(value)) {
                                return "Phone Number must start with + and contain up to 15 digits";
                              }
                              return true;
                            },
                          })}
                          onInput={(e) => {
                            // Allow only digits after the "+" and ensure it starts with "+"
                            const value = e.target.value;
                            e.target.value =
                              value[0] === "+"
                                ? "+" +
                                  value
                                    .slice(1)
                                    .replace(/[^0-9]/g, "")
                                    .slice(0, 14)
                                : "+" +
                                  value.replace(/[^0-9]/g, "").slice(0, 14);
                          }}
                        />
                        {errors.phone_number && (
                          <div className="fw-normal text-danger">
                            {errors.phone_number.message}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold-light text-sm mb-8"
                        >
                          Phone Number
                        </label>
                        <input
                          defaultValue={
                            editUserData?.data?.phone_number || "N/A"
                          }
                          type="tel"
                          className="form-control radius-8 bg-dark-200"
                          id="number"
                          placeholder="Enter phone number"
                          {...register("phone_number", { required: true })}
                        />
                      </div>
                    </div> */}
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold-light text-sm mb-8"
                        >
                          Leader ID
                        </label>
                        <input
                          defaultValue={editUserData?.data?.leader_id || "N/A"}
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
                          className="form-label fw-semibold-light text-sm mb-8"
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
                          {/* <option value="leader">Leader</option> */}
                          <option value="">Choose the role</option>
                          <option value="vendor">Vendor</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                          <option value="leader">Leader</option>
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
                          className="form-label fw-semibold-light text-sm mb-8"
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
                    {/* <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold-light text-sm mb-8"
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
                    </div> */}

                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold-light text-sm mb-8"
                        >
                          Passport Number
                        </label>
                        <input
                          defaultValue={
                            editUserData?.data?.otherDetail?.passport_number ||
                            "N/A"
                          }
                          type="text"
                          className="form-control radius-8"
                          id="number"
                          placeholder="Enter Passport Number"
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
                          className="form-label fw-semibold-light text-sm mb-8"
                        >
                          Date of Birth
                        </label>
                        <input
                          defaultValue={
                            editUserData?.data?.otherDetail?.date_of_birth.split(
                              "T"
                            )[0] || ""
                          }
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
                    <div className=" w-100 d-flex flex-column align-items-center justify-content-center border">
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
                  <div className="d-flex align-items-center justify-content-center gap-3 flex-column flex-md-row my-3 w-100">
                    {/* <button
                      type="button"
                      className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                    >
                      Cancel
                    </button> */}
                    <button
                      type="submit"
                      className="btn w-100  text-md px-64 py-12 radius-8"
                      style={{
                        backgroundColor: "#439ab6",
                        color: "#fff",
                      }}
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

export default ViewUserDetailLayer;
