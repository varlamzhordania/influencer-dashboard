import { useEffect, useState } from "react";
import { Layout, Menu, Button } from "antd";
import routes from "@/routes/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import IconWithActiveColor from "@/components/IconWithActiveColor";
const { Sider } = Layout;

const Sidebar = ({ role }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (router.pathname) {
      if (current !== router.pathname) {
        setCurrent(router.pathname);
      }
    }
  }, [router, current]);

  useEffect(() => {
    const handleWindowResize = () => {
      setCollapsed(window.innerWidth < 768); // Collapse sidebar on smaller devices (breakpoint: 768px)
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize(); // Initial check on component mount

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Sider
      style={{ paddingTop: "1rem", background: "white" }}
      className="block hide-sidebar-md "
      width={240}
    >
      <div className="flex items-center justify-center">
        <Image src="/images/logo.png" width={200} height={200} alt="logo" />
      </div>
      <Menu
        style={{
          marginTop: "1rem",
        }}
        className="sidebar fontMonst"
        defaultSelectedKeys={[current]}
        onClick={({ key }) => {
          setCurrent(key);
        }}
        mode="inline"
        items={routes.map((route) => {
          if (route.roles.includes(role)) {
            const isActive = current === route.path;
            return {
              key: route.path,
              icon: (
                <IconWithActiveColor
                  iconName={route.path}
                  isActive={isActive}
                />
              ),
              label:
                route?.childrens?.length > 0 ? (
                  <button
                    href={route.path}
                    className=" text-[16px]  text-white fontMonst "
                  >
                    {route.title}
                  </button>
                ) : (
                  <Link
                    href={route.path}
                    className=" text-[16px]  py-4 text-white fontMonst"
                  >
                    {route.title}
                  </Link>
                ),
              children: route?.childrens?.map((child) => {
                if (child.roles.includes(role)) {
                  const isActive = current === route.path;
                  return {
                    key: child.path,
                    icon: (
                      <IconWithActiveColor
                        iconName={child.path}
                        isActive={isChildActive}
                      />
                    ),
                    label: (
                      <Link
                        href={child.path}
                        className=" text-[16px] py-4 text-white fontMonst"
                      >
                        {child.title}
                      </Link>
                    ),
                  };
                }
              }),
            };
          }
        })}
      />
    </Sider>
  );
};

export default Sidebar;
