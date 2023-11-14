import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select } from "antd";
import Image from "next/image";

const CreatorBrandAffinity = ({ brands, filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Creator brand affinity"}
        active={filters?.creator_brand_affinities ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-2 space-x-2 w-52">
          <Select
            mode="multiple"
            className="py-3 px-2 filter w-full sm:w-auto rounded-md cursor-pointer"
            style={{
              width: "13rem",
            }}
            placeholder="Creator brand affinities"
            suffixIcon={
              <Image src="/images/dropdown.svg" width={8} height={8} />
            }
            dropdownClassName="dropdown-style"
            onChange={(e) => {
              setFilters({ ...filters, creator_brand_affinities: e });
            }}
            options={brands?.map((e) => {
              return {
                value: e?.name,
                label: e?.name,
              };
            })}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CreatorBrandAffinity;
