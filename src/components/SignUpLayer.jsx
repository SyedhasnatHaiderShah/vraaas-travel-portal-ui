import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RxEyeOpen } from "react-icons/rx";
import { RxEyeClosed } from "react-icons/rx";
import { toast } from "react-toastify";
import axios from "axios";
import { allCountries } from "./../utils/countries";
import { MdDeleteForever } from "react-icons/md";
import ValidateUserOtp from "../pages/ValidateUserOtp";
import bgTheme from "../utils/bg.svg";
import right1 from "../utils/right-1.png";
import logo from "../utils/logo168x40.svg";
import signupImage from "../utils/signup.png";
const SignUpLayer = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  // const [selectFile, setSelectFile] = React.useState(null);
  // const [preview, setPreview] = React.useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectFile(file);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setPreview(null);
  //   }
  // };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirm_password) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
    localStorage.setItem("email", data.email);

    // / // Construct FormData object
    const formData = new FormData();
    formData.append("full_name", data.full_name);
    formData.append("email", data.email);
    formData.append("phone_number", data.phone_number);
    formData.append("password", data.password);
    formData.append("leader_id", data.leader_id);
    formData.append("country", data.country);
    // if (selectFile) {
    //   formData.append("file", selectFile);
    // }
    try {
      const { confirm_password, ...rest } = data;
      const response = await axios.post(
        "http://localhost:3000/user/register",
        rest,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      console.log(response.data.is_success);
      console.log(response.data.message);
      console.log(response.data.data.username);

      if (response.data.is_success) {
        // Registration was successful, OTP sent
        localStorage.setItem("username", response.data.data.username);
        toast.success(response.data.message);
        setStep(2); // Move to OTP verification step
      } else {
        // Registration failed
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section
      className="auth bg-base d-flex flex-wrap"
      style={{
        backgroundImage: `url(${bgTheme})`,
        backgroundSize: "1000px 1000px",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "hidden",
        zIndex: -11,
      }}
    >
      <div className="auth-left d-lg-block d-none">
        <div
          className="d-flex align-items-center flex-column justify-content-center"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 111,
          }}
        >
          <img src={signupImage || "assets/images/auth/auth-img.png"} alt="" />
        </div>
      </div>
      {step === 1 ? (
        <div
          className="auth-right p-3 d-flex flex-column justify-content-center"
          style={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            boxShadow: "0px 0px 20px 0px #0000000d",
            position: "relative",
            zIndex: 111,
            width: "100%",
            maxWidth: "564px",
            margin: "auto",
          }}
        >
          {/* use this image on right side to show vector art as absolute position */}

          <div className=" mx-md-auto mx-0 w-100">
            <div>
              <Link to="/" className="mb-40 max-w-290-px">
                <img src={logo || "assets/images/logo.png"} alt="" />
              </Link>
              <h4 className="mb-12">Sign Up to your Account</h4>
              <p className="mb-12 text-secondary-light text-lg">
                Welcome back! please enter your detail
              </p>
            </div>
            <form
              action="#"
              onSubmit={handleSubmit(onSubmit)}
              className=" d-flex align-items-center justify-content-center flex-wrap"
            >
              <div className=" col-12 col-md-6 p-1">
                <label className="form-label">Full Name</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Full Name"
                    required=""
                    {...register("full_name", {
                      required: "Full Name is required",
                    })}
                  />

                  {errors.full_name && (
                    <div className="fw-normal text-danger">
                      {errors.full_name.message}
                    </div>
                  )}
                </div>
              </div>
              <div className=" col-12 col-md-6 p-1">
                <label className="form-label">Email</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="mage:email" />
                  </span>
                  <input
                    type="email"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Email"
                    required=""
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  {errors.email && (
                    <div className="fw-normal text-danger">
                      {errors.email.message}
                    </div>
                  )}
                  {/* <div className="invalid-feedback">
              Please provide email address
            </div> */}
                </div>
              </div>
              <div className=" col-12 col-md-6 p-1">
                <label className="form-label">Leader ID</label>
                <div className="icon-field has-validation relative">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control relative"
                    placeholder="Enter Leader ID"
                    required=""
                    {...register("leader_id", {
                      required: "Leader ID is required",
                    })}
                  />
                  {errors.leader_id && (
                    <div className="fw-normal text-danger">
                      {errors.leader_id.message}
                    </div>
                  )}
                  {/* <div className="invalid-feedback">Please provide Leader ID</div> */}
                </div>
              </div>
              <div className=" col-12 col-md-6 p-1">
                <label className="form-label">Phone</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="solar:phone-calling-linear" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="+1 (555) 000-0000"
                    required=""
                    {...register("phone_number", {
                      required: "Phone Number is required",
                    })}
                  />
                  {errors.phone_number && (
                    <div className="fw-normal text-danger">
                      {errors.phone_number.message}
                    </div>
                  )}
                  {/* <div className="invalid-feedback">
              Please provide phone number
            </div> */}
                </div>
              </div>
              {/* select country */}
              {/* <CountrySelect
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
        /> */}
              <div className=" col-12 col-md-6 p-1">
                <label className="form-label">Country</label>
                <div className="icon-field has-validation">
                  {/* <span className="icon">
      <Icon icon="solar:phone-calling-linear" />
    </span> */}
                  <select
                    className=" form-select form-control px-16 py-10 h-44-px"
                    {...register("country", { required: true })}
                  >
                    <option value="">Select a country</option>
                    {allCountries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">
                    Please select a country
                  </div>
                </div>
              </div>

              {/* file */}
              {/* <div className=" w-100 d-flex flex-column align-items-center justify-content-center">
          <div className="col-12">
            <label className="form-label">Profile Photo</label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required=""
            />
            <div className="invalid-feedback">Please choose a file.</div>
          </div>
          <div className=" col-12">
            {preview && (
              <div className="mt-3 relative">
                <img
                  src={preview}
                  alt="Selected File"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100px",
                    borderRadius: "8px",
                  }}
                  className="relative"
                />
                <MdDeleteForever
                  size="30px"
                  className=" absolute top-0 right-0 text-danger cursor-pointer"
                  onClick={() => setPreview(null)}
                />
              </div>
            )}
          </div>
        </div> */}

              {/* password */}

              <div className=" col-12 col-md-6 p-1">
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
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                  />

                  {!showPassword ? (
                    <RxEyeClosed
                      className=" toggle-password cursor-pointer position-absolute  translate-middle-y me-16 text-secondary-light fs-5"
                      style={{
                        top: "50%",
                        right: "0",
                        transform: "translateY(-50%)",
                      }}
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  ) : (
                    <RxEyeOpen
                      className=" toggle-password cursor-pointer position-absolute me-16 text-secondary-light fs-5"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      style={{
                        top: "50%",
                        right: "0",
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}
                  {errors.password && (
                    <div className="fw-normal text-danger">
                      {errors.password.message}
                    </div>
                  )}
                  {/* <div className="invalid-feedback">Please provide password</div> */}
                </div>
              </div>
              <div className=" col-12 col-md-6 p-1">
                <label className="form-label">Confirm Password</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="solar:lock-password-outline" />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="#0"
                    className="form-control"
                    placeholder="*******"
                    required=""
                    {...register("confirm_password", {
                      required: "Confirm Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                  />
                  {!showConfirmPassword ? (
                    <RxEyeClosed
                      className=" toggle-password cursor-pointer position-absolute me-16 text-secondary-light fs-5"
                      onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      style={{
                        top: "50%",
                        right: "0",
                        transform: "translateY(-50%)",
                      }}
                    />
                  ) : (
                    <RxEyeOpen
                      className=" toggle-password cursor-pointer position-absolute  translate-middle-y me-16 text-secondary-light fs-5"
                      onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      style={{
                        top: "50%",
                        right: "0",
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}
                  {errors.confirm_password && (
                    <div className="  fw-normal text-danger">
                      {errors.confirm_password.message}
                    </div>
                  )}
                  {/* <div className="invalid-feedback">Please confirm password</div> */}
                </div>

                <div className="">
                  <div className="position-relative "></div>
                  <span className="mt-12 text-sm text-secondary-light">
                    Your password must have at least 8 characters
                  </span>
                </div>
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
                      <span
                        to="#"
                        className=" fw-semibold"
                        style={{
                          cursor: "pointer",
                          marginLeft: "5px",
                          color: "#a734ac",
                        }}
                      >
                        Terms &amp; Conditions
                      </span>{" "}
                      and our
                      <span
                        to="#"
                        className=" fw-semibold"
                        style={{
                          cursor: "pointer",
                          marginLeft: "5px",
                          color: "#a734ac",
                        }}
                      >
                        Privacy Policy
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn text-sm btn-sm px-12 py-16 w-100 radius-12 fw-semibold mt-2"
                style={{
                  cursor: "pointer",
                  color: "#fff",
                  backgroundColor: "#439ab6",
                }}
              >
                {" "}
                Sign Up
              </button>
              <div className="mt-2">
                <span className="text-sm text-secondary-light">
                  Already have been registered?{" "}
                  <Link
                    to="/validate-user-otp"
                    className=" fw-semibold"
                    style={{
                      cursor: "pointer",
                      marginLeft: "5px",
                      color: "#a734ac",
                    }}
                  >
                    Validate OTP
                  </Link>
                </span>
              </div>
              <div className="my-3 center-border-horizontal text-center w-100">
                <span className="bg-base z-1 px-4">Or sign up with</span>
              </div>
              <div className=" d-flex align-items-center gap-3 flex-column flex-md-row w-100">
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
                  <Link
                    to="/sign-in"
                    className=" fw-semibold"
                    style={{
                      cursor: "pointer",
                      marginLeft: "5px",
                      color: "#a734ac",
                      ":hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <ValidateUserOtp />
        </div>
      )}
    </section>
  );
};

export default SignUpLayer;
