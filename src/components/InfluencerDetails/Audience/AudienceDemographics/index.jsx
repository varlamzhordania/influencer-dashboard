import { useState } from "react";
import DataGraph from "./DataGraph";

const AudienceDemographics = ({ data }) => {
  const tabs = ["Age", "Language", "Ethnicity"];
  const [active, setActive] = useState("Age");
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-start justify-center sm:justify-start py-2 px-2 fontRob bg-[#AF1FFC24] rounded-md w-fit space-x-4">
        {tabs?.map((e) => (
          <button
            className={`py-2 px-4  ${
              active === e ? "gradient-bg rounded-md" : ""
            }`}
            onClick={() => setActive(e)}
          >
            {e}
          </button>
        ))}
      </div>
      {active === "Age" && (
        <DataGraph graphData={data?.ageDistribution} label={"Age"} />
      )}
      {active === "Language" && (
        <DataGraph graphData={data?.languageDistribution} label={"Language"} />
      )}
      {active === "Ethnicity" && (
        <DataGraph graphData={data?.ethnicityDistribution} label={"Ethniciy"} />
      )}
    </div>
  );
};

export default AudienceDemographics;
