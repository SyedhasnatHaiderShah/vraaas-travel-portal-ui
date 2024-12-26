import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import MasterLayout from "../../masterLayout/MasterLayout";
import { IoMdReturnLeft } from "react-icons/io";

const CreateCity = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/hotels/create/city",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data.message);
      if (response.data.is_success) {
        // Registration was successful, OTP sent
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section className=" w-100">
      <MasterLayout>
        <div className="auth-right py-10 px-24">
          <div className="max-w-464-px mx-md-auto mx-0 w-100">
            <div>
              {/* <Link to="/" className="mb-40 max-w-290-px">
              <img src="assets/images/logo.png" alt="" />
            </Link> */}
              <h4 className="mb-12">Create City </h4>
              <p className="mb-32 text-secondary-light text-lg">
                {" "}
                Enter City Name
              </p>
            </div>
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
              <div className=" col-12">
                <label className="form-label">City</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter City Name"
                    required=""
                    {...register("city_name", {
                      required: "city name is required",
                    })}
                  />

                  {errors.city_name && (
                    <div className="fw-normal text-danger">
                      {errors.city_name.message}
                    </div>
                  )}
                </div>
              </div>
              <div className=" col-12">
                <label className="form-label">Country ID</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Country ID"
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
            <div
              className=" text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3 "
              onClick={() => navigate("/hotels")}
              style={{
                cursor: "pointer",
              }}
            >
              <button
                type="button"
                className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
              >
                Click to go back to home
              </button>
              <IoMdReturnLeft />
            </div>
          </div>
        </div>
      </MasterLayout>
    </section>
  );
};

export default CreateCity;
