import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Splash = () => {
  const navigate = useNavigate();
  const [fadeClass, setFadeClass] = useState("opacity-0");

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setFadeClass("opacity-100");
    }, 10);

    const fadeOutTimer = setTimeout(() => {
      setFadeClass("opacity-0");
    }, 1500);

    const navTimer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#FF6200] to-[#FF8000] mt-[-56px] transition-opacity duration-500 ${fadeClass}`}
    >
      <img src={logo} alt="로고" className="w-40" />
    </div>
  );
};

export default Splash;
