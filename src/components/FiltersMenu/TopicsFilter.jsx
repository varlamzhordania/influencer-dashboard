import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select } from "antd";
import Image from "next/image";

const TopicsFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem isOpen={isOpen} setIsOpen={setIsOpen} title={"Topics"} />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-2 space-x-2 w-52">
          <Select
            placeholder="From"
            suffixIcon={
              <Image src="/images/dropdown.svg" width={8} height={8} />
            }
            options={[
              { label: "1k", value: 1000 },
              { label: "5k", value: 5000 },
              { label: "10k", value: 10000 },
              { label: "25k", value: 25000 },
              { label: "50k", value: 50000 },
              { label: "100k", value: 100000 },
              { label: "250k", value: 250000 },
              { label: "500k", value: 500000 },
            ]}
            // onChange={(e) => {
            //   setFilters({
            //     ...filters,
            //     follower_count: {
            //       ...filters.follower_count,
            //       min: e,
            //     },
            //     subscriber_count: {
            //       ...filters.subscriber_count,
            //       min: e,
            //     },
            //   });
            // }}
          />
          <Select
            placeholder="To"
            options={[
              { label: "1k", value: 1000 },
              { label: "5k", value: 5000 },
              { label: "10k", value: 10000 },
              { label: "25k", value: 25000 },
              { label: "50k", value: 50000 },
              { label: "100k", value: 100000 },
              { label: "250k", value: 250000 },
              { label: "500k", value: 500000 },
            ]}
            suffixIcon={
              <Image src="/images/dropdown.svg" width={8} height={8} />
            }
            // onChange={(e) => {
            //   setFilters({
            //     ...filters,
            //     follower_count: {
            //       ...filters.follower_count,
            //       max: e,
            //     },
            //     subscriber_count: {
            //       ...filters.subscriber_count,
            //       max: e,
            //     },
            //   });
            // }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default TopicsFilter;
