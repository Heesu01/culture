import { useEffect, useState } from "react";
import Header from "@/shared/components/Header";
import StampCard from "@/features/stamp/components/StampCard";
import { getRegionsProgress } from "@/features/stamp/api/stampApi";
import type { RegionProgress } from "@/features/stamp/types/stamp";
import { useNavigate } from "react-router-dom";

const MyStampList = () => {
  const [regions, setRegions] = useState<RegionProgress[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await getRegionsProgress();
        setRegions(data.regions);
      } catch (error) {
        console.error("지역 진행률 가져오기 실패:", error);
      }
    };

    fetchRegions();
  }, []);

  const activeRegions = regions.filter((r) => r.progressRate > 0);
  const inactiveRegions = regions.filter((r) => r.progressRate === 0);

  return (
    <div className="h-full flex flex-col">
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
