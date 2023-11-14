import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select, Slider } from "antd";
import Image from "next/image";

const FollowerGrowthFilter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Follower growth"}
        active={filters?.follower_growth ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-1 w-52">
          <Select
            className="py-3 px-2 filter  w-full sm:w-auto rounded-md"
            placeholder="In last"
            suffixIcon={
              <Image src="/images/dropdown.svg" width={8} height={8} />
            }
            value={filters?.follower_growth?.interval}
            dropdownClassName="dropdown-style"
            onChange={(e) => {
              const followerGrowth = {
                interval: e,
                interval_unit: "MONTH",
                operator: "GT",
                percentage_value: filters?.follower_growth?.percentage_value
                  ? filters?.follower_growth?.percentage_value
                  : 10,
              };
              setFilters({
                ...filters,
                follower_growth: followerGrowth,
              });
            }}
            options={[
              { label: "1 Month", value: 1 },
              { label: "2 Month", value: 2 },
              { label: "3 Month", value: 3 },
              { label: "4 Month", value: 4 },
              { label: "5 Month", value: 5 },
              { label: "6 Month", value: 6 },
            ]}
          />
          {filters?.follower_growth &&
            filters?.follower_growth?.type !== "ANY" && (
              <div className="flex flex-col space-y-2">
                <span className="text-base">
                  More than&nbsp;
                  <b>{filters?.follower_growth?.percentage_value}</b>%
                  follower's growth is&nbsp;
                  <b>{filters?.follower_growth?.interval}_month</b>
                </span>
                <Slider
                  value={filters?.follower_growth?.percentage_value}
                  min={10}
                  onChange={(newPercent) => {
                    setFilters({
                      ...filters,
                      follower_growth: {
                        ...filters?.follower_growth,
                        percentage_value: newPercent,
                      },
                    });
                  }}
                />
              </div>
            )}
        </div>
      ) : null}
    </div>
  );
};

export default FollowerGrowthFilter;
