import Link from "next/link";
import React from "react";

const UnlockAccessModal = () => {
  return (
    <div class="unlock-access-modal">
      <div
        class="unlock-access-pop-up-container w-full md:w-[600px]"
        style={{ height: "235px", top: "calc(50% - 117.5px)", padding: "48px" }}
      >
        <div class="unlock-access-pop-up-content-container">
          <div class="unlock-access-pop-up-icon">
            <svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="96" height="96" rx="48" fill="#F1EEFF"></rect>
              <path
                d="M38 44H64C65.1046 44 66 44.8954 66 46V66C66 67.1046 65.1046 68 64 68H32C30.8954 68 30 67.1046 30 66V46C30 44.8954 30.8954 44 32 44H34V42C34 34.268 40.268 28 48 28C53.481 28 58.2262 31.1496 60.5248 35.7376L56.9462 37.5269C55.3044 34.2497 51.915 32 48 32C42.4772 32 38 36.4772 38 42V44ZM34 48V64H62V48H34ZM44 54H52V58H44V54Z"
                fill="#680DE4"
              ></path>
            </svg>
          </div>
          <div class="unlock-access-pop-up-description-container">
            <div class="unlock-access-pop-up-heading">
              <h3 class="unlock-access-pop-up-info-header">
                Unlock the full list of creators
              </h3>
            </div>
            <div class="unlock-access-pop-up-description">
              <p>Go beyond the top 5 to find that perfect fit.</p>
            </div>
            <div class="unlock-access-pop-up-action">
              <Link
                href={{
                  pathname: "/plan&billing",
                  query: { tab: "3" },
                }}
                className={`rounded-md py-3 px-5 text-lg my-3 w-fit`}
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
      </div>
    </div>
  );
};

export default UnlockAccessModal;
