import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import { useNavigate } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";

const RoomTypeLayer = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MasterLayout>
        <div className=" d-flex align-items-center justify-content-center flex-column gap-3 w-100">
          <div
            className="  border border-2 p-3 w-100 rounded-2 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/create-room-type")}
          >
            <h5>To Create Room Type</h5>
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              click here to navigate Room Type
            </button>
          </div>

          <div
            className="  border border-2 p-3 w-100 rounded-2 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/room-type-all")}
          >
            <h5>All the Available Room Type Data</h5>
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              Click here to navigate Room Type
            </button>
          </div>
          <div
            className="  border border-2 p-3 w-100 rounded-2 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/room-by-id")}
          >
            <h5>Get room type by id</h5>
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              Click here to navigate Room Type by ID
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

export default RoomTypeLayer;
