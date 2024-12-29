import React, { useState } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { IoMdReturnLeft } from "react-icons/io";

const TransportServicesByid = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [transportData, setTransportData] = useState(null);

  const onSubmit = async (data) => {
    const formattedData = {
      airline_id: Number(data.airline_id),
    };

    try {
      const response = await axios.get(
        `http://localhost:3000/transport-services/${formattedData.airline_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.is_success) {
        setTransportData(response.data.data);
      } else {
        setTransportData(null);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("An error occurred while fetching the data.");
    }
  };

  return (
    <div className="w-100">
      <MasterLayout>
        <div className="w-100 border p-3">
          <h3>Get Flights by ID</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12">
              <label className="form-label">Airline ID</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Airline ID"
                  {...register("airline_id", {
                    required: "Airline ID is required",
                  })}
                />
                {errors.airline_id && (
                  <div className="fw-normal text-danger">
                    {errors.airline_id.message}
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="btn  text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
              style={{ backgroundColor: "#57bcce" }}
            >
              Submit
            </button>
          </form>

          <div className="mt-5">
            {transportData && (
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Transport Details</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table basic-border-table mb-0">
                      <thead>
                        <tr>
                          <th>Transport Services ID</th>
                          <th>Service Type</th>
                          <th>Departure Time</th>
                          <th>Arrival Time</th>
                          <th>Price</th>
                          <th>Active</th>
                          <th>Transport Company ID</th>
                          <th>Company Name</th>
                          <th>Address</th>
                          <th>Company Type</th>
                          <th>Details</th>
                          <th>Is Partner?</th>
                          <th>Active</th>
                          <th>From City ID</th>
                          <th>From City Name</th>
                          <th>Country ID</th>
                          <th>To City ID</th>
                          <th>To City Name</th>
                          <th>Country ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{transportData.transport_service_id}</td>
                          <td>{transportData.service_type}</td>
                          <td>
                            {new Date(
                              transportData.departure_time
                            ).toLocaleString()}
                          </td>
                          <td>
                            {new Date(
                              transportData.arrival_time
                            ).toLocaleString()}
                          </td>
                          <td>${transportData.price}</td>
                          <td>{transportData.active ? "Yes" : "No"}</td>
                          <td>
                            {
                              transportData.transport_company
                                .transport_company_id
                            }
                          </td>
                          <td>
                            {transportData.transport_company.company_name}
                          </td>
                          <td>{transportData.transport_company.address}</td>
                          <td>
                            {transportData.transport_company.company_type}
                          </td>
                          <td>{transportData.transport_company.details}</td>
                          <td>
                            {transportData.transport_company.is_partner
                              ? "Yes"
                              : "No"}
                          </td>
                          <td>
                            {transportData.transport_company.active
                              ? "Yes"
                              : "No"}
                          </td>
                          <td>{transportData.from_city.city_id}</td>
                          <td>{transportData.from_city.city_name}</td>
                          <td>{transportData.from_city.country_id}</td>
                          <td>{transportData.to_city.city_id}</td>
                          <td>{transportData.to_city.city_name}</td>
                          <td>{transportData.to_city.country_id}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3"
            onClick={() => navigate("/transport-services-layer")}
            style={{
              cursor: "pointer",
            }}
          >
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              Go back to Transport Services Page
            </button>
            <IoMdReturnLeft />
          </div>
        </div>
      </MasterLayout>
    </div>
  );
};

export default TransportServicesByid;
