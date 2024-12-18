import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

const EditData = ({ editUserData, setShowModal }) => {
  const username = localStorage.getItem("username");
  console.log("type of username", typeof username);
  console.log("edit user data", editUserData);
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
      if (!selectFile) {
        const updatedData = { ...data, username };
        const response = await axios.post(
          `http://localhost:3000/user-data/update/${editUserData.id}`,
          updatedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.is_success) {
          toast.success("User Data updated successfully.");
          setShowModal(false);
        } else {
          toast.error("Failed to update data.");
        }
      } else {
        const updatedData = { ...data, file: selectFile, username };
        const response = await axios.post(
          `http://localhost:3000/user-data/update/${editUserData.id}`,
          updatedData,
          {
            headers: {
              "Content-Type": "formData/multipart",
            },
          }
        );
        if (response.data.is_success) {
          toast.success("Data updated successfully.");
          setShowModal(false);
        } else {
          toast.error("Failed to update data.");
        }
      }
    } catch (error) {
      toast.error("Error while updating data.");
    }
  };
  return (
    <div>
      <>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          {/* file */}
          <div className=" w-100 d-flex flex-column align-items-center justify-content-center">
            <div className="col-12 mb-20">
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
            <div className=" col-12">
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
                <input
                  defaultValue={editUserData.document_type}
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button type="submit" className="btn btn-success">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </>
    </div>
  );
};

export default EditData;
