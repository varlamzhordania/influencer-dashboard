import Link from "next/link";
import React from "react";
import { AiOutlineUnlock } from "react-icons/ai";

const NotEligible = ({ title, text }) => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex space-x-4 ">
        <div className="w-20 h-20 rounded-full bg-gray flex items-center justify-center">
          <AiOutlineUnlock color="#8F56CD" size={40} />
        </div>
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <span className="text-base font-light opacity-50 max-w-sm">
            {text}
          </span>
          <Link
            href={{
              pathname: "/plan&billing",
              query: { tab: "3" },
            }}
            className={`rounded-md py-2 px-5 my-3 w-fit text-lg font-semibold`}
            style={{
              background:
                "linear-gradient(270.75deg, #FF5B84 -51.86%, #4254FF 107.54%)",
              color: "white",
              fontWeight: 400,
            }}
          >
            See plans
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotEligible;
