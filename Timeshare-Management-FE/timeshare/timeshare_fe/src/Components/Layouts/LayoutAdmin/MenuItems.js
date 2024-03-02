import { HomeOutlined, TeamOutlined } from "@ant-design/icons";
import ROUTER from "../../../routers/routerList";

const MenuItems = [
  {
    label: "Home",
    key: ROUTER.HOME,
    icon: <HomeOutlined />,
  },
  {
    label: "User Manager",
    key: ROUTER.USER_MANAGER,
    icon: <TeamOutlined />,
  },
  {
    label: "Room Manager",
    key: ROUTER.ROOM_MANAGER,
    icon: <TeamOutlined />,
  },
  {
    label: "TimeShare",
    key: ROUTER.TIME_SHARE,
    icon: <TeamOutlined />,
  },
];

export default MenuItems;
