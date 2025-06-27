import { useNavigate } from "react-router-dom";
import backImg from "@/assets/back.png";

interface CommonHeaderProps {
  title: string;
  showBack?: boolean;
}

const Header = ({ title, showBack = true }: CommonHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center h-[44px] mt-[44px]">
      {showBack && (
        <button className="absolute left-[32px]" onClick={() => navigate(-1)}>
          <img
            src={backImg}
            alt="뒤로가기"
            className="w-6 h-6 object-contain"
          />
        </button>
      )}

      <span className="text-subtitle1 absolute left-1/2 -translate-x-1/2">
        {title}
      </span>
    </div>
  );
};

export default Header;
