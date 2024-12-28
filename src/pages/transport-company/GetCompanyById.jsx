import React, { useEffect } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { IoMdReturnLeft } from "react-icons/io";

const GetCompanyById = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const [hotelData, setHotelData] = React.useState(null);
  const onSubmit = async (data) => {
    const formatedData = {
      transport_company_id: parseInt(data.transport_company_id),
    };

    try {
      console.log("formated data", formatedData);

      const response = await axios.get(
        `http://localhost:3000/transport-companies/${formatedData.transport_company_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.is_success) {
        setHotelData(response.data.data);
      } else {
        setHotelData(null);
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
          <h3>Get Transport Company by ID</h3>
          <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <div className=" col-12">
              <label className="form-label">Transport Company ID</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  type="text"
                  name="#0"
                  className="form-control"
                  placeholder="Enter Transport Company ID"
                  required=""
                  {...register("transport_company_id", {
                    required: "transport company id is required",
                  })}
                />

                {errors.transport_company_id && (
                  <div className="fw-normal text-danger">
                    {errors.transport_company_id.message}
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
                    All the available hotels list
                  </h5>
                </div>
                {/* card body start */}
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table basic-border-table mb-0">
                      <thead>
                        <tr>
                          <th>Company ID</th>
                          <th>Company Name</th>
                          <th>Address</th>
                          <th>Company Type</th>
                          <th>Details</th>
                          <th>City</th>
                          <th>City ID</th>
                          <th>Country</th>
                          <th>Is Partner?</th>
                          <th>Is Active?</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hotelData ? (
                          <tr>
                            <td>{hotelData.transport_company_id}</td>
                            <td>{hotelData.company_name}</td>
                            <td>{hotelData.address}</td>
                            <td>{hotelData.company_type}</td>
                            <td>{hotelData.details}</td>
                            <td>
                              {hotelData.city
                                ? hotelData.city.city_name
                                : "N/A"}
                            </td>
                            <td>
                              {hotelData.city ? hotelData.city.city_id : "N/A"}
                            </td>
                            <td>
                              {hotelData.city
                                ? hotelData.city.country_id
                                : "N/A"}
                            </td>
                            <td
                              style={{
                                color: hotelData.is_partner ? "green" : "red",
                                fontWeight: "bold",
                              }}
                            >
                              {hotelData.is_partner ? "Yes" : "No"}
                            </td>
                            <td
                              style={{
                                color: hotelData.active ? "green" : "red",
                                fontWeight: "bold",
                              }}
                            >
                              {hotelData.active ? "Yes" : "No"}
                            </td>
                          </tr>
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No data available. Please submit a valid
                              Restaurant ID.
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
              onClick={() => navigate("/transport-company-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Transport Company Page
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>
    </div>
  );
};

export default GetCompanyById;
