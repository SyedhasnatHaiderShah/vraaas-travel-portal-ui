import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import { useNavigate } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";

const TicketsResponseLayer = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MasterLayout>
        <div className=" d-flex align-items-center justify-content-center flex-column gap-3 w-100">
          <div
            className="  border border-2 p-3 w-100 rounded-2 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/create-tickets-response")}
          >
            <h5>To Create Tickets Response</h5>
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              Navigate to Create Tickets Response
            </button>
          </div>

          <div
            className="  border border-2 p-3 w-100 rounded-2 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/get-all-tickets-response")}
          >
            <h5>All the Available Tickets Response</h5>
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              Navigate to All the Available Tickets Response Page also update
              and delete.
            </button>
          </div>
          <div
            className="  border border-2 p-3 w-100 rounded-2 "
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/get-tickets-response-id")}
          >
            <h5>Get Ticket Response by ID</h5>
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              Navigate to get the ticket response by ID
            </button>
          </div>

          <div
            className=" text-center d-flex align-items-center justify-content-center border w-100 rounded-1 my-3 "
            onClick={() => navigate("/tickets-response-layer")}
            style={{
              cursor: "pointer",
            }}
          >
            <button
              type="button"
              className="btn rounded-pill btn-link text-secondary-light text-decoration-none radius-8 px-20 py-11"
            >
              Go back to Tickets Response Page
            </button>
            <IoMdReturnLeft />
          </div>
        </div>
      </MasterLayout>
    </div>
  );
};

export default TicketsResponseLayer;
