import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select, Slider } from "antd";
import Image from "next/image";

const AudienceAgeFilter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Audience age"}
        active={filters?.audience_age ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-1 w-52">
          <div className="grid grid-cols-2 space-x-2">
            <Select
              placeholder="From"
              value={filters?.audience_age?.min}
              options={[
                { label: "13", value: 13 },
                { label: "18", value: 18 },
                { label: "25", value: 25 },
                { label: "35", value: 35 },
                { label: "45", value: 45 },
                { label: "65", value: 65 },
              ]}
              suffixIcon={
                <Image src="/images/dropdown.svg" width={8} height={8} />
              }
              onChange={(e) => {
                setFilters({
                  ...filters,
                  audience_age: {
                    ...filters.audience_age,
                    percentage_value: filters?.audience_age?.percentage_value
                      ? filters?.audience_age?.percentage_value
                      : 20,
                    min: e,
                  },
                });
              }}
            />
            <Select
              placeholder="To"
              value={filters?.audience_age?.max}
              options={[
                { label: "17", value: 17 },
                { label: "24", value: 24 },
                { label: "34", value: 34 },
                { label: "44", value: 44 },
                { label: "64", value: 64 },
              ]}
              suffixIcon={
                <Image src="/images/dropdown.svg" width={8} height={8} />
              }
              onChange={(e) => {
                setFilters({
                  ...filters,
                  audience_age: {
                    ...filters.audience_age,
                    percentage_value: filters?.audience_age?.percentage_value
                      ? filters?.audience_age?.percentage_value
                      : 20,
                    max: e,
                  },
                });
              }}
            />
          </div>
          {filters?.audience_age ? (
            <div className="flex flex-col space-y-2">
              <span className="text-base">
                More than <b>{filters?.audience_age?.percentage_value}</b>%
                audience's age is{" "}
                <b>
                  {filters?.audience_age?.min}{" "}
                  {filters?.audience_age?.max
                    ? `- ${filters?.audience_age?.max}`
                    : null}
                </b>
              </span>
              <Slider
                value={filters?.audience_age?.percentage_value} // Use 'value' instead of 'defaultValue' to control the slider
                onChange={(newPercent) => {
                  setFilters({
                    ...filters,
                    audience_age: {
                      ...filters?.audience_age,
                      percentage_value: newPercent,
                    },
                  });
                }}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default AudienceAgeFilter;
