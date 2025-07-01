import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backImgB from "@/assets/back.png";
import backImgW from "@/features/stamp/assets/backW.png";
import TrueStamp from "@/features/stamp/assets/TrueStamp.png";
import FalseStamp from "@/features/stamp/assets/FalseStamp.png";
import CompleteModal from "@/features/stamp/components/CompleteModal";

const StampDetail = () => {
  const navigate = useNavigate();
  const { region } = useParams<{ region: string }>();
  const [showModal, setShowModal] = useState(false);

  const stamps = [
    { id: "1", name: "망원시장", visited: false },
    { id: "2", name: "으잉시장", visited: false },
    { id: "2-1", name: "으잉시장", visited: false },
    { id: "1-1", name: "망원시장", visited: false },
    { id: "3", name: "으엥시장", visited: false },
  ];

  const visitedCount = stamps.filter((s) => s.visited).length;
  const totalCount = stamps.length;
  const progress = Number(((visitedCount / totalCount) * 100).toFixed(0));

  useEffect(() => {
    if (progress === 100) {
      setShowModal(true);
    }
  }, [progress]);

  let bgColor = "bg-deactivate";
  if (progress === 100) {
    bgColor = "bg-primary";
  } else if (progress > 0 && progress < 100) {
    bgColor = "bg-sub";
  }

  const backIcon = progress === 0 ? backImgB : backImgW;
  const textColor = progress === 0 ? "text-black" : "text-white";

  return (
    <div className="flex flex-col h-screen pb-[71px]">
      <div className={`h-[44px] ${bgColor}`} />

      <div className={`relative flex items-center h-[44px] ${bgColor}`}>
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
            {stamps.map((stamp) => (
              <div
                key={stamp.id}
                className="relative flex flex-col items-center"
              >
                <img
                  src={stamp.visited ? TrueStamp : FalseStamp}
                  alt={stamp.name}
                  className="w-[85px] h-[85px]"
                />
                <span
                  className={`absolute top-[28%] flex items-center justify-center text-body1 font-bold ${
                    stamp.visited ? "text-primary" : "text-deactivate-text"
                  }`}
                >
                  {stamp.name.replace(/시장$/, "")}
                </span>

                <span className="text-body1 mt-[4px]">{stamp.name}</span>
              </div>
            ))}
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
