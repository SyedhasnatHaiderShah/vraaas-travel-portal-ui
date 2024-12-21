import React, { useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios, { all } from "axios";
import { toast } from "react-toastify";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import EditData from "./EditData";
import { IoClose } from "react-icons/io5";
import { FaDownload, FaEdit } from "react-icons/fa";

const UserUploadDocument = () => {
  const username = localStorage.getItem("username");
  const user_id = localStorage.getItem("user_id");
  const fileInputRef = useRef(null);
  const [selectFile, setSelectFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [allUserData, setAllUserData] = useState([]);
  console.log("all user data", allUserData);
  const [loading, setLoading] = useState(true);

  const [showImageModal, setShowImageModal] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
      fileInputRef.current.value = "";
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
      // formData.append("document_id", data.document_id);
      formData.append("document_name", data.document_name);
      formData.append("document_type", data.document_type);
      formData.append("username", username);
      formData.append("file", selectFile);

      console.log("form data:", formData);

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
      console.error(error.response?.data);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const getUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/user-data/all/${username}`
      );
      console.log("username data", response.data);
      if (response.data.is_success === true) {
        setAllUserData(response.data.data);
      } else {
        // toast.error(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      // toast.error("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  // Edit Handler
  const handleEdit = (id) => {
    console.log("all user data new", allUserData[id.value || id]);
    const actualId = id.value || id; // Update this line based on the actual structure

    const selectedData = allUserData.find((item) => item.id === actualId) || [
      actualId,
    ];
    console.log("Selected Data:", selectedData);

    if (selectedData) {
      setEditData(selectedData[0]);
      setShowModal(true);
    } else {
      toast.error("Data not found.");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Modal Content
  const renderModal = () => (
    <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden={!showModal}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header ">
            <div className=" d-flex align-items-center justify-content-between w-100">
              <h5 className="modal-title">
                Update Your Document {editData.document_name || ""}
              </h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                Close
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            {editData && (
              <EditData
                editUserData={editData}
                setShowModal={setShowModal}
                getUserData={getUserData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const handleDelete = async (id) => {
    if (!id || typeof id !== "number") {
      toast.error("Invalid ID for deletion.");
      return;
    }

    // SweetAlert2 confirmation popup
    const result = await Swal.fire({
      title: "Are you sure to delete this data?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          `http://localhost:3000/user-data/delete/${id}`
        );
        if (response.data.is_success) {
          Swal.fire("Deleted!", response.data.message, "success");
          setAllUserData(allUserData.filter((item) => item.id !== id));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Failed to delete data.");
      }
    }
  };

  const handleDownload = async (fileUrl) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob",
      });
      const fileBlob = response.data;
      const fileName = fileUrl.split("/").pop();
      const url = window.URL.createObjectURL(fileBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  // handlePreview
  const handleImageClick = (imageUrl) => {
    setImagePreviewUrl(imageUrl);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setImagePreviewUrl(null);
  };

  React.useEffect(() => {
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
            <div className="text-center border border-top-0 border-start-0 border-end-0">
              <img
                src={
                  localStorage.getItem("profile_picture") ||
                  "assets/images/user-grid/user-grid-img14.png"
                }
                alt=""
                className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
              />
              <h6 className="mb-0 mt-16">
                {localStorage.getItem("username") || "Username"}
              </h6>
              <span className="text-secondary-light mb-16">
                {localStorage.getItem("email") || "Email"}
              </span>
            </div>
            <div className="mt-24 text-center">
              <h6 className="text-xl mb-16">Upload & Edit Your Documents</h6>
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
                  To Upload the Docuement
                </h6>
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                  {/* file */}
                  {/* // passport, id, visa, air_ticket, other_document, itinerary */}
                  <div className=" w-100 d-flex flex-column align-items-center justify-content-center gap-3 flex-md-row ">
                    <div className="col-12 col-md-6 mb-20">
                      <label className="form-label">Document Photo</label>
                      <input
                        className="form-control"
                        type="file"
                        // accept image / pdf document
                        accept="image/*, application/pdf"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        required=""
                      />
                      <div className="invalid-feedback">
                        Please choose a file.
                      </div>
                    </div>
                    <div className=" col-12 col-md-6">
                      {preview && (
                        <div className="mt-3 relative">
                          <img
                            src={preview}
                            alt="Selected File"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "80px",
                              borderRadius: "10px",
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
                    {/* <div className="col-sm-6">
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
                    </div> */}
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
                        <select
                          name=""
                          id=""
                          className="form-control radius-8"
                          {...register("document_type", { required: true })}
                          //   defaultValue={editUserData?.data?.role || ""}
                        >
                          {/* <option value="leader">Leader</option> */}
                          <option value="Passport">Passport</option>
                          <option value="ID">ID</option>
                          <option value="Visa">Visa</option>
                          <option value="Air Ticket">Air Ticket</option>
                          <option value="Other Document">Other Document</option>
                          <option value="Itinerary">Itinerary</option>
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
                          Document Type
                        </label>
                        <input
                          value={selectFile?.type || ""}
                          type="text"
                          className="form-control radius-8 bg-gray-100"
                          id="number"
                          placeholder="Enter Document Type"
                          {...register("document_type", { required: true })}
                        />
                      </div>
                    </div> */}
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

      {showImageModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered w-100">
            <div className="modal-content  w-100">
              <div className="modal-header w-100">
                <h5 className="modal-title d-flex align-items-center justify-content-between w-100">
                  <span>Preview</span>
                </h5>
                <div
                  className=" d-flex align-items-center"
                  onClick={closeImageModal}
                >
                  <button type="button" className="close">
                    Close{" "}
                  </button>
                  <IoClose
                    size="30px"
                    className=" absolute top-0 right-0 text-danger cursor-pointer"
                  />
                </div>
              </div>
              <div className="modal-body">
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="img-fluid"
                  style={{ maxHeight: "500px", width: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* all user data */}
      <div className="col-lg-8 mx-auto">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center text-center">
            <h5 className="card-title mb-0 text-center">
              User Uploaded Documents
            </h5>
          </div>
          <div className="card-body">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : allUserData.length === 0 ? (
              <div className="text-center text-muted">No data found</div>
            ) : isSmallScreen ? (
              <div className="d-flex flex-column gap-3">
                {allUserData.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded p-3 align-items-center justify-content-center d-flex flex-column"
                  >
                    <div className="mb-2">
                      <img
                        src={item.secure_url}
                        alt={item.document_name || "Document"}
                        className="img-thumbnail"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          borderRadius: "8px",
                          objectFit: "cover",
                          objectPosition: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleImageClick(item.secure_url)}
                      />
                    </div>
                    <div>
                      <strong>Document Name:</strong>{" "}
                      {item.document_name || "Untitled"}
                    </div>
                    <div>
                      <strong>Document Type:</strong> {item.document_type}
                    </div>
                    <div>
                      <strong>Extension:</strong> {item.document_extension}
                    </div>
                    <div className="d-flex align-items-center gap-2 my-3 flex-column w-100 ">
                      <button
                        className="border border-info-600 btn-sm bg-hover-info-200 text-info-600 text-md px-20 py-15 rounded-pill d-flex align-items-center justify-content-center gap-2 w-50"
                        onClick={() => handleEdit(item)}
                      >
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                      <button
                        className="border border-danger-600 btn-sm bg-hover-danger-200 text-danger-600 text-md px-20 py-15 rounded-pill d-flex align-items-center justify-content-center gap-2 w-50"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                      <button
                        className="border border-success-600 btn-sm bg-hover-success-200 text-success-600 text-md px-20 py-15 rounded-pill d-flex align-items-center justify-content-center gap-2 w-50"
                        onClick={() => handleDownload(item.secure_url)}
                      >
                        <i className="bi bi-download"></i> Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="table-responsive h-100">
                <table className="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Preview</th>
                      <th scope="col">Document Name</th>
                      <th scope="col">Document Type</th>
                      <th scope="col">Extension</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUserData.map((item) => (
                      <tr key={item.id} className="">
                        <td>
                          <img
                            src={item.secure_url}
                            alt={item.document_name || "Document"}
                            className="img-thumbnail"
                            style={{
                              maxWidth: "120px",
                              maxHeight: "120px",
                              borderRadius: "8px",
                              objectFit: "cover",
                              objectPosition: "center",
                              cursor: "pointer",
                            }}
                            onClick={() => handleImageClick(item.secure_url)}
                          />
                        </td>
                        <td>{item.document_name || "Untitled"}</td>
                        <td>{item.document_type}</td>
                        <td>{item.document_extension}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2 w-100 flex-wrap justify-content-center">
                            {/* edit button */}
                            <button
                              className="border border-info-600 btn-sm bg-hover-info-200 text-info-600 text-md px-20 py-15 rounded-pill d-flex align-items-center justify-content-center gap-2 w-50"
                              onClick={() => handleEdit(item)}
                            >
                              <i className="bi bi-pencil"></i> Edit
                            </button>

                            <button
                              className="border border-danger-600 btn-sm bg-hover-danger-200 text-danger-600 text-md px-20 py-15 rounded-pill d-flex align-items-center justify-content-center gap-2 w-50"
                              onClick={() => handleDelete(item.id)}
                            >
                              <i className="bi bi-trash"></i> Delete
                            </button>
                            <button
                              className="border border-success-600 btn-sm bg-hover-success-200 text-success-600 text-md px-20 py-15 rounded-pill d-flex align-items-center justify-content-center gap-2 w-50"
                              onClick={() => handleDownload(item.secure_url)}
                            >
                              <i className="bi bi-download"></i> Download
                            </button>
                          </div>
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

      {/* Render Modal */}
      {showModal && renderModal()}
    </div>
  );
};

export default UserUploadDocument;
