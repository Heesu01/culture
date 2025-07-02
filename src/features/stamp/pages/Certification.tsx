import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/shared/components/Button";
import Header from "@/shared/components/Header";
import stampResult from "@/features/stamp/assets/stampResult.png";
import { useEffect, useState } from "react";
import { postRegionByMarket } from "../api/stampApi";

const Certification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const marketName = location.state?.marketName || "시장";
  const [region, setRegion] = useState<string | null>(null);

  const trimmed = marketName.replace(/시장$/, "");
  let displayName = trimmed;
  if (trimmed.length === 4) {
    displayName = trimmed.slice(0, 2);
  } else if (trimmed.length >= 5) {
    displayName = trimmed.slice(0, 3);
  }

  const handleGoToMyCollection = () => {
    if (region) {
      navigate(`/stamp/mystamp/${region}`);
    } else {
      alert("지역 정보가 없어 My 도감으로 이동할 수 없습니다.");
    }
  };
  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const res = await postRegionByMarket({ marketName });
        setRegion(res.data.region);
      } catch (error) {
        console.error("지역명 가져오기 실패:", error);
        alert("지역 정보를 가져올 수 없습니다.");
      }
    };

    if (marketName) {
      fetchRegion();
    }
  }, [marketName]);

  return (
    <div className="flex flex-col h-screen">
      <Header
        title="시장 위치 인증"
        showBack={false}
        showClose={true}
        onClosePath="/stamp"
      />

      <div className="flex flex-col items-center mt-[68px] text-center">
        <h2 className="text-headline1 mb-[8px] ">
          {marketName} 도장깨기 완료!
          <br />
          My 도감에서 확인할 수 있어요!
        </h2>
        <p className="text-body2 text-subtext mb-[76px]">
          My 도감에서는 도장깨기 완료한 도장들을 한눈에 볼 수 있어요!
        </p>
        <div className="relative w-[325px] h-auto">
          <img
            src={stampResult}
            alt="스탬프 인증 완료"
            className="w-full h-auto"
          />
          <span className="absolute top-[43%] left-[52%] -translate-x-1/2 -translate-y-1/2 text-[40px] font-bmdoL rotate-[10deg]">
            {displayName}
          </span>
        </div>
      </div>

      <div className="w-full fixed bottom-0 px-[32px] mb-[50px]">
        <Button onClick={handleGoToMyCollection}>My 도감 바로가기</Button>
      </div>
    </div>
  );
};

export default Certification;
