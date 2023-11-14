import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { Select } from "antd";
import Image from "next/image";
import axios from "axios";
import { CloseOutlined } from "@mui/icons-material";

const CreatorLocationFilter = ({
  locations,
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
    const response = await axios.post("/api/influencers/locations/search", {
      work_platform_id: selectedWorkPlatform,
      queryText: value,
    });
    setData(response.data?.data);
    setLoading(false);
  };

  const removeLocation = (id) => {
    const newLocations = filters?.creator_locations?.filter(
      (e) => e?.location_id !== id
    );
    if (newLocations?.length > 0) {
      setFilters({ ...filters, creator_locations: newLocations });
    } else {
      delete filters["creator_locations"];
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Creator's location"}
        active={filters?.creator_locations ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-1 w-52">
          <Select
            // mode="multiple"
            placeholder="Search..."
            // value={filters?.creator_locations}
            onSearch={handleInputChange}
            loading={loading}
            filterOption={false}
            showSearch
            options={data?.map((location) => {
              return {
                label: location?.name,
                value: location?.id,
              };
            })}
            onChange={(e) => {
              const newLocations = filters?.creator_locations
                ? filters?.creator_locations
                : [];
              newLocations?.push({
                location_id: e,
                name: data?.find((loc) => loc?.id === e)?.display_name,
              });

              setFilters({
                ...filters,
                creator_locations: newLocations,
              });
            }}
          />
          {filters?.creator_locations ? (
            <div className="flex gap-2 mt-2">
              {filters?.creator_locations?.map((loc) => {
                return (
                  <div className="flex items-center justify-center space-x-1 bg-lightgray rounded-full px-2 py-1 text-base font-medium opacity-70 w-fit">
                    <span>{loc?.name}</span>
                    <CloseOutlined
                      onClick={() => removeLocation(loc?.location_id)}
                      className="cursor-pointer opacity-50 text-xs"
                      size={3}
                    />
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default CreatorLocationFilter;
