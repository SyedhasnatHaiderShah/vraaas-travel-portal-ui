import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import PassportUpload from "./TravelDocuments/PassportUpload";
import IdUpload from "./TravelDocuments/IdUpload";
import VisaUpload from "./TravelDocuments/VisaUpload";
import InsuranceUpload from "./TravelDocuments/InsuranceUpload";
import TicketUpload from "./TravelDocuments/TicketUpload";
import HotelBookingUpload from "./TravelDocuments/HotelBookingUpload";
import ItineraryUpload from "./TravelDocuments/ItineraryUpload";
import CountryStatusOne from "./child/CountryStatusOne";
import { allCountries } from "../utils/countries";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
// import MdDeleteForever
import { MdDeleteForever } from "react-icons/md";

const UserDataLayer = () => {
  const fileInputRef = useRef(null);
  const [selectFile, setSelectFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
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
      // Create a FormData instance
      const formData = new FormData();
      formData.append("user_id", "2");
      formData.append("document_id", data.document_id);
      formData.append("document_name", data.document_name);
      formData.append("document_type", data.document_type);

      if (selectFile) {
        formData.append("file", selectFile);
      }

      // Make the request using axios
      const response = await axios.post(
        "http://localhost:3000/user-data/save",
        formData
      );

      if (response.data.is_success === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.response?.data); // Log error response for debugging
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  // get all the user data
  const [allUserData, setAllUserData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/user-data/all");
      console.log(response.data);
      if (response.data.is_success === true) {
        setAllUserData(response.data.data);
      } else {
        // toast.error(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      // toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  const handleEdit = (id) => {};

  const handleDelete = async (id) => {
    if (!id || typeof id !== "number") {
      toast.error("Invalid ID for deletion.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/user-data/delete/${id}`
      );
      if (response.data.is_success) {
        toast.success(response.data.message);
        setData(data.filter((item) => item.id !== id)); // Remove item from the local state
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to delete data.");
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
                src="assets/images/user-grid/user-grid-img14.png"
                alt=""
                className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
              />
              <h6 className="mb-0 mt-16">Jacob Jones</h6>
              <span className="text-secondary-light mb-16">
                ifrandom@gmail.com
              </span>
            </div>
            <div className="mt-24">
              <h6 className="text-xl mb-16">User Data</h6>
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
                  Upload the data
                </h6>
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                  {/* file */}
                  <div className=" w-100 d-flex flex-column align-items-center justify-content-center">
                    <div className="col-12 mb-20">
                      <label className="form-label">Document Photo</label>
                      <input
                        className="form-control"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        required=""
                      />
                      <div className="invalid-feedback">
                        Please choose a file.
                      </div>
                    </div>
                    <div className=" col-12">
                      {preview && (
                        <div className="mt-3 relative">
                          <img
                            src={preview}
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
                            onClick={handleRemoveFile}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Document ID
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="number"
                          placeholder="Enter Document ID"
                          {...register("document_id", {
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
                          Document Name
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="number"
                          placeholder="Enter Document Name"
                          {...register("document_name", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="number"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Document Type
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="number"
                          placeholder="Enter Document Type"
                          {...register("document_type", { required: true })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-3 flex-column flex-md-row">
                    <button
                      type="button"
                      className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
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

      {/* all user data */}
      <div className="col-lg-8 mx-auto">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">User Documents</h5>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : data.length === 0 ? (
              <div className="text-center text-muted">No data found</div>
            ) : (
              <div className="table-responsive ">
                <table className="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Preview</th>
                      <th scope="col">Document Name</th>
                      <th scope="col">Document ID</th>
                      <th scope="col">Document Type</th>
                      <th scope="col">Extension</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUserData.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={item.secure_url}
                            alt={item.document_name || "Document"}
                            className="img-thumbnail"
                            style={{ maxWidth: "50px" }}
                          />
                        </td>
                        <td>{item.document_name || "Untitled"}</td>
                        <td>{item.document_id || "Untitled"}</td>
                        <td>{item.document_type}</td>
                        <td>{item.document_extension}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDataLayer;
