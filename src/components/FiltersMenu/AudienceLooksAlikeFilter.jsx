import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { Input, Select } from "antd";
import axios from "axios";
import Image from "next/image";
import formatNumber from "@/utils/formatNumber";

const AudienceLooksAlikeFilter = ({
  filters,
  setFilters,
  selectedWorkPlatform,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  useEffect(() => {
    if (debouncedSearchText !== "") {
      // Use a debounce to make API requests only after a brief pause in typing
      const delay = setTimeout(() => {
        handleSearch(debouncedSearchText);
      }, 300); // Adjust the delay time as needed
      return () => clearTimeout(delay);
    } else {
      setData([]);
    }
  }, [debouncedSearchText]);

  const handleInputChange = (value) => {
    setDebouncedSearchText(value);
  };

  const handleSearch = async (value) => {
    setLoading(true);
    const response = await axios.post("/api/influencers/search", {
      work_platform_id: selectedWorkPlatform,
      queryText: value,
    });
    setData(response.data?.data);
    setLoading(false);
  };
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Audience lookalike"}
        active={filters?.audience_lookalikes ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-1 w-72">
          <Select
            placeholder="Search..."
            onSearch={handleInputChange}
            filterOption={false}
            options={data?.map((e) => {
              return {
                label: (
                  <div className="flex items-center space-x-2">
                    <div className="relative rounded-full h-[60px] w-[60px]">
                      <Image
                        src={e?.picture ? e?.picture : ""}
                        alt={e?.username}
                        fill={true}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        {e?.fullname}
                      </span>
                      <span className="text-sm font-semibold">
                        {formatNumber(e?.followers)}
                      </span>
                    </div>
                  </div>
                ),
                value: e?.username,
              };
            })}
            loading={loading}
            showSearch
            onSelect={(e) => {
              setFilters({ ...filters, audience_lookalikes: e });
            }}
            className="w-full"
            value={filters?.audience_lookalikes}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AudienceLooksAlikeFilter;
