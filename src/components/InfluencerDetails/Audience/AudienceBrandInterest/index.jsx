import React from "react";
import Brands from "./Brands";
import Interests from "./Interests";

const AudienceBrandInterest = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Brands data={data} />
      <Interests data={data} />
    </div>
  );
};

export default AudienceBrandInterest;
