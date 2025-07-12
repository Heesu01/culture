import { useNavigate } from "react-router-dom";
import backImg from "@/assets/back.png";
import closeImg from "@/assets/close.png";

interface CommonHeaderProps {
  title: string;
  showBack?: boolean;
  showClose?: boolean;
  onClosePath?: string;
  backPath?: string;
  onBack?: () => void;
  bgColor?: string;
}

const Header = ({
  title,
  showBack = true,
  showClose = false,
  onClosePath,
  backPath,
  onBack,
  bgColor = "bg-white",
}: CommonHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`z-50 fixed top-0 left-0 w-full flex items-center h-[56px] ${bgColor}`}
    >
      {showBack && (
        <button
          className="absolute left-[32px]"
          onClick={() => {
            if (onBack) {
              onBack();
            } else if (backPath) {
              navigate(backPath);
            } else {
              navigate(-1);
            }
          }}
        >
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
