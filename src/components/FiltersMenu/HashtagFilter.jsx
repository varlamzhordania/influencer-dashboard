import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select } from "antd";
import Image from "next/image";

const HashtagFilter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Hashtags"}
        active={filters?.hashtags ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-1 w-52">
          <Select
            placeholder="Enter hashtags"
            suffixIcon={
              <Image src="/images/dropdown.svg" width={8} height={8} />
            }
            value={filters?.hashtags?.map((e) => e?.name)}
            mode="tags"
            onChange={(e) => {
              let hash = [];
              e?.forEach((a) => {
                hash.push({
                  name: a,
                });
              });

              setFilters({
                ...filters,
                hashtags: hash,
              });
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default HashtagFilter;
