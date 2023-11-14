import Sidebar from "./Sidebar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import authApi from "@/lib/authApi";
import { Avatar, Button, Dropdown, Input, Layout, Spin } from "antd";
import { SearchOutlined, BellOutlined, MenuOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;
import { Menu } from "antd";
import routes from "@/routes/routes";
import {
  HomeOutlined,
  AppstoreOutlined,
  UsergroupAddOutlined,
  CreditCardOutlined,
  CustomerServiceOutlined,
  UploadOutlined,
  DollarCircleOutlined,
  UserOutlined,
  TeamOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useAuth } from "../../../context/AuthContext";
import { AiOutlineUser } from "react-icons/ai";
import dayjs from "dayjs";
import { BiMenu } from "react-icons/bi";
import MobileMenu from "./MobileMenu";

const Index = ({ children }) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [menu, setMenu] = useState(false);

  const handleMenuClick = (item) => {
    setSelectedMenuItem(item.key);
  };

  const navItemMenu = (
    <Menu
      className="custom-dropdown-menu"
      selectedKeys={[router.pathname]}
      defaultOpenKeys={["relationship"]}
      theme="dark" // Use a dark theme to make text color customization easier
    >
      <Menu.Item key="/" icon={<HomeOutlined />} style={{ color: "#AF1FFC" }}>
        <Link href="/">Creator Discovery</Link>
      </Menu.Item>
      <Menu.Item
        key="/my-influencers"
        icon={<HeartFilled />}
        style={{ color: "#AF1FFC" }}
      >
        <Link href="/my-influencers">My Influencers</Link>
      </Menu.Item>
      <Menu.Item
        key="/relationship"
        icon={<TeamOutlined />}
        style={{ color: "#AF1FFC" }}
      >
        <Link href="/relationship">Relationship</Link>
      </Menu.Item>
      <Menu.Item
        key="/campaign"
        icon={<UsergroupAddOutlined />}
        style={{ color: "#AF1FFC" }}
      >
        <Link href="/campaign">Campaign</Link>
      </Menu.Item>
      <Menu.Item
        key="/payments"
        icon={<CreditCardOutlined />}
        style={{ color: "#AF1FFC" }}
      >
        <Link href="/payments">Payments</Link>
      </Menu.Item>
      <Menu.Item
        key="/plan&billing"
        icon={<DollarCircleOutlined />}
        style={{ color: "#AF1FFC" }}
      >
        <Link href="/plan&billing">Plan & Billing</Link>
      </Menu.Item>
      <Menu.Item
        key="/talk_to_us"
        icon={<CustomerServiceOutlined />}
        style={{ color: "#AF1FFC" }}
      >
        <Link href="/talk_to_us">Talk to us</Link>
      </Menu.Item>
      <Menu.Item
        key="/your_account"
        icon={<UserOutlined />}
        style={{ color: "#AF1FFC" }}
      >
        <Link href="/your_account">Your account</Link>
      </Menu.Item>
    </Menu>
  );

  const items = [
    {
      key: "2",
      label: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            className="text-sm md:text-lg font-medium font-poppins"
            style={{ textTransform: "capitalize", color: "#F49342" }}
            onClick={() => router.push("/your_account")}
          >
            {user?.name ? user?.name : user?.firstName}
          </span>
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <span
          className="text-red-600 opacity-50 text-xs md:text-base font-normal font-poppins"
          style={{ color: "red" }}
          onClick={async () => {
            await logout();
            router.push("/signin");
          }}
        >
          Logout
        </span>
      ),
    },
  ];

  const getPageTitle = (path) => {
    if (path === "/Home/[id]") {
      return "Influencer";
    }
    let route = routes.find((r) => r.path === path);
    if (!route) {
      if (path === "/") {
        route = routes.find((r) => r.path === "/");
        return route.title;
      }
    }
    return route ? route.title : "";
  };

  return (
    <Layout style={{ minHeight: "100vh" }} className="">
      <Sidebar role={"admin"} />
      <Layout className="site-layout">
        {user?.trialVersion && !user?.admin ? (
          <div className="flex items-center justify-center space-x-2 w-full bg-[#FDEDBE] p-5 sticky top-0 z-50">
            {dayjs(user?.expiryDate?.toDate()).diff(dayjs(), "days") <= 0 ? (
              <>
                <Link
                  href={{
                    pathname: "/plan&billing",
                    query: { tab: "3" },
                  }}
                  className="underline text-blue-700 text-[8px] md:text-lg font-semibold hover:underline hover:text-blue-700"
                >
                  Upgrade now
                </Link>
                <span className="text-[8px] md:text-lg font-semibold">
                  and get full access to 230M+ creators!
                </span>
              </>
            ) : (
              <>
                <span className="text-[8px] md:text-lg font-semibold">
                  Your trial expires in&nbsp;
                  {dayjs(user?.expiryDate?.toDate()).diff(dayjs(), "days")} days
                </span>
                <Link
                  href={{
                    pathname: "/plan&billing",
                    query: { tab: "3" },
                  }}
                  className="underline text-blue-700 text-[8px] md:text-lg font-semibold hover:underline hover:text-blue-700"
                >
                  Upgrade now
                </Link>
                <span className="text-[8px] md:text-lg font-semibold">
                  and get full access to 230M+ creators!
                </span>
              </>
            )}
          </div>
        ) : null}
        <Header
          className="bg-[#FFFFFF]  topRow  flex items-center justify-between w-full  "
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            height: "4rem",
            background: "white",
          }}
        >
          <div className="flex w-auto sm:px-4 items-center justify-start">
            <div className="flex items-center space-x-3">
              <BiMenu
                className="cursor-pointer block md:hidden"
                onClick={() => setMenu(!menu)}
                size={25}
              />
              <h1
                className="font-[700] sm:text-[24px] text-[20px] fontMonst"
                style={{
                  fontWeight: "700 !important",
                  fontSize: "24px !important",
                }}
              >
                {" "}
                {getPageTitle(router.pathname)}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div
              className="info hidden"
              style={{ paddingRight: "10px !important" }}
            >
              <h1 className="font-[600] flex text-[18px]">{user?.name}</h1>
              {/* <p className="font-[400] text-[13px]  text-[#0000006B]">
                Influencer
              </p> */}
            </div>

            {/* Avatar */}
            <div className="">
              <Dropdown
                menu={{ items }}
                className="border"
                placement="bottomRight"
              >
                <Avatar
                  size="large"
                  icon={<AiOutlineUser />}
                  src={user?.profilePicture}
                  className="flex items-center mr-3 justify-center cursor-pointer"
                />
              </Dropdown>
            </div>

            {/* <div className="  hide-menu-md   h-full px-2 ">
              <Dropdown
                overlay={navItemMenu}
                trigger={["click"]}
                style={{ border: "none !important", padding: "0 !important" }}
              >
                <a className="text-[#0852C1]">
                  ;
                  <MenuOutlined style={{ fontSize: "24px" }} />
                </a>
              </Dropdown>
            </div> */}
          </div>
          {menu && <MobileMenu menu={menu} setMenu={setMenu} />}
        </Header>

        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Index;
