import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import { Breadcrumb } from "react-bootstrap";
import DashBoardLayerOne from "../../components/DashBoardLayerOne";
import HotelLayer from "./HotelLayer";
import CreateCountry from "./CreateCountry";
import CreateCity from "./CreateCity";
import CreateHotel from "./CreateHotel";
import { useNavigate } from "react-router-dom";

const HotelsPage = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="AI" />
        <div className=" d-flex align-items-center justify-content-center flex-column gap-3 w-100">
          <div
            className="  border border-2 p-3 w-100 rounded-2 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/create-country")}
          >
            <h5>To Create Country</h5>
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              click here to navigate create a country
            </button>
          </div>
          <div
            className="  border border-2 p-3 w-100 rounded-2 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/create-city")}
          >
            <h5>To Create City</h5>
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              click here to navigate to create a city
            </button>
          </div>
          <div
            className="  border border-2 p-3 w-100 rounded-2 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/create-hotel")}
          >
            <h5>To Create Hotel</h5>
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              click here to navigate to create hotel
            </button>
          </div>
          <div
            className="  border border-2 p-3 w-100 rounded-2 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/hotel-all-data")}
          >
            <h5>All the hotels also including Edit and Delete</h5>
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              click here to navigate hotel
            </button>
          </div>
          <div
            className="  border border-2 p-3 w-100 rounded-2 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/hotel-id")}
          >
            <h5>Get Hotel by ID</h5>
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              click here to navigate hotel
            </button>
          </div>
          <button
            type="button"
            className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            onClick={() => navigate("/")}
          >
            Click to go back to home
          </button>
        </div>
      </MasterLayout>
    </>
  );
};

export default HotelsPage;
