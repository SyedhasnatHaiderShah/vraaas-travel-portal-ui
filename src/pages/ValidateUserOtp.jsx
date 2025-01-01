import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const ValidateUserOtp = () => {
  const navigate = useNavigate();

  // Timer state
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [timerActive, setTimerActive] = useState(true); // To control the timer

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setTimerActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [timerActive]);

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("otp", data.otp);

    try {
      const response = await axios.post(
        "http://localhost:3000/user/validate-otp",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data.is_success) {
        toast.success(response.data.message);
        navigate("/sign-in");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      toast.error("An error occurred. Please try again.");
    }
  };
  const resendEmailOtp = async () => {
    const email = localStorage.getItem("email") || "";
    console.log(email);
    try {
      const response = await axios.post(
        "http://localhost:3000/user/resend-otp",
        { email }, // Wrap the email string in an object
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data.is_success) {
        toast.success(response.data.message);
        setTimeLeft(300);
        setTimerActive(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Convert timeLeft in seconds to minutes:seconds format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
            <h4 className="mb-12">Validate User by OTP</h4>
            <p className="mb-32 text-secondary-light text-lg">
              Please enter your details to validate your account. OTP with
              username has been sent to your email.
            </p>
          </div>
          <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <div className=" col-12">
              <label className="form-label">Username</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:person" />
                </span>
                <input
                  defaultValue={localStorage.getItem("username") || ""}
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Enter Username"
                  required=""
                  {...register("username", {
                    required: "Username is required",
                    maxLength: {
                      value: 9,
                      message: "Username must be less than 9 characters",
                    },
                  })}
                />
                {errors.username && (
                  <div className="fw-normal text-danger">
                    {errors.username.message}
                  </div>
                )}
              </div>
            </div>
            <div className="col-12">
              <label className="form-label">OTP</label>
              <div className="icon-field has-validation">
                <span className="icon">
                  <Icon icon="f7:key" />
                </span>
                <input
                  type="text"
                  maxLength={6}
                  name="otp"
                  className="form-control"
                  placeholder="Enter OTP"
                  required=""
                  {...register("otp", {
                    required: "OTP is required",
                    minLength: {
                      value: 6,
                      message: "OTP must be 6 digits",
                    },
                    maxLength: {
                      value: 6,
                      message: "OTP must be 6 digits",
                    },
                  })}
                />
                {errors.otp && (
                  <div className="fw-normal text-danger">
                    {errors.otp.message}
                  </div>
                )}
              </div>
            </div>

            <div className="my-2 text-center w-100">
              {timerActive ? (
                <span className="text-danger">
                  OTP expires in: {formatTime(timeLeft)}
                </span>
              ) : (
                <span className="text-danger">OTP expired</span>
              )}

              {timeLeft === 0 && (
                <div className=" text-center">
                  <button
                    type="button"
                    className="btn btn-success text-sm btn-sm px-12 py-16 w-50 radius-12 mt-32"
                    onClick={resendEmailOtp}
                  >
                    Request New OTP
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
              disabled={!isValid || !timerActive}
            >
              Validate
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
                Facebook
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

export default ValidateUserOtp;
