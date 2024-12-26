import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import { useNavigate } from "react-router-dom";

const RoomTypeLayer = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MasterLayout>
        <div className=" border p-3 ">
          <h1>To Create Room Type</h1>
          <button
            type="button"
            className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            onClick={() => navigate("/create-room-type")}
          >
            click here to navigate Room Type
          </button>
        </div>

        <div className=" border p-3 ">
          <h3>All the Available Room Type Data</h3>
          <button
            type="button"
            className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            onClick={() => navigate("/room-type-all")}
          >
            Click here to navigate Room Type
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
    </div>
  );
};

export default RoomTypeLayer;
