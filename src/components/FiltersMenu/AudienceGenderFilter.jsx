import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select, Slider } from "antd";
import Image from "next/image";

const AudienceGenderFilter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Audience gender"}
        active={filters?.audience_gender ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-1 w-52">
          <Select
            className="py-3 px-2 filter  w-full sm:w-auto rounded-md"
            placeholder="Audience Gender"
            suffixIcon={
              <Image src="/images/dropdown.svg" width={8} height={8} />
            }
            value={filters?.audience_gender?.type}
            dropdownClassName="dropdown-style"
            onChange={(e) => {
              const gender = {
                type: e,
                operator: "GT",
                percentage_value: filters?.audience_gender?.percentage_value
                  ? filters?.audience_gender?.percentage_value
                  : 20,
              };
              setFilters({
                ...filters,
                audience_gender: gender,
              });
            }}
            options={[
              { label: "ANY", value: "ANY" },
              { label: "MALE", value: "MALE" },
              { label: "FEMALE", value: "FEMALE" },
            ]}
          />
          {filters?.audience_gender &&
            filters?.audience_gender?.type !== "ANY" && (
              <div className="flex flex-col space-y-2">
                <span className="text-base">
                  More than&nbsp;
                  <b>{filters?.audience_gender?.percentage_value}</b>%
                  audience's gender is&nbsp;
                  <b>{filters?.audience_gender?.type}</b>
                </span>
                <Slider
                // trackStyle={{
                //   background: "linear-gradient(270.75deg, #ff5b84 -51.86%, #4254ff 107.54%)"
                // }}
                
                  value={filters?.audience_gender?.percentage_value}
                  onChange={(newPercent) => {
                    setFilters({
                      ...filters,
                      audience_gender: {
                        ...filters?.audience_gender,
                        percentage_value: newPercent,
                      },
                    });
                  }}
                />
              </div>
            )}
        </div>
      ) : null}
    </div>
  );
};

export default AudienceGenderFilter;
