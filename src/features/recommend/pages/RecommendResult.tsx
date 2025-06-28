import { useNavigate } from "react-router-dom";
import RecommendHeader from "@/features/recommend/components/RecommendHeader";
import Button from "@/shared/components/Button";

const RecommendResult = () => {
  const navigate = useNavigate();

  const handleGoMarket = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col h-full">
      <RecommendHeader />

      <div className="flex flex-col items-center justify-center text-center mt-[24px]">
        <h1 className="text-headline1 mb-[8px]">
          지금 당신에게 딱!
          <br />
          <span className="text-primary">망원시장</span>으로 모십니다!
        </h1>
        <p className="text-body2 text-subtext">
          힙한 감성 + 맛있는 먹거리 = 망원시장 코스, 지금 바로 출발!
        </p>
      </div>

      <div className="fixed bottom-[121px] w-full flex justify-center px-[32px]">
        <Button
          variant="primary"
          onClick={handleGoMarket}
          className="w-full text-subtitle1"
        >
          시장 구경하기
        </Button>
      </div>
    </div>
  );
};

export default RecommendResult;
