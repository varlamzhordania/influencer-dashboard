import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select } from "antd";
import Image from "next/image";

const CreatorLanguageFilter = ({ languages, filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Creator's language"}
        active={filters?.creator_language ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-1 w-52">
          <Select
            placeholder="Any"
            showSearch
            // suffixIcon={
            //   <Image src="/images/dropdown.svg" width={8} height={8} />
            // }
            options={languages?.map((language) => {
              return {
                label: language?.name,
                value: language?.code,
              };
            })}
            onChange={(e) => {
              setFilters({
                ...filters,
                creator_language: {
                  code: e,
                  name: languages?.find((lang) => lang?.code === e)?.name,
                },
              });
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default CreatorLanguageFilter;
