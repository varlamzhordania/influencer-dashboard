import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select } from "antd";
import Image from "next/image";

const AccountTypeFilter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Account type"}
        active={filters?.account_type ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-2 space-x-2 w-52">
          <Select
            placeholder="Any"
            suffixIcon={
              <Image src="/images/dropdown.svg" width={8} height={8} />
            }
            options={[
              { label: "Business", value: "BUSINESS" },
              { label: "Creator", value: "CREATOR" },
              { label: "Personal", value: "PERSONAL" },
            ]}
            onChange={(e) => {
              setFilters({
                ...filters,
                account_type: e,
              });
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AccountTypeFilter;
