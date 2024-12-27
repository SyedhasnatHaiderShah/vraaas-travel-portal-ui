import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import { useNavigate } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";

const AirportsLayer = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MasterLayout>
        <div className=" d-flex align-items-center justify-content-center flex-column gap-3 w-100">
          <div
            className="  border border-2 p-3 w-100 rounded-2 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/create-airports")}
          >
            <h5>To Create Airport</h5>
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              Navigate to Create Airport Page
            </button>
          </div>

          <div
            className="  border border-2 p-3 w-100 rounded-2 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/get-all-airports")}
          >
            <h5>All the Available Airports</h5>
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              Navigate to All Airports Page also update and delete the Airports.
            </button>
          </div>
          <div
            className="  border border-2 p-3 w-100 rounded-2 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/airport-by-id")}
          >
            <h5>Get Airports by ID</h5>
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              Navigate to get the Airports by ID
            </button>
          </div>

          <div
            className=" text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3 "
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
            }}
          >
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              Click to go back to home
            </button>
            <IoMdReturnLeft />
          </div>
        </div>
      </MasterLayout>
    </div>
  );
};

export default AirportsLayer;
