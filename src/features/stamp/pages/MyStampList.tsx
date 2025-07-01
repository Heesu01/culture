import { useEffect, useState } from "react";
import Header from "@/shared/components/Header";
import StampCard from "@/features/stamp/components/StampCard";
import type { RegionProgress } from "@/features/stamp/types/stamp";
import { useNavigate } from "react-router-dom";

const MyStampList = () => {
  const [regions, setRegions] = useState<RegionProgress[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = {
      regions: [
        { region: "울산", visitCount: 21, totalCount: 42, progressRate: 24 },
        { region: "충북", visitCount: 11, totalCount: 55, progressRate: 54 },
        { region: "서울", visitCount: 1, totalCount: 189, progressRate: 88 },
        { region: "전북", visitCount: 0, totalCount: 57, progressRate: 100 },
        { region: "경기", visitCount: 0, totalCount: 150, progressRate: 0 },
      ],
    };
    setRegions(data.regions);
  }, []);

  const activeRegions = regions.filter((r) => r.progressRate > 0);
  const inactiveRegions = regions.filter((r) => r.progressRate === 0);

  return (
    <div className="h-full flex flex-col ">
      <Header
        title="My 도감"
        showBack={true}
        onBack={() => navigate("/stamp")}
      />

      <div className="overflow-x-auto pt-[24px] mb-[32px]">
        <div className="flex gap-[20px] px-[32px]">
          {activeRegions.map((region) => (
            <StampCard
              key={region.region}
              region={region.region}
              total={region.totalCount}
              progress={region.progressRate}
            />
          ))}
        </div>
      </div>

      <div className="overflow-x-auto pb-[24px]">
        <div className="flex gap-[20px] px-[32px]">
          {inactiveRegions.map((region) => (
            <StampCard
              key={region.region}
              region={region.region}
              total={region.totalCount}
              progress={0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyStampList;
