import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
const Breadcrumb = ({ title }) => {
  return (
    <div className="d-flex flex-wrap align-items-md-center justify-content-md-between justify-content-start align-items-start gap-3 mb-24 flex-column md-flex-row">
      <h6 className="fw-semibold mb-0">Dashboard</h6>
      <ul className="d-flex align-items-center gap-2">
        <li className="fw-medium d-flex align-items-center gap-1 flex-column flex-md-row gap-md-5">
          <Link
            to="/sign-in"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Sign Up
          </Link>
          <Link
            to="/user-detail"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            User Detail
          </Link>
          <Link
            to="/user-data"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            User Data
          </Link>
          <Link
            to="/"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Dashboard
          </Link>
        </li>
        <li> - </li>
        <li className="fw-medium">{title}</li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
