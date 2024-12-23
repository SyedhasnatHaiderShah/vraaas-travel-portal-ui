import React, { useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios, { all } from "axios";
import { toast } from "react-toastify";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import EditData from "./EditData";
import { IoClose } from "react-icons/io5";
import { FaDownload, FaEdit } from "react-icons/fa";

const UserDataLayer = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const user_id = localStorage.getItem("user_id");
  const fileInputRef = useRef(null);
  const [selectFile, setSelectFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [allUserData, setAllUserData] = useState([]);
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

      if (selectFile) {
        formData.append("file", selectFile);
      }
      const response = await axios.post(
        "http://localhost:3000/user-data/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
        `http://localhost:3000/user-data/all/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    console.log(id);
    const selectedData = allUserData.find((item) => item.id === id);
    if (selectedData) {
      setEditData(selectedData);
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
              <h5 className="modal-title">Edit User Data</h5>
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
          {/* <div className="modal-body">
            {editData && (
              <EditData editUserData={editData} setShowModal={setShowModal} />
            )}
          </div> */}
        </div>
      </div>
    </div>
  );

  // const handleDelete = async (id) => {
  //   if (!id || typeof id !== "number") {
  //     toast.error("Invalid ID for deletion.");
  //     return;
  //   }

  //   // SweetAlert2 confirmation popup
  //   // const result = await Swal.fire({
  //   //   title: "Are you sure to delete this data?",
  //   //   text: "You won't be able to revert this!",
  //   //   icon: "warning",
  //   //   showCancelButton: true,
  //   //   confirmButtonColor: "#d33",
  //   //   cancelButtonColor: "#3085d6",
  //   //   confirmButtonText: "Yes, delete it!",
  //   // });

  //   // if (result.isConfirmed) {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:3000/user-data/delete/${id}`
  //     );
  //     if (response.data.is_success) {
  //       // Swal.fire("Deleted!", response.data.message, "success");
  //       setAllUserData(allUserData.filter((item) => item.id !== id));
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Failed to delete data.");
  //   }
  //   // }
  // };
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
          `http://localhost:3000/user-data/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">User Uploaded Documents</h5>
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
                    className="border rounded p-3 flex-column d-flex align-items-center justify-content-center w-100"
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
                    <div className="d-flex align-items-center gap-2 mt-2 justify-content-center flex-column w-100">
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
                      <tr key={item.id}>
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
                          <div className="d-flex align-items-center gap-2 w-100">
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

export default UserDataLayer;
