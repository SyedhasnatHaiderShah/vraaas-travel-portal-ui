import React from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { IoMdReturnLeft } from "react-icons/io";

const UpdateAirlines = ({
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
    const { airline_id } = selectedRestaurant;
    console.log("airline id", airline_id);
    const formatedData = {
      ...data,
      country_id: parseInt(data.country_id, 10),
    };

    console.log("data", data);

    console.log("formated data", formatedData);
    try {
      const response = await axios.post(
        `http://localhost:3000/airlines/${airline_id}/update`,
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
              defaultValue={selectedRestaurant.airline_name}
              required=""
              {...register("airline_name", {
                required: "airline name is required",
              })}
            />

            {errors.airline_name && (
              <div className="fw-normal text-danger">
                {errors.airline_name.message}
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
              placeholder="Enter IATA Code"
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
          <label className="form-label">Country</label>
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
              placeholder="Enter Country ID"
              defaultValue={selectedRestaurant.country}
              required=""
              {...register("country_id", {
                required: "country id is required",
              })}
            />
            {errors.country_id && (
              <div className="fw-normal text-danger">
                {errors.country_id.message}
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

export default UpdateAirlines;
