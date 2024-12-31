import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ViewProfileLayer from "../components/ViewProfileLayer";
import ViewUserDetailLayer from "../components/ViewUserDetailLayer";

const ViewProfilePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="View User Detail" />

        {/* ViewProfileLayer */}
        <ViewUserDetailLayer />
      </MasterLayout>
    </>
  );
};

export default ViewProfilePage;
