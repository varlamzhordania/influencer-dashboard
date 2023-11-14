import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select } from "antd";
import Image from "next/image";

const CreatorAgeFilter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Creator age"}
        active={filters?.creator_age ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-2 space-x-2 w-52">
          <Select
            placeholder="From"
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
                creator_age: {
                  ...filters.creator_age,
                  min: e,
                },
              });
            }}
          />
          <Select
            placeholder="To"
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
                creator_age: {
                  ...filters.creator_age,
                  max: e,
                },
              });
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CreatorAgeFilter;
