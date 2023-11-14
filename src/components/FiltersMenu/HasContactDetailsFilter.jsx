import { useState } from "react";
import MenuItem from "./MenuItem";
import { Checkbox } from "antd";

const HasContactDetailsFilter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Has contact details?"}
        active={filters?.has_contact_details ? true : false}
      />
      {isOpen && (
        <div className="bg-white space-x-2">
          <div className="flex space-x-2 items-center">
            <Checkbox
              onChange={(e) => {
                setFilters({
                  ...filters,
                  has_contact_details: e.target.checked,
                });
              }}
            >
              Only show accounts with contact details
            </Checkbox>
          </div>
        </div>
      )}
    </div>
  );
};

export default HasContactDetailsFilter;
