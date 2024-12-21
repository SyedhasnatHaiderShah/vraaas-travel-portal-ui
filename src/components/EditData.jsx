import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

const EditData = ({ editUserData, setShowModal, getUserData }) => {
  const username = localStorage.getItem("username");
  const id = editUserData.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const fileInputRef = useRef(null);
  const [selectFile, setSelectFile] = React.useState(null);
  console.log(selectFile);
  const [preview, setPreview] = React.useState(null);
  const [editData, setEditData] = useState(null);
  console.log("edit data", editData);

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

  const onSubmit = async (data) => {
    try {
      const fileData = { file: selectFile, ...data };
      const noFile = { ...data };
      if (selectFile) {
        try {
          const response = await axios.post(
            `http://localhost:3000/user-data/update/${id}`,
            fileData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.data.is_success) {
            toast.success("You document data updated successfully.");
            getUserData();
            setShowModal(false);
          } else {
            toast.error("Failed to update the Document.");
          }
        } catch (error) {
          toast.error("Error while updating Document.");
        }
      } else {
        try {
          const response = await axios.post(
            `http://localhost:3000/user-data/update/${id}`,
            noFile,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.data.is_success) {
            toast.success("You document data updated successfully.");
            getUserData();
            setShowModal(false);
          } else {
            toast.error("Failed to update  Document.");
          }
        } catch (error) {
          toast.error("Error while updating  Document.");
        }
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  // const onSubmit = async (data) => {
  //   try {
  //     // Determine if a file is selected
  //     const isFileIncluded = !!selectFile;

  //     // Prepare data
  //     let payload;
  //     let headers;

  //     if (isFileIncluded) {
  //       // Construct FormData for file upload
  //       const formData = new FormData();
  //       formData.append("file", selectFile);
  //       Object.keys(data).forEach((key) => {
  //         formData.append(key, data[key]);
  //       });

  //       payload = formData;
  //       headers = {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         "Content-Type": "multipart/form-data",
  //       };
  //     } else {
  //       // Use JSON payload when no file is included
  //       payload = { ...data };
  //       headers = {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         "Content-Type": "application/json",
  //       };
  //     }

  //     console.log("Payload being sent:", payload);

  //     // Make the API request
  //     const response = await axios.post(
  //       `http://localhost:3000/user-data/update/${editUserData.id}`,
  //       payload,
  //       { headers }
  //     );

  //     // Handle success
  //     if (response.data.is_success) {
  //       toast.success("Your data has been updated successfully!");
  //     } else {
  //       toast.error("Failed to update your data.");
  //     }
  //   } catch (error) {
  //     console.error("Error during update:", error);
  //     toast.error(error.message || "Error while updating your data.");
  //   }
  // };

  return (
    <div>
      <>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          {/* file */}
          <div className=" w-100 d-flex flex-column align-items-center justify-content-center flex-wrap flex-md-row gap-2">
            <div className="col-12 col-md-6 mb-20">
              <label className="form-label">Document Photo</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                required=""
                onChange={handleFileChange}
              />
              <div className="invalid-feedback">Please choose a file.</div>
            </div>
            <div className=" col-12 col-md-6">
              {preview ? (
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
              ) : (
                <div className="mt-3 relative">
                  <img
                    src={preview || editUserData.secure_url}
                    alt="Selected File"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100px",
                      borderRadius: "8px",
                    }}
                    className="relative"
                  />
                  {/* <MdDeleteForever
                            size="30px"
                            className=" absolute top-0 right-0 text-danger cursor-pointer"
                            onClick={handleRemoveFile}
                          /> */}
                </div>
              )}
              {/* {editData.secure_url && (
                        <div className="mt-3 relative">
                          <img
                            src={preview || editData.secure_url}
                            alt="Selected File"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100px",
                              borderRadius: "8px",
                            }}
                            className="relative"
                          />
                        </div>
                      )} */}
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
                  defaultValue={editUserData.document_id}
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
                  defaultValue={editUserData.document_name}
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
                  defaultValue={editUserData?.document_type || ""}
                >
                  <option value="Passport">Passport</option>
                  <option value="ID">ID</option>
                  <option value="Visa">Visa</option>
                  <option value="Air Ticket">Air Ticket</option>
                  <option value="Other Document">Other Document</option>
                  <option value="Itinerary">Itinerary</option>
                </select>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center gap-3 flex-column flex-md-row">
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button type="submit" className="btn btn-success">
                Update Document
              </button>
            </div>
          </div>
        </form>
      </>
    </div>
  );
};

export default EditData;
