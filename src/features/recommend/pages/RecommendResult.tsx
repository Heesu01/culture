import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/shared/components/Header";
import finishImg from "@/features/recommend/assets/finish.png";
import Button from "@/shared/components/Button";

const RecommendResult = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { market, x, y, region } = location.state || {};
  const marketName = market || "추천시장";

  const handleGoMarket = () => {
    navigate(`/market/${region}`, {
      state: { x, y, marketName },
    });
  };
  return (
    <div className="flex flex-col h-full">
      <Header
        title="AI 추천 코스"
        showBack={false}
        showClose={true}
        onClosePath="/"
      />

      <div className="flex flex-col items-center justify-center text-center mt-[68px]">
        <h1 className="text-headline1 mb-[8px]">
          지금 당신에게 딱!
          <br />
          <span className="text-primary">{marketName}</span>으로 모십니다!
        </h1>
        <p className="text-body2 text-subtext mb-[100px]">
          {marketName} 코스, 지금 바로 출발!
        </p>
      </div>
      <img
        src={finishImg}
        alt="추천 끝 캐릭터"
        className="mt-[70px] w-[361px] h-[223px] m-auto "
      />
      <div className="fixed bottom-[50px] w-full flex justify-center px-[32px]">
        <Button
          variant="primary"
          onClick={handleGoMarket}
          className="w-full text-subtitle1"
        >
          바로 둘러보기
        </Button>
      </div>
    </div>
  );
};

export default RecommendResult;
