import React, { useEffect } from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { IoMdReturnLeft } from "react-icons/io";

const GetAirportById = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const [hotelData, setHotelData] = React.useState(null);
  const onSubmit = async (data) => {
    const formatedData = {
      restaurant_id: Number(data.restaurant_id),
    };
    try {
      const response = await axios.get(
        `http://localhost:3000/restaurants/${formatedData.restaurant_id}`,
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
          <h3>Get Restuarant by ID</h3>
          <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <div className=" col-12">
              <label className="form-label">Restaurant ID</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  type="text"
                  name="#0"
                  className="form-control"
                  placeholder="Enter Restaurant ID"
                  required=""
                  {...register("restaurant_id", {
                    required: "hotel id is required",
                  })}
                />

                {errors.restaurant_id && (
                  <div className="fw-normal text-danger">
                    {errors.restaurant_id.message}
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
                          <th>Restaurants ID</th>
                          <th>Restaurants Name</th>
                          <th>Address</th>
                          <th>Cuisine Type</th>
                          <th>Details</th>
                          <th>Is Partner?</th>
                          <th>Is Active?</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hotelData ? (
                          <tr>
                            <td>{hotelData.restaurant_id}</td>
                            <td>{hotelData.restaurant_name}</td>
                            <td>{hotelData.address}</td>
                            <td>{hotelData.cuisine_type}</td>
                            <td>{hotelData.details}</td>
                            <td>{hotelData.is_partner ? "Yes" : "No"}</td>
                            <td>{hotelData.active ? "Yes" : "No"}</td>
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
              onClick={() => navigate("/airports-layer")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Go back to Airports Page
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>
    </div>
  );
};

export default GetAirportById;
