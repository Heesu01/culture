import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRegionMarketBooks } from "@/features/stamp/api/stampApi";
import type { MarketStamp, RawMarket } from "@/features/stamp/types/stamp";
import backImgB from "@/assets/back.png";
import backImgW from "@/features/stamp/assets/backW.png";
import TrueStamp from "@/features/stamp/assets/TrueStamp.png";
import FalseStamp from "@/features/stamp/assets/FalseStamp.png";
import CompleteModal from "@/features/stamp/components/CompleteModal";

const StampDetail = () => {
  const navigate = useNavigate();
  const { region } = useParams<{ region: string }>();
  const [stamps, setStamps] = useState<MarketStamp[]>([]);
  const [showModal, setShowModal] = useState(false);

  const visitedCount = stamps.filter((s) => s.visited).length;
  const totalCount = stamps.length;
  const progress = totalCount
    ? Number(((visitedCount / totalCount) * 100).toFixed(0))
    : 0;

  useEffect(() => {
    const fetchMarketBooks = async () => {
      try {
        if (!region) return;

        const data = await getRegionMarketBooks(region);
        const marketData: MarketStamp[] = data.markets.map((m: RawMarket) => ({
          marketId: m.marketId,
          marketName: m.marketName,
          visited: m.visited,
        }));
        setStamps(marketData);
      } catch (error) {
        console.error("지역 스탬프 데이터 조회 실패", error);
      }
    };

    fetchMarketBooks();
  }, [region]);

  useEffect(() => {
    if (progress === 100) {
      setShowModal(true);
    }
  }, [progress]);

  const bgColor = progress === 0 ? "bg-deactivate" : "bg-primary";
  const backIcon = progress === 0 ? backImgB : backImgW;
  const textColor = progress === 0 ? "text-black" : "text-white";

  return (
    <div className="flex flex-col h-screen  mt-[-56px]">
      <div className={`relative flex items-center h-[56px] ${bgColor}`}>
        <button className="absolute left-[32px]" onClick={() => navigate(-1)}>
          <img
            src={backIcon}
            alt="뒤로가기"
            className="w-6 h-6 object-contain"
          />
        </button>
        <p
          className={`text-subtitle1 absolute left-1/2 -translate-x-1/2 ${textColor}`}
        >
          My 도감
        </p>
      </div>

      <div className={`${bgColor} px-[32px] py-[32px] rounded-b-[20px]`}>
        <div className="relative flex justify-center mb-[20px]">
          <h2 className={`text-headline1 ${textColor}`}>{region}</h2>
          <span className="absolute translate-x-[82px] top-1/2 -translate-y-1/2 bg-white text-primary px-[12px] py-[8px] rounded-full text-body4">
            진행률 {progress}%
          </span>
        </div>

        <div
          className={`w-full h-[10px] rounded-full overflow-hidden mb-[8px] ${
            progress === 0 ? "bg-deactivate-text" : "bg-[#833200]"
          }`}
        >
          <div className="h-full bg-white" style={{ width: `${progress}%` }} />
        </div>

        <p
          className={`text-body4 flex justify-between items-center ${
            progress === 0 ? "text-deactivate-text" : "text-white"
          }`}
        >
          <span>도장깬곳</span>
          <span>
            {visitedCount} / {totalCount}
          </span>
        </p>
      </div>

      <div className="flex-1 min-h-0 flex justify-center items-center">
        <div className="w-full h-full overflow-y-auto">
          <div className="grid grid-cols-3 gap-[28px] p-[32px]">
            {stamps.map((stamp) => {
              const trimmedMarketName = stamp.marketName
                .replace(/\([^)]*\)/g, "")
                .replace(/（[^）]*）/g, "")
                .trim();

              const visibleMarketName =
                trimmedMarketName.length > 8
                  ? trimmedMarketName.slice(0, 8) + "..."
                  : trimmedMarketName;

              const trimmed = stamp.marketName.replace(/시장$/, "");
              let displayName = trimmed;
              if (trimmed.length === 4) {
                displayName = trimmed.slice(0, 2);
              } else if (trimmed.length >= 5) {
                displayName = trimmed.slice(0, 3);
              }

              return (
                <div
                  key={stamp.marketId}
                  className="relative flex flex-col items-center"
                >
                  <img
                    src={stamp.visited ? TrueStamp : FalseStamp}
                    alt={stamp.marketName}
                    className="w-[85px] h-[85px]"
                  />
                  <span
                    className={`absolute top-[32px] flex items-center justify-center text-body1 font-bmdoM rotate-[10deg] ${
                      stamp.visited ? "text-primary" : "text-deactivate-text"
                    }`}
                  >
                    {displayName}
                  </span>

                  <span className="text-body1 mt-[4px] text-center whitespace-nowrap overflow-hidden text-ellipsis ">
                    {visibleMarketName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showModal && (
        <CompleteModal
          region={region || ""}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default StampDetail;
