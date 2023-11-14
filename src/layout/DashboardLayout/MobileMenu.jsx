import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import {
  HomeFilled,
  UserOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
  CustomerServiceOutlined,
  HeartFilled,
} from "@ant-design/icons";

const MobileMenu = ({ menu, setMenu }) => {
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={menuRef}
      className={`fixed inset-y-0 bg-white text-[16px] w-[70%] py-5 border-[#D1D1D1] left-0  px-4 transition-transform z-50  duration-500 transform ${
        menu ? "translate-x-0 overflow-y-auto" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center">
        <Image src="/images/logo.png" width={200} height={200} alt="logo" />
      </div>
      <div className="flex flex-col space-y-4 mt-5">
        <Link
          href={"/"}
          className={`${
            router.pathname === "/" ? "gradient-bg" : ""
          } flex items-center space-x-2 w-fit rounded-md px-3 py-2`}
        >
          <HomeFilled
            style={{ color: router.pathname === "/" ? "#FFFFFF" : "#9633FF" }}
          />
          <span
            className={`text-base font-poppins font-normal ${
              router.pathname === "/" ? "text-white" : "text-black"
            }`}
          >
            Creator Discovery
          </span>
        </Link>
        <Link
          href={"/my-influencers"}
          className={`${
            router.pathname === "/my-influencers" ? "gradient-bg" : ""
          } flex items-center space-x-2 w-fit rounded-md px-3 py-2`}
        >
          <HeartFilled
            style={{
              color:
                router.pathname === "/my-influencers" ? "#FFFFFF" : "#9633FF",
            }}
          />
          <span
            className={`text-base font-poppins font-normal ${
              router.pathname === "/my-influencers"
                ? "text-white"
                : "text-black"
            }`}
          >
            My Influencers
          </span>
        </Link>
        <Link
          href={"/relationship"}
          className={`${
            router.pathname === "/relationship" ? "gradient-bg" : ""
          } flex items-center space-x-2 w-fit rounded-md px-3 py-2`}
        >
          <TeamOutlined
            style={{
              color:
                router.pathname === "/relationship" ? "#FFFFFF" : "#9633FF",
            }}
          />
          <span
            className={`text-base font-poppins font-normal ${
              router.pathname === "/relationship" ? "text-white" : "text-black"
            }`}
          >
            Relationship
          </span>
        </Link>
        <Link
          href={"/campaign"}
          className={`${
            router.pathname === "/campaign" ||
            router.pathname === "/campaign/analyze"
              ? "gradient-bg"
              : ""
          } flex items-center space-x-2 w-fit rounded-md px-3 py-2`}
        >
          <UsergroupAddOutlined
            style={{
              color:
                router.pathname === "/campaign" ||
                router.pathname === "/campaign/analyze"
                  ? "#FFFFFF"
                  : "#9633FF",
            }}
          />
          <span
            className={`text-base font-poppins font-normal ${
              router.pathname === "/campaign" ||
              router.pathname === "/campaign/analyze"
                ? "text-white"
                : "text-black"
            }`}
          >
            Campaign
          </span>
        </Link>
        <Link
          href={"/payments"}
          className={`${
            router.pathname === "/payments" ? "gradient-bg" : ""
          } flex items-center space-x-2 w-fit rounded-md px-3 py-2`}
        >
          <CreditCardOutlined
            style={{
              color: router.pathname === "/payments" ? "#FFFFFF" : "#9633FF",
            }}
          />
          <span
            className={`text-base font-poppins font-normal ${
              router.pathname === "/payments" ? "text-white" : "text-black"
            }`}
          >
            Payments
          </span>
        </Link>
        <Link
          href={"/plan&billing"}
          className={`${
            router.pathname === "/plan&billing" ? "gradient-bg" : ""
          } flex items-center space-x-2 w-fit rounded-md px-3 py-2`}
        >
          <DollarCircleOutlined
            style={{
              color:
                router.pathname === "/plan&billing" ? "#FFFFFF" : "#9633FF",
            }}
          />
          <span
            className={`text-base font-poppins font-normal ${
              router.pathname === "/plan&billing" ? "text-white" : "text-black"
            }`}
          >
            Plan & billing
          </span>
        </Link>
        <Link
          href={"/talk_to_us"}
          className={`${
            router.pathname === "/talk_to_us" ? "gradient-bg" : ""
          } flex items-center space-x-2 w-fit rounded-md px-3 py-2`}
        >
          <CustomerServiceOutlined
            style={{
              color: router.pathname === "/talk_to_us" ? "#FFFFFF" : "#9633FF",
            }}
          />
          <span
            className={`text-base font-poppins font-normal ${
              router.pathname === "/talk_to_us" ? "text-white" : "text-black"
            }`}
          >
            Talk to us
          </span>
        </Link>
        <Link
          href={"/your_account"}
          className={`${
            router.pathname === "/your_account" ? "gradient-bg" : ""
          } flex items-center space-x-2 w-fit rounded-md px-3 py-2`}
        >
          <UserOutlined
            style={{
              color:
                router.pathname === "/your_account" ? "#FFFFFF" : "#9633FF",
            }}
          />
          <span
            className={`text-base font-poppins font-normal ${
              router.pathname === "/your_account" ? "text-white" : "text-black"
            }`}
          >
            Your account
          </span>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
