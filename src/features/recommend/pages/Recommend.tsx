import { useNavigate } from "react-router-dom";
import RecommendHeader from "../components/RecommendHeader";
import startImg from "@/features/recommend/assets/start.png";
import Button from "@/shared/components/Button";

const Recommend = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/recommend/survey");
  };

  return (
    <div className="flex flex-col h-full ">
      <RecommendHeader />
      <div className="flex flex-col items-center justify-center text-center pt-[120px]">
        <h1 className="text-headline1 ">
          어디부터 돌아볼지 모르겠다면?
          <br /> AI한테 추천 한번 받아볼래?
        </h1>
        <p className="text-body2 text-subtext mt-[8px]">
          당신에게 딱 맞춘 시장 코스를 추천해드려요!
        </p>

        <img
          src={startImg}
          alt="추천 캐릭터"
          className="mt-[70px] w-[165px] h-[159px] "
        />
      </div>

      <div className="absolute bottom-[50px] w-full flex justify-center px-[32px]">
        <Button variant="primary" onClick={handleStart} className="w-full">
          시작하기
        </Button>
      </div>
    </div>
  );
};

export default Recommend;
