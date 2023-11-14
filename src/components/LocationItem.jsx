import { Slider } from "antd";

const LocationItem = ({ location, percent, filters, setFilters, data }) => {
  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center">
        <span className="text-base">
          More than <b>{percent}</b>% audience's locations is <b>{location}</b>
        </span>
        {/* You can add the close icon here */}
        {/* <IoClose size={30} /> */}
      </div>
      <Slider
        value={percent} // Use 'value' instead of 'defaultValue' to control the slider
        onChange={(newPercent) => {
          // Create a copy of the filters
          const updatedFilters = { ...filters };
          
          // Find the index of the location to update
          const locationIndex = updatedFilters?.audience_locations?.findIndex(
            (loc) => loc?.location_id === data?.location_id
          );

          if (locationIndex !== -1) {
            // Create a copy of the location object with the new percentage value
            const updatedLocation = {
              ...updatedFilters?.audience_locations[locationIndex],
              percentage_value: newPercent,
            };

            // Update the location in the filters array
            updatedFilters.audience_locations[locationIndex] = updatedLocation;

            // Update the state with the new filters
            setFilters(updatedFilters);
          }
        }}
      />
    </div>
  );
};

export default LocationItem;
