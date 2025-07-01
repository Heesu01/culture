import { Link, useLocation } from "react-router-dom";

import aiIconColor from "@/assets/navigation/ai_color.png";
import aiIconGray from "@/assets/navigation/ai.png";

import mapIconColor from "@/assets/navigation/map_color.png";
import mapIconGray from "@/assets/navigation/map.png";

import stampIconColor from "@/assets/navigation/stamp_color.png";
import stampIconGray from "@/assets/navigation/stamp.png";

import mypageIconColor from "@/assets/navigation/user_color.png";
import mypageIconGray from "@/assets/navigation/user.png";

const NavBar = () => {
  const location = useLocation();

  const navItems = [
    {
      to: "/recommend",
      label: "AI 추천코스",
      activeIcon: aiIconColor,
      inactiveIcon: aiIconGray,
    },
    {
      to: "/market",
      label: "시장지도",
      activeIcon: mapIconColor,
      inactiveIcon: mapIconGray,
    },
    {
      to: "/stamp",
      label: "도장깨기",
      activeIcon: stampIconColor,
      inactiveIcon: stampIconGray,
    },
    {
      to: "/mypage",
      label: "마이페이지",
      activeIcon: mypageIconColor,
      inactiveIcon: mypageIconGray,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex bg-white h-[71px] w-full border-t  border-gray-200"
      style={{ boxShadow: "0 -2px 5px rgba(0,0,0,0.05)" }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname.startsWith(item.to);

        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center justify-center w-1/4 text-body4 text-center relative`}
          >
            {isActive && (
              <span className="absolute top-0 left-0 right-0 h-[3px] w-[80px] m-auto bg-primary" />
            )}
            <img
              src={isActive ? item.activeIcon : item.inactiveIcon}
              alt={item.label}
              className="w-[24px] h-[24px]"
            />
            <span
              className={`mt-[6px] ${
                isActive ? "text-primary" : "text-gray-400"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavBar;
