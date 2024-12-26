import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import { useNavigate } from "react-router-dom";
import HotelTableAllData from "./HotelTableAllData";

const HotelAllData = () => {
  const navigate = useNavigate();
  return (
    <div className=" w-100">
      <MasterLayout>
        <div className=" w-100 border p-3 ">
          {/* <h1>All the Countries List</h1> */}
          <HotelTableAllData />

          <button
            type="button"
            className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            onClick={() => navigate("/hotels")}
          >
            click to go back
          </button>
        </div>
      </MasterLayout>
    </div>
  );
};

export default HotelAllData;
