import { useState } from "react";
import MenuItem from "./MenuItem";
import { Checkbox } from "antd";

const HasSponsoredPosts = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Has sponsored posts?"}
        active={filters?.has_sponsored_posts ? true : false}
      />
      {isOpen && (
        <div className="bg-white space-x-2">
          <div className="flex space-x-2 items-center">
            <Checkbox
              onChange={(e) => {
                setFilters({ ...filters, has_sponsored_posts: e.target.checked });
              }}
              checked={filters?.has_sponsored_posts}
            >
              Only show accounts with sponsored posts
            </Checkbox>
          </div>
        </div>
      )}
    </div>
  );
};

export default HasSponsoredPosts;
