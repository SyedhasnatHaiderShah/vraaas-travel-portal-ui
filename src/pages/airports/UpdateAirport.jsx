import React from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { IoMdReturnLeft } from "react-icons/io";

const UpdateAirport = ({
  selectedRestaurant,
  getAllRoomData,
  setShowModal,
}) => {
  const navigate = useNavigate();
  console.log("selected data", selectedRestaurant);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { airport_id } = selectedRestaurant;

    const formatedData = {
      ...data,
      city_id: parseInt(data.city_id, 10),
    };

    try {
      const response = await axios.post(
        `http://localhost:3000/airports/${airport_id}/update`,
        formatedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.is_success) {
        toast.success("Airport updated successfully!");
        getAllRoomData();
        reset();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating airport:", error.message);
      toast.error("An error occurred while updating the airport.");
    }
  };

  return (
    <div className="card-body">
      <form action="#" onSubmit={handleSubmit(onSubmit)} className="  w-100">
        <div className=" col-12">
          <label className="form-label">Airport Name</label>
          <div className="icon-field has-validation">
            <span className="icon">
              <Icon icon="f7:person" />
            </span>
            <input
              type="text"
              name="#0"
              className="form-control"
              placeholder="Enter Airport Name"
              defaultValue={selectedRestaurant.airport_name}
              required=""
              {...register("airport_name", {
                required: "airport_name is required",
              })}
            />

            {errors.airport_name && (
              <div className="fw-normal text-danger">
                {errors.airport_name.message}
              </div>
            )}
          </div>
        </div>
        <div className=" col-12">
          <label className="form-label">IATA Code</label>
          <div className="icon-field has-validation">
            <span className="icon">
              <Icon icon="f7:person" />
            </span>
            <input
              type="text"
              name="#0"
              className="form-control"
              placeholder="Enter IATA Name"
              defaultValue={selectedRestaurant.iata_code}
              required=""
              {...register("iata_code", {
                required: "IATA Code is required",
                minLength: {
                  value: 3,
                  message: "IATA Code must be at least 3 characters",
                },
                maxLength: {
                  value: 3,
                  message: "IATA Code must not exceed 3 characters",
                },
              })}
            />

            {errors.iata_code && (
              <div className="fw-normal text-danger">
                {errors.iata_code.message}
              </div>
            )}
          </div>
        </div>
        <div className=" col-12">
          <label className="form-label">ICAO Code</label>
          <div className="icon-field has-validation">
            <span className="icon">
              <Icon icon="f7:person" />
            </span>
            <input
              type="text"
              name="#0"
              className="form-control"
              placeholder="Enter ICAO Code"
              defaultValue={selectedRestaurant.icao_code}
              required=""
              {...register("icao_code", {
                required: "ICAO Code is required",
                minLength: {
                  value: 4,
                  message: "ICAO Code must be at least 4 characters",
                },
                maxLength: {
                  value: 4,
                  message: "ICAO Code must not exceed 4 characters",
                },
              })}
            />

            {errors.icao_code && (
              <div className="fw-normal text-danger">
                {errors.icao_code.message}
              </div>
            )}
          </div>
        </div>
        <div className=" col-12">
          <label className="form-label">City ID</label>
          <div className="icon-field has-validation">
            <span className="icon">
              <Icon icon="f7:person" />
            </span>
            <input
              min={1}
              maxLength={1000}
              type="number"
              name="#0"
              className="form-control"
              placeholder="Enter City ID"
              defaultValue={selectedRestaurant.city_id}
              required=""
              {...register("city_id", {
                required: "city id  is required",
              })}
            />

            {errors.city_id && (
              <div className="fw-normal text-danger">
                {errors.city_id.message}
              </div>
            )}
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">Time Zone</label>
          <div className="icon-field has-validation">
            <span className="icon">
              <Icon icon="f7:world" />
            </span>
            <select
              name="timezone"
              className="form-control"
              defaultValue={selectedRestaurant.timezone}
              required
              {...register("timezone", {
                required: "Time Zone is required",
              })}
            >
              <option value="">Select Time Zone</option>
              {/* UAE and nearby regions */}
              <option value="Asia/Dubai">
                Asia/Dubai (UAE - Gulf Standard Time)
              </option>
              <option value="Asia/Muscat">
                Asia/Muscat (Oman - Gulf Standard Time)
              </option>
              <option value="Asia/Bahrain">
                Asia/Bahrain (Bahrain - Arabian Standard Time)
              </option>
              <option value="Asia/Kuwait">
                Asia/Kuwait (Kuwait - Arabian Standard Time)
              </option>
              <option value="Asia/Riyadh">
                Asia/Riyadh (Saudi Arabia - Arabian Standard Time)
              </option>

              {/* Common Global Time Zones */}
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Europe/Paris">Europe/Paris (CET)</option>
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
              <option value="Australia/Sydney">Australia/Sydney (AEDT)</option>

              {/* Add additional time zones as needed */}
            </select>

            {errors.timezone && (
              <div className="fw-normal text-danger">
                {errors.timezone.message}
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
    </div>
  );
};

export default UpdateAirport;
