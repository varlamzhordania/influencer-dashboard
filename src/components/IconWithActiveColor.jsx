import {
  HomeFilled,
  HeartFilled,
  TeamOutlined,
  UsergroupAddOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
  CustomerServiceOutlined,
  UserOutlined,
} from "@ant-design/icons";

const getIconByRoute = (routePath, isActive) => {
  const activeColor = "#FFFFFF"; // Color for active icons
  const defaultColor = "#9633FF"; // Default color for icons

  switch (routePath) {
    case "/":
      return (
        <HomeFilled style={{ color: isActive ? activeColor : defaultColor }} />
      );
    case "/Home/id?":
      return (
        <HomeFilled style={{ color: isActive ? activeColor : defaultColor }} />
      );
    case "/my-influencers":
      return (
        <HeartFilled style={{ color: isActive ? activeColor : defaultColor }} />
      );
    case "/relationship":
      return (
        <TeamOutlined
          style={{ color: isActive ? activeColor : defaultColor }}
        />
      );
    case "/campaign":
      return (
        <UsergroupAddOutlined
          style={{ color: isActive ? activeColor : defaultColor }}
        />
      );
    case "/payments":
      return (
        <CreditCardOutlined
          style={{ color: isActive ? activeColor : defaultColor }}
        />
      );
    case "/plan&billing":
      return (
        <DollarCircleOutlined
          style={{ color: isActive ? activeColor : defaultColor }}
        />
      );
    case "/talk_to_us":
      return (
        <CustomerServiceOutlined
          style={{ color: isActive ? activeColor : defaultColor }}
        />
      );
    case "/your_account":
      return (
        <UserOutlined
          style={{ color: isActive ? activeColor : defaultColor }}
        />
      );
    default:
      return null;
  }
};

const IconWithActiveColor = ({ iconName, isActive }) => {
  const icon = getIconByRoute(iconName, isActive);

  return icon;
};

export default IconWithActiveColor;
