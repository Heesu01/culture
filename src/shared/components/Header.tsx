import { useNavigate } from "react-router-dom";
import backImg from "@/assets/back.png";
import closeImg from "@/assets/close.png";

interface CommonHeaderProps {
  title: string;
  showBack?: boolean;
  showClose?: boolean;
  onClosePath?: string;
}

const Header = ({
  title,
  showBack = true,
  showClose = false,
  onClosePath,
}: CommonHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center h-[56px]">
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

      {showClose && (
        <button
          className="absolute right-[32px]"
          onClick={() => (onClosePath ? navigate(onClosePath) : navigate(-1))}
        >
          <img
            src={closeImg}
            alt="닫기"
            className="w-[14px] h-[14px] object-contain"
          />
        </button>
      )}
    </div>
  );
};

export default Header;
