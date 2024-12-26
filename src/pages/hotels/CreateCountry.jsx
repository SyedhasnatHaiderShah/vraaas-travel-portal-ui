import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import MasterLayout from "../../masterLayout/MasterLayout";

const CreateCountry = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/hotels/create/country",
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
              <h4 className="mb-12">Create Country </h4>
              <p className="mb-32 text-secondary-light text-lg">
                {" "}
                Enter Country Name
              </p>
            </div>
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
              <div className=" col-12">
                <label className="form-label">Country</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Country Name"
                    required=""
                    {...register("country_name", {
                      required: "country name is required",
                    })}
                  />

                  {errors.country_name && (
                    <div className="fw-normal text-danger">
                      {errors.country_name.message}
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
        </div>
        <div className=" text-center">
          <button
            type="button"
            className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            onClick={() => navigate("/hotels")}
          >
            go back
          </button>
        </div>
      </MasterLayout>
    </section>
  );
};

export default CreateCountry;
