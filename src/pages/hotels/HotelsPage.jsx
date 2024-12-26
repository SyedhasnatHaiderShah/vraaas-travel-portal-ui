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
        <div className=" border p-3 ">
          <h3>To Create Country</h3>
          <button
            type="button"
            className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            onClick={() => navigate("/create-country")}
          >
            click here to navigate create a country
          </button>
        </div>
        <div className=" border p-3 ">
          <h3>To Create City</h3>
          <button
            type="button"
            className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            onClick={() => navigate("/create-city")}
          >
            click here to navigate to create a city
          </button>
        </div>
        <div className=" border p-3 ">
          <h3>To Create Hotel</h3>
          <button
            type="button"
            className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            onClick={() => navigate("/create-hotel")}
          >
            click here to navigate to create hotel
          </button>
        </div>
        <div className=" border p-3 ">
          <h3>All the Available Data</h3>
          <button
            type="button"
            className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            onClick={() => navigate("/hotel-all-data")}
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
      </MasterLayout>
    </>
  );
};

export default HotelsPage;
