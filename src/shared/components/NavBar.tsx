import { Link, useLocation } from "react-router-dom";
import aiIcon from "@/assets/navigation/ai.png";
import mapIcon from "@/assets/navigation/map.png";
import stampIcon from "@/assets/navigation/stamp.png";
import mypageIcon from "@/assets/navigation/user.png";

const NavBar = () => {
  const location = useLocation();

  const navItems = [
    { to: "/recommend", label: "AI 추천코스", icon: aiIcon },
    { to: "/market", label: "시장지도", icon: mapIcon },
    { to: "/stamp", label: "도장깨기", icon: stampIcon },
    { to: "/mypage", label: "마이페이지", icon: mypageIcon },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex bg-white shadow-gray-100 h-[71px] w-full"
      style={{ boxShadow: "0 -2px 5px rgba(0,0,0,0.05)" }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname.startsWith(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            className="flex flex-col items-center justify-center w-1/4 text-body4 text-center"
          >
            <img
              src={item.icon}
              alt={item.label}
              className={`w-[24px] h-[24px] ${
                isActive ? "fill-orange-500" : "grayscale"
              }`}
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
