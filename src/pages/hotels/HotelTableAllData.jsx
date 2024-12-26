import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const HotelTableAllData = () => {
  const [hotelData, setHotelData] = React.useState([]);
  const getAllHotelData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hotels/all", {
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
                  <th>Hotel ID</th>
                  <th>Hotel Name</th>
                  <th>Hotel Details</th>
                  <th>Hotel Address</th>
                  <th>Is Partner?</th>
                  <th>Is Active?</th>
                </tr>
              </thead>
              <tbody>
                {hotelData.map((hotel, index) => (
                  <tr key={index}>
                    <td>{hotel.hotel_id}</td>
                    <td>{hotel.hotel_name}</td>
                    <td>{hotel.details}</td>
                    <td>{hotel.address}</td>
                    <td>{hotel.is_partner ? "Yes" : "No"}</td>
                    <td>{hotel.active ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* card end */}
    </div>
  );
};

export default HotelTableAllData;
