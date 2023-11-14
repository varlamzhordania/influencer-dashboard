import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select } from "antd";
import Image from "next/image";

const CreatorGenderFilter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Creator gender"}
        active={filters?.creator_gender ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-2 space-x-2 w-52">
          <Select
            placeholder="Any"
            suffixIcon={
              <Image src="/images/dropdown.svg" width={8} height={8} />
            }
            options={[
              { label: "Any", value: "ANY" },
              { label: "Male", value: "MALE" },
              { label: "Female", value: "FEMALE" },
            ]}
            onChange={(e) => {
              setFilters({
                ...filters,
                creator_gender: e,
              });
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CreatorGenderFilter;
