import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserDetailLayer from "./UserDetailLayer";

const UsersListLayer = () => {
  const [users, setUsers] = React.useState([]);
  const [showModal, setShowModal] = useState(false);
  const [singleUser, setSingleUser] = React.useState(null);
  const [editData, setEditData] = useState(null);

  const getAllUsers = async () => {
    try {
      const responce = await axios.get("http://localhost:3000/user/all");
      setUsers(responce.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // get user by user name http://localhost:3000/user/username
  const getUserByUserName = async (name) => {
    try {
      const responce = await axios.get(`http://localhost:3000/user/${name}`);
      console.log(responce.data);
      setSingleUser(responce.data);
      setShowModal(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  // get users from the data base http://localhost:3000/user/all
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleEdit = (id) => {
    console.log(id);
    const selectedData = users.find((item) => item.id === id);
    if (selectedData) {
      setEditData(selectedData);
      setShowModal(true);
    } else {
      toast.error("Data not found.");
    }
  };

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
      <div
        className="modal-dialog modal-dialog-centered w-100"
        role="document"
        style={{ margin: 0, maxWidth: "100%" }}
      >
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
          <div className="modal-body">
            {singleUser && (
              <UserDetailLayer
                editUserData={singleUser}
                setShowModal={setShowModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
        <div className="d-flex align-items-center flex-wrap gap-3">
          <span className="text-md fw-medium text-secondary-light mb-0">
            Show
          </span>
          <select
            className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
            defaultValue="Select Number"
          >
            <option value="Select Number" disabled>
              Select Number
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <form className="navbar-search">
            <input
              type="text"
              className="bg-base h-40-px w-auto"
              name="search"
              placeholder="Search"
            />
            <Icon icon="ion:search-outline" className="icon" />
          </form>
          <select
            className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px"
            defaultValue="Select Status"
          >
            <option value="Select Status" disabled>
              Select Status
            </option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <Link
          to="/add-user"
          className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
        >
          <Icon
            icon="ic:baseline-plus"
            className="icon text-xl line-height-1"
          />
          Add New User
        </Link>
      </div>

      {/* all user table data */}
      <div className="card-body p-24">
        {/* {users.map((user, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.created_at}</td>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.leader_id}</td>
              <td className="text-center">
                <span className="badge bg-success">Active</span>
              </td>
              <td className="text-center">
                <div className="d-flex align-items-center gap-10 justify-content-center">
                  <button
                    type="button"
                    className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                  >
                    <Icon
                      icon="material-symbols:edit-outline-rounded"
                      className="icon text-xl"
                    />
                  </button>
                  <button
                    type="button"
                    className="bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                  >
                    <Icon
                      icon="fluent:delete-24-regular"
                      className="menu-icon"
                    />
                  </button>
                </div>
              </td>
            </tr>
          );
        })} */}

        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-check style-check d-flex align-items-center">
                      <input
                        className="form-check-input radius-4 border input-form-dark"
                        type="checkbox"
                        name="checkbox"
                        id="selectAll"
                      />
                    </div>
                    Sr. #
                  </div>
                </th>
                <th scope="col">Join Date</th>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Leader ID</th>
                <th scope="col">Role</th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col" className="text-center">
                  Action
                </th>
              </tr>
            </thead>

            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tbody key={index}>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-10">
                        <div className="form-check style-check d-flex align-items-center">
                          <input
                            className="form-check-input radius-4 border border-neutral-400"
                            type="checkbox"
                            name="checkbox"
                          />
                        </div>
                        {index + 1}
                      </div>
                    </td>
                    <td>{user.created_at.slice(0, 10)}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={
                            user.secure_url
                              ? user.secure_url
                              : "assets/images/user-list/user-list1.png"
                          }
                          alt="Vraaas Travel and Tour"
                          className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                        />
                        <div className="flex-grow-1">
                          <span className="text-md mb-0 fw-normal text-secondary-light">
                            {user.full_name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-md mb-0 fw-normal text-secondary-light">
                        {user.email}
                      </span>
                    </td>
                    <td>{user.phone_number}</td>
                    <td>{user.leader_id}</td>
                    <td>{user.role}</td>
                    <td className="text-center">
                      <span
                        className={`bg-success-focus ${
                          user.is_verified
                            ? "bg-success-focus border border-success-main"
                            : "bg-danger-focus border border-danger-main"
                        } text-success-600 border border-success-main px-24 py-4 radius-4 fw-medium text-sm`}
                      >
                        {user.is_verified ? "Verified" : "Not Verified"}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-10 justify-content-center">
                        <button
                          type="button"
                          className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                          onClick={() => {
                            getUserByUserName(user.username);
                          }}
                        >
                          <Icon
                            icon="majesticons:eye-line"
                            className="icon text-xl"
                          />
                        </button>
                        <button
                          type="button"
                          className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon icon="lucide:edit" className="menu-icon" />
                        </button>
                        <button
                          type="button"
                          className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                        >
                          <Icon
                            icon="fluent:delete-24-regular"
                            className="menu-icon"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td colSpan="9" className="text-center">
                    No data found
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        {/* Render Modal */}
        {showModal && renderModal()}
        {/* pagination */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
          <span>
            Showing 1 to {users.length} of {users.length} entries
          </span>
          <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
            <li className="page-item">
              <Link
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px  text-md"
                to="#"
              >
                <Icon icon="ep:d-arrow-left" className="" />
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md bg-primary-600 text-white"
                to="#"
              >
                1
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px"
                to="#"
              >
                2
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                to="#"
              >
                3
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                to="#"
              >
                4
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md"
                to="#"
              >
                5
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px  text-md"
                to="#"
              >
                {" "}
                <Icon icon="ep:d-arrow-right" className="" />{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsersListLayer;
