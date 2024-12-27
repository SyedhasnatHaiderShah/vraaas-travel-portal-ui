import React, { useState } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { IoMdReturnLeft } from "react-icons/io";

const GetFlightsById = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [airlineData, setAirlineData] = useState(null);

  const onSubmit = async (data) => {
    const formattedData = {
      airline_id: Number(data.airline_id),
    };

    try {
      const response = await axios.get(
        `http://localhost:3000/airlines/${formattedData.airline_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.is_success) {
        setAirlineData(response.data.data);
      } else {
        setAirlineData(null);
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
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
            >
              Submit
            </button>
          </form>

          <div className="mt-5">
            {airlineData && (
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Airline Details</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table basic-border-table mb-0">
                      <thead>
                        <tr>
                          <th>Airline ID</th>
                          <th>Airline Name</th>
                          <th>IATA Code</th>
                          <th>ICAO Code</th>
                          <th>Callsign</th>
                          <th>Country</th>
                          <th>Flight ID</th>
                          <th>Flight Number</th>
                          <th>Departure Time</th>
                          <th>Arrival Time</th>
                          <th>Price</th>
                          <th>Active</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{airlineData.airline_id}</td>
                          <td>{airlineData.airline_name}</td>
                          <td>{airlineData.iata_code}</td>
                          <td>{airlineData.icao_code}</td>
                          <td>{airlineData.callsign}</td>
                          <td>{airlineData.country || "N/A"}</td>
                          {airlineData.flights.length > 0 ? (
                            airlineData.flights.map((flight, index) => (
                              <React.Fragment key={index}>
                                <td>{flight.flight_id}</td>
                                <td>{flight.flight_number}</td>
                                <td>
                                  {new Date(
                                    flight.departure_time
                                  ).toLocaleString()}
                                </td>
                                <td>
                                  {new Date(
                                    flight.arrival_time
                                  ).toLocaleString()}
                                </td>
                                <td>{flight.price}</td>
                                <td>{flight.active ? "Yes" : "No"}</td>
                              </React.Fragment>
                            ))
                          ) : (
                            <td colSpan="6" className="text-center">
                              No flights available.
                            </td>
                          )}
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
            onClick={() => navigate("/flights-layer")}
            style={{ cursor: "pointer" }}
          >
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              Go back to Flights Page
            </button>
            <IoMdReturnLeft />
          </div>
        </div>
      </MasterLayout>
    </div>
  );
};

export default GetFlightsById;
