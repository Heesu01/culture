import Map from "@/features/market/components/Map";
import Header from "@/shared/components/Header";

const Home = () => {
  return (
    <div className="flex flex-col  h-[93vh]">
      <Header title={"시장 지도"} showBack={false} />
      <div className="flex-grow">
        <Map />
      </div>
    </div>
  );
};

export default Home;
