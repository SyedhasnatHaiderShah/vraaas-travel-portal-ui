import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignInLayer = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { username, password, remember } = data;

    if (!password) {
      toast.error("Password cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.data.is_success) {
        toast.success(response.data.message);
        navigate("/");

        if (remember) {
          localStorage.setItem(
            "rememberedUser",
            JSON.stringify({ username, password })
          );
        } else {
          localStorage.removeItem("rememberedUser");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while logging in.");
      console.error("Login error:", error);
    }
  };

  // Prefill username and password if "Remember me" was previously checked
  const rememberedUser = JSON.parse(
    localStorage.getItem("rememberedUser") || "{}"
  );

  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="assets/images/auth/auth-img.png" alt="" />
        </div>
      </div>
      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <div>
            <Link to="/" className="mb-40 max-w-290-px">
              <img src="assets/images/logo.png" alt="" />
            </Link>
            <h4 className="mb-12">Sign In to your Account</h4>
            <p className="mb-32 text-secondary-light text-lg">
              Welcome back! Please enter your details
            </p>
          </div>
          <form action="#" onSubmit={handleSubmit(onSubmit)}>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="f7:person" />
              </span>
              <input
                type="text"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Username"
                defaultValue={rememberedUser.username || ""}
                {...register("username", { required: true })}
              />
            </div>
            {errors.username && (
              <div className="fw-normal text-danger">Username is required</div>
            )}
            <div className="position-relative mb-20">
              <div className="icon-field">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="solar:lock-password-outline" />
                </span>
                <input
                  type="password"
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  id="your-password"
                  placeholder="Password"
                  defaultValue={rememberedUser.password || ""}
                  {...register("password", { required: true })}
                />
              </div>
              {errors.password && (
                <div className="fw-normal text-danger">
                  Password is required
                </div>
              )}
              <span
                className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                data-toggle="#your-password"
              />
            </div>
            <div className="d-flex justify-content-between gap-2">
              <div className="form-check style-check d-flex align-items-center">
                <input
                  className="form-check-input border border-neutral-300"
                  type="checkbox"
                  id="remember"
                  defaultChecked={Boolean(rememberedUser.username)}
                  {...register("remember")}
                />
                <label className="form-check-label" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-primary-600 fw-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
            >
              Sign In
            </button>
            <div className="mt-32 center-border-horizontal text-center">
              <span className="bg-base z-1 px-4">Or sign in with</span>
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
                Don’t have an account?{" "}
                <Link to="/sign-up" className="text-primary-600 fw-semibold">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
