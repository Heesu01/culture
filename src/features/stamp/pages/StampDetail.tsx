import { useNavigate } from "react-router-dom";
import backImg from "@/assets/back.png";
import TrueStamp from "@/features/stamp/assets/TrueStamp.png";
import FalseStamp from "@/features/stamp/assets/FalseStamp.png";

const StampDetail = () => {
  const navigate = useNavigate();

  const stamps = [
    { id: "1", name: "망원시장", visited: true },
    { id: "2", name: "으잉시장", visited: false },
    { id: "3", name: "으엥시장", visited: false },
  ];

  return (
    <div className="flex flex-col h-screen pb-[71px] ">
      <div className="h-[44px] bg-primary"></div>
      <div className="relative flex items-center h-[44px] bg-primary">
        <button className="absolute left-[32px]" onClick={() => navigate(-1)}>
          <img
            src={backImg}
            alt="뒤로가기"
            className="w-6 h-6 object-contain"
          />
        </button>

        <p className="text-subtitle1 absolute left-1/2 -translate-x-1/2 bg-primary">
          도장깨기
        </p>
      </div>

      <div className="bg-primary px-[32px] py-[32px] text-white rounded-b-[20px]">
        <h2 className="text-headline1 mb-[20px] text-center">서울</h2>
        <div className="w-full bg-[#AD7000] h-[8px] rounded-full overflow-hidden mb-[8px]">
          <div
            className="h-full bg-white"
            style={{ width: `${(7 / 12) * 100}%` }}
          />
        </div>
        <p className="text-body4 flex justify-between items-center">
          <span>진행률 </span>
          <span>7 / 12</span>
        </p>
      </div>

      <div className="flex-1 min-h-0 flex justify-center items-center">
        <div className="w-full h-full overflow-y-auto">
          <div className="grid grid-cols-3 gap-[28px] p-[32px]">
            {stamps.map((stamp) => (
              <div key={stamp.id} className="flex flex-col items-center">
                <img
                  src={stamp.visited ? TrueStamp : FalseStamp}
                  alt={stamp.name}
                  className="w-[85px] h-[85px]"
                />
                <span className="text-body1 mt-[4px]">{stamp.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StampDetail;
