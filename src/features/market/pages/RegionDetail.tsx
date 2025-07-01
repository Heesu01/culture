import Header from "@/shared/components/Header";
import RegionMap from "@/features/market/components/RegionMap";

const RegionDetail = () => {
  return (
    <div className="flex flex-col  h-[93vh]">
      <Header title={"시장 지도"} showBack={true} />
      <div className="flex-grow">
        <RegionMap />
      </div>
    </div>
  );
};

export default RegionDetail;
