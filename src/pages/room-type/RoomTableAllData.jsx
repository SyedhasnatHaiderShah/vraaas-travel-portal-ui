import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MasterLayout from "../../masterLayout/MasterLayout";

const RoomTableAllData = () => {
  const [hotelData, setHotelData] = React.useState([]);
  const getAllHotelData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/room-types", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      if (response.data.is_success === true) {
        setHotelData(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getAllHotelData();
  }, []);

  return (
    <div className="col-lg-6 w-100">
      <MasterLayout>
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">All the available hotels list</h5>
          </div>
          {/* card body start */}
          <div className="card-body">
            <div className="table-responsive">
              <table className="table basic-border-table mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Room Type Name</th>
                    <th>Room Type Description</th>
                    <th>Is Active?</th>
                  </tr>
                </thead>
                <tbody>
                  {hotelData.map((hotel, index) => (
                    <tr key={index}>
                      <td>{hotel.room_type_id}</td>
                      <td>{hotel.type_name}</td>
                      <td>{hotel.description}</td>
                      <td
                        style={{
                          color: hotel.active ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {hotel.active ? "Yes" : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </MasterLayout>

      {/* card end */}
    </div>
  );
};

export default RoomTableAllData;
