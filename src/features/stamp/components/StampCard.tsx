import { useNavigate } from "react-router-dom";
import type { StampCardProps } from "../types/stamp";

import countIcon from "@/features/stamp/assets/count.png";
import countZeroIcon from "@/features/stamp/assets/countZero.png";

import startCharacter from "@/features/stamp/assets/progress/start.png";
import earlyCharacter from "@/features/stamp/assets/progress/early.png";
import midCharacter from "@/features/stamp/assets/progress/mid.png";
import lateCharacter from "@/features/stamp/assets/progress/late.png";
import completeCharacter from "@/features/stamp/assets/progress/complete.png";

const StampCard = ({ region, total, progress }: StampCardProps) => {
  const navigate = useNavigate();
  const isActive = progress > 0;

  let character;
  let description;

  if (progress === 0) {
    character = startCharacter;
    description = "아직 첫 도장깨기를 기다리고 있어요!";
  } else if (progress > 0 && progress <= 40) {
    character = earlyCharacter;
    description = "조금씩 시장이 가까워지고 있어요!";
  } else if (progress > 40 && progress <= 80) {
    character = midCharacter;
    description = "좋아요! 시장 탐방이 한창이네요!";
  } else if (progress > 80 && progress < 100) {
    character = lateCharacter;
    description = "이제 진짜 완성이 눈앞이에요!";
  } else {
    character = completeCharacter;
    description = "축하해요! 모든 시장을 다 모았어요!";
  }

  let bgColor = "bg-deactivate";
  if (progress === 100) {
    bgColor = "bg-primary";
  } else if (progress > 0 && progress < 100) {
    bgColor = "bg-gradient-to-b from-[#FFD633] to-[#FF7700]";
  }

  const handleClick = () => {
    navigate(`/stamp/mystamp/${region}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col px-[30px] py-[20px] rounded-[20px] min-w-[287px] h-[424px] ${bgColor} cursor-pointer`}
    >
      <div
        className={`flex items-center gap-[3.5px] text-body4 mb-[20px] ${
          isActive ? "text-white" : "text-deactivate-text"
        }`}
      >
        <img
          src={isActive ? countIcon : countZeroIcon}
          alt="카운트 아이콘"
          className="w-[20px] h-[20px]"
        />
        <span>{total}</span>
      </div>

      <h3
        className={`text-center text-headline1 mb-[20px] ${
          isActive ? "text-white" : "text-black"
        }`}
      >
        {region}
      </h3>

      <div
        className={`w-full h-[10px] rounded-full mb-[23px] ${
          isActive ? "bg-[#AE5D01]" : "bg-deactivate-text"
        }`}
      >
        <div
          className="h-full rounded-full bg-white"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-center mb-[23px]">
        <div className="w-[148px] h-[148px] rounded-full bg-white flex items-center justify-center shadow">
          <img src={character} alt="장이" className="w-[124px] h-auto" />
        </div>
      </div>

      <div className="flex justify-center mb-[20px]">
        <span className="px-[20px] py-[10px] rounded-full text-body1 bg-white text-primary">
          진행률 {progress}%
        </span>
      </div>

      <p
        className={`text-center text-body4 ${
          isActive ? "text-white" : "text-deactivate-text"
        }`}
      >
        {description}
      </p>
    </div>
  );
};

export default StampCard;
