import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select } from "antd";
import Image from "next/image";

const NumberOfContentsFilter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Number of contents"}
        active={filters?.content_count ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-2 space-x-2 w-52">
          <Select
            placeholder="From"
            suffixIcon={
              <Image src="/images/dropdown.svg" width={8} height={8} />
            }
            options={[
              { label: "100", value: 100 },
              { label: "200", value: 200 },
              { label: "300", value: 300 },
              { label: "400", value: 400 },
              { label: "500", value: 500 },
              { label: "1k", value: 1000 },
              { label: "5k", value: 5000 },
              { label: "<10k", value: 9999 },
            ]}
            onChange={(e) => {
              setFilters({
                ...filters,
                content_count: {
                  ...filters.content_count,
                  min: e,
                },
              });
            }}
          />
          <Select
            placeholder="To"
            options={[
              { label: "100", value: 100 },
              { label: "200", value: 200 },
              { label: "300", value: 300 },
              { label: "400", value: 400 },
              { label: "500", value: 500 },
              { label: "1k", value: 1000 },
              { label: "5k", value: 5000 },
              { label: ">10k", value: 50000 },
            ]}
            suffixIcon={
              <Image src="/images/dropdown.svg" width={8} height={8} />
            }
            onChange={(e) => {
              setFilters({
                ...filters,
                content_count: {
                  ...filters.content_count,
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

export default NumberOfContentsFilter;
