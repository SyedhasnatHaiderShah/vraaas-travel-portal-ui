import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RxEyeOpen } from "react-icons/rx";
import { RxEyeClosed } from "react-icons/rx";
import { toast } from "react-toastify";
import axios from "axios";
import { MdContactMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const ChangePasswordLayer = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/change-password",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.is_success === true) {
        toast.success(response.data.message);
        navigate("/sign-in");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      toast.error(error.message);
    }
  };
  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="assets/images/auth/auth-img.png" alt="" />
        </div>
      </div>
      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-md-auto mx-0 w-100">
          <div>
            <Link to="/" className="mb-40 max-w-290-px">
              <img src="assets/images/logo.png" alt="" />
            </Link>
            <h4 className="mb-12">Change Password</h4>
            <p className="mb-32 text-secondary-light text-lg">
              Please enter your detail
            </p>
          </div>
          <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12">
              <label className="form-label">Username</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <MdContactMail />
                </span>
                <input
                  type="text"
                  name="#0"
                  className="form-control"
                  placeholder="Enter Username"
                  required=""
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <div className="fw-normal text-danger">
                    {errors.username.message}
                  </div>
                )}
                {/* <div className="invalid-feedback">
                  Please provide email address
                </div> */}
              </div>
            </div>
            <div className="col-12">
              <label className="form-label">OTP</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="mage:email" />
                </span>
                <input
                  type="text"
                  name="#0"
                  className="form-control"
                  placeholder="Enter OTP"
                  required=""
                  {...register("otp", {
                    required: "OTP is required",
                  })}
                />
                {errors.otp && (
                  <div className="fw-normal text-danger">
                    {errors.otp.message}
                  </div>
                )}
              </div>
            </div>

            <div className="col-12">
              <label className="form-label">Password</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="solar:lock-password-outline" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="#0"
                  className="form-control"
                  placeholder="*******"
                  required=""
                  {...register("new_password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message:
                        "New Password must be at least 8 characters long",
                    },
                  })}
                />

                {!showPassword ? (
                  <RxEyeClosed
                    className=" toggle-password cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light fs-5"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <RxEyeOpen
                    className=" toggle-password cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light fs-5"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
                {errors.new_password && (
                  <div className="fw-normal text-danger">
                    {errors.new_password.message}
                  </div>
                )}
                {/* <div className="invalid-feedback">Please provide password</div> */}
              </div>
            </div>

            <div className="mb-20">
              <div className="position-relative "></div>
              <span className="mt-12 text-sm text-secondary-light">
                Your password must have at least 8 characters
              </span>
            </div>

            <div className="">
              <div className="d-flex justify-content-between gap-2">
                <div className="form-check style-check d-flex align-items-start">
                  <input
                    className="form-check-input border border-neutral-300 mt-4"
                    type="checkbox"
                    defaultValue=""
                    id="condition"
                    required="true"
                  />
                  <label
                    className="form-check-label text-sm"
                    htmlFor="condition"
                  >
                    By creating an account means you agree to the
                    <Link to="#" className="text-primary-600 fw-semibold">
                      Terms &amp; Conditions
                    </Link>{" "}
                    and our
                    <Link to="#" className="text-primary-600 fw-semibold">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
            >
              {" "}
              Change Password
            </button>
            <div className="mt-32 center-border-horizontal text-center">
              <span className="bg-base z-1 px-4">Or sign up with</span>
            </div>
            <div className="mt-32 d-flex align-items-center gap-3">
              <button
                type="button"
                className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
              >
                <Icon
                  icon="ic:baseline-facebook"
                  className="text-primary-600 text-xl line-height-1"
                />
                Google
              </button>
              <button
                type="button"
                className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
              >
                <Icon
                  icon="logos:google-icon"
                  className="text-primary-600 text-xl line-height-1"
                />
                Google
              </button>
            </div>
            <div className="mt-32 text-center text-sm">
              <p className="mb-0">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-primary-600 fw-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePasswordLayer;
