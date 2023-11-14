import { useState } from "react";
import Countries from "./Countries";
import Cities from "./Cities";

const AudienceLocation = ({ data }) => {
  const tabs = ["Countries", "Cities"];
  const [active, setActive] = useState("Countries");
  return (
    <div className="flex flex-col space-y-2">
      <span className="text-xl font-bold">Audience location</span>
      <div className="flex items-start justify-center sm:justify-start py-2 px-2 fontRob bg-[#AF1FFC24] rounded-md w-fit space-x-4">
        {tabs?.map((e) => (
          <button
            className={`py-2 px-2  ${
              active === e ? "gradient-bg rounded-md" : ""
            }`}
            onClick={() => setActive(e)}
          >
            {e}
          </button>
        ))}
      </div>
      {active === "Countries" && <Countries data={data} />}
      {active === "Cities" && <Cities data={data} />}
    </div>
  );
};

export default AudienceLocation;
