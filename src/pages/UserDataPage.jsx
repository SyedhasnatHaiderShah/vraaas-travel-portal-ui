import React from "react";
import UserDataLayer from "./../components/UserDataLayer";
import MasterLayout from "../masterLayout/MasterLayout";

const UserDataPage = () => {
  return (
    <div>
      <MasterLayout>
        <UserDataLayer />
      </MasterLayout>
    </div>
  );
};

export default UserDataPage;
