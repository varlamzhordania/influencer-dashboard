import { useState } from "react";
import MenuItem from "./MenuItem";
import { Slider } from "antd";

const EngagementRateFilter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Engagement rate"}
        active={filters?.engagement_rate?.percentage_value ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 flex flex-col space-y-2 w-52">
          <span>{`> ${
            filters?.engagement_rate?.percentage_value ? filters?.engagement_rate?.percentage_value : 2
          }%`}</span>
          <Slider
            value={Number(filters?.engagement_rate?.percentage_value)} // Use 'value' instead of 'defaultValue' to control the slider
            defaultValue={2}
            onChange={(newPercent) => {
              setFilters({
                ...filters,
                engagement_rate: { percentage_value: newPercent?.toString() },
              });
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default EngagementRateFilter;
