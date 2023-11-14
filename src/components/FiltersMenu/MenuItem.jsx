import React from "react";
import { BiCheck, BiMinus, BiPlus } from "react-icons/bi";

const MenuItem = ({ title, isOpen, setIsOpen, active = false }) => {
  return (
    <div
      className="flex space-x-2 items-center cursor-pointer relative"
      onClick={() => setIsOpen(!isOpen)}
    >
      {active && !isOpen ? (
        <BiCheck color={active ? `#5455F4` : ""} size={20} />
      ) : (
        <BiPlus color={active ? `#5455F4` : ""} size={20} />
      )}
      <span
        style={{
          color: active ? `#5455F4` : "",
        }}
      >
        {title}
      </span>
    </div>
  );
};

export default MenuItem;
