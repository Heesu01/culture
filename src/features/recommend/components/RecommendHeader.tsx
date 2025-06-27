import { useNavigate } from "react-router-dom";
import backImg from "@/features/recommend/assets/back.png";

const RecommendHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex items-center h-[44px] mt-[44px]">
      <button className="absolute left-[32px]" onClick={() => navigate(-1)}>
        <img src={backImg} alt="뒤로가기" className="w-6 h-6 object-contain" />
      </button>

      <span className="text-subtitle1 absolute left-1/2 -translate-x-1/2">
        AI 시장 추천
      </span>
    </div>
  );
};

export default RecommendHeader;
