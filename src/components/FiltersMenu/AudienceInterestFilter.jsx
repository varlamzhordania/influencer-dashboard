import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select } from "antd";
import Image from "next/image";

const AudienceInterestFilter = ({ interests, filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Audience interest affinities"}
        active={filters?.audience_interest_affinities ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-1 w-52">
          <Select
            mode="multiple"
            style={{
              width: "13rem",
            }}
            className="py-3 px-2 filter w-full sm:w-auto rounded-md cursor-pointer"
            placeholder="Creators interest"
            suffixIcon={
              <Image src="/images/dropdown.svg" width={8} height={8} />
            }
            value={filters?.audience_interest_affinities}
            onChange={(e) => {
              let interest = [];
              e?.forEach((a) => {
                interest.push({
                  value: a,
                });
              });
              setFilters({ ...filters, audience_interest_affinities: interest });
            }}
            dropdownClassName="dropdown-style"
            options={interests?.map((e) => {
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

export default AudienceInterestFilter;
