import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select } from "antd";
import Image from "next/image";

const MentionsFilter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Mentions"}
        active={filters?.mentions ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-1 w-52">
          <Select
            placeholder="Mentions"
            suffixIcon={
              <Image src="/images/dropdown.svg" width={8} height={8} />
            }
            value={filters?.mentions?.map((e) => e?.name)}
            mode="tags"
            onChange={(e) => {
              let mention = [];
              e?.forEach((a) => {
                mention.push({
                  name: a,
                });
              });
              setFilters({
                ...filters,
                mentions: mention,
              });
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default MentionsFilter;
