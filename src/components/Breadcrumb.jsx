import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
const Breadcrumb = ({ title }) => {
  return (
    <div className="d-flex flex-wrap align-items-md-center justify-content-md-between justify-content-start align-items-start gap-3 mb-24 flex-column md-flex-row">
      <h6 className="fw-semibold mb-0">Ready links</h6>
      <ul className="d-flex align-items-center gap-2">
        <li className="fw-medium d-flex align-items-center gap-2  gap-md-3 flex-wrap ">
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
          khurram
          <Link
            to="/user-detail"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            User Profile Detail
          </Link>
          <Link
            to="/user-data"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Uploaded Documents
          </Link>
          <Link
            to="/upload-document"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Upload/Update Document
          </Link>
          <Link
            to="/hotels"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Hotels
          </Link>
          <Link
            to="/room-type"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Room type
          </Link>
          <Link
            to="/hotel-services-layer"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Hotel Services
          </Link>
          <Link
            to="/restaurants-layer"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Restaurants
          </Link>
          <Link
            to="/airports-layer"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Airports
          </Link>
          <Link
            to="/airlines-layer"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Airlines
          </Link>
          <Link
            to="/flights-layer"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Flights
          </Link>
          <Link
            to="/transport-company-layer"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Transport Companies
          </Link>
          <Link
            to="/transport-services-layer"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Transport Companies Services
          </Link>
          <Link
            to="/bookings-layer"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Bookings
          </Link>
          <Link
            to="/payments-layer"
            className="d-flex align-items-center gap-1 hover-text-primary"
          >
            <Icon
              icon="solar:home-smile-angle-outline"
              className="icon text-lg"
            />
            Payments
          </Link>
        </li>
        {/* <li> - </li>
        <li className="fw-medium">{title}</li> */}
      </ul>
    </div>
  );
};

export default Breadcrumb;
