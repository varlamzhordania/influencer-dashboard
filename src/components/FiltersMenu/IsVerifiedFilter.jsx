import { useState } from "react";
import MenuItem from "./MenuItem";
import { Checkbox } from "antd";

const IsVerifiedFilter = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Is verified?"}
        active={filters?.is_verified ? true : false}
      />
      {isOpen && (
        <div className="bg-white space-x-2">
          <div className="flex space-x-2 items-center">
            <Checkbox
              onChange={(e) => {
                setFilters({ ...filters, is_verified: e.target.checked });
              }}
              checked={filters?.is_verified}
            >
              Only show verified accounts
            </Checkbox>
          </div>
        </div>
      )}
    </div>
  );
};

export default IsVerifiedFilter;
