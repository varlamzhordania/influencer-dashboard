import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { Select } from "antd";
import LocationItem from "../LocationItem";
import axios from "axios";

const AudienceLocationFilter = ({
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

  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Audience location"}
        active={
          filters?.audience_locations && filters?.audience_locations?.length > 0
            ? true
            : false
        }
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-1 w-52">
          <Select
            // mode="multiple"
            placeholder="Audience location"
            loading={loading}
            showSearch
            onSearch={handleInputChange}
            filterOption={false}
            // suffixIcon={
            //   <Image src="/images/dropdown.svg" width={8} height={8} />
            // }
            // value={filters?.audience_locations?.map((e) => e?.location_id)}
            style={{
              width: "12rem",
            }}
            onChange={(e) => {
              // let loc = [];
              // e?.forEach((a) => {
              //   loc.push({
              //     location_id: a,
              //     percentage_value: 20,
              //     operator: "GT",
              //     name: data?.find((e) => e?.id === a)?.display_name,
              //   });
              // });
              const newLocations = filters?.audience_locations
                ? filters?.audience_locations
                : [];
              newLocations?.push({
                location_id: e,
                percentage_value: 20,
                operator: "GT",
                name: data?.find((loc) => loc?.id === e)?.display_name,
              });

              setFilters({
                ...filters,
                audience_locations: newLocations,
              });
            }}
            options={data?.map((e) => {
              return {
                value: e?.id,
                label: e?.display_name,
              };
            })}
          />
          {filters?.audience_locations &&
          filters?.audience_locations?.length > 0 ? (
            <div className="flex flex-col space-y-2">
              {filters?.audience_locations?.map((loc, i) => {
                return (
                  <LocationItem
                    key={i}
                    percent={loc?.percentage_value}
                    location={loc?.name}
                    setFilters={setFilters}
                    filters={filters}
                    data={loc}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default AudienceLocationFilter;
