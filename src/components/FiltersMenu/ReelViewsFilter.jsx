import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select } from "antd";
import Image from "next/image";

const ReelViewsFilter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Reel views"}
        active={filters?.instagram_options ? true : false}
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
              { label: "50k", value: 50000 },
              { label: "100k", value: 100000 },
              { label: "500k", value: 500000 },
              { label: ">1m", value: 1000000 },
            ]}
            onChange={(e) => {
              setFilters({
                ...filters,
                instagram_options: {
                  reel_views: {
                    ...filters.instagram_options?.reel_views,
                    min: e,
                  },
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
              { label: "50k", value: 50000 },
              { label: "100k", value: 100000 },
              { label: "500k", value: 500000 },
              { label: "<1m", value: 1000000 },
            ]}
            suffixIcon={
              <Image src="/images/dropdown.svg" width={8} height={8} />
            }
            onChange={(e) => {
              setFilters({
                ...filters,
                instagram_options: {
                  reel_views: {
                    ...filters.instagram_options?.reel_views,
                    max: e,
                  },
                },
              });
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ReelViewsFilter;
