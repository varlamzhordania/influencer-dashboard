import {
  PieChartOutlined,
  HomeFilled,
  SettingFilled,
  UserOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
  CustomerServiceOutlined,
  HeartFilled
} from "@ant-design/icons";
import Image from "next/image";

const defaultIconStyle = {
  color: "#9633FF",
};

const routes = [
  {
    path: "/",
    icon: <HomeFilled style={defaultIconStyle} />,
    title: "Creator Discovery",
    roles: ["admin", "user"],
  },
  {
    path: "/my-influencers",
    icon: <HeartFilled style={{ ...defaultIconStyle, fontSize: 20 }} />,
    title: "My Influencers",
    roles: ["admin", "user"],
  },
  {
    path: "/relationship",
    icon: <TeamOutlined style={defaultIconStyle} />,
    title: "Relationship",
    roles: ["user", "admin"],
  },
  {
    path: "/campaign",
    icon: <UsergroupAddOutlined style={defaultIconStyle} />,
    title: "Campaign",
    roles: ["user", "admin"],
  },
  {
    path: "/payments",
    icon: <CreditCardOutlined style={defaultIconStyle} />,
    title: "Payments",
    roles: ["user", "admin"],
  },
  {
    path: "/plan&billing",
    icon: <DollarCircleOutlined style={defaultIconStyle} />,
    title: "Plan & Billing",
    roles: ["user", "admin"],
  },
  {
    path: "/talk_to_us",
    icon: <CustomerServiceOutlined style={defaultIconStyle} />,
    title: "Talk to us",
    roles: ["user", "admin"],
  },
  {
    path: "/your_account",
    icon: <UserOutlined style={defaultIconStyle} />,
    title: "Your account",
    roles: ["user", "admin"],
  },
];

export default routes;
