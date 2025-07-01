import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { regions } from "@/features/market/data/regions";
import markerImg from "@/features/market/assets/marker.png";
import chatbotIcon from "@/features/market/assets/chatbot.png";
import type { Market } from "@/features/market/types/market";

const NAVER_MAP_CLIENT_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

function loadNaverMapScript(callback: () => void) {
  if (document.getElementById("naver-map-script")) {
    if (window.naver) callback();
    return;
  }
  const script = document.createElement("script");
  script.id = "naver-map-script";
  script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_MAP_CLIENT_ID}`;
  script.async = true;
  script.onload = callback;
  document.body.appendChild(script);
}

const RegionMap = () => {
  const { regionName } = useParams<{ regionName: string }>();
  const mapElement = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const region = regions.find((r) => r.name === regionName);

  useEffect(() => {
    if (!region) return;

    loadNaverMapScript(() => {
      if (!mapElement.current || !window.naver) return;

      const map = new window.naver.maps.Map(mapElement.current, {
        center: new window.naver.maps.LatLng(region.lat, region.lng),
        zoom: 12,
      });

      const mockMarkets: Market[] = [
        {
          marketId: "011bcb44-987f-4bc5-8c10-46218f1879f6",
          marketName: "동원전통종합시장",
          address: "서울특별시 중랑구 상봉로11길 27-3 면목동",
          x: "127.0921089",
          y: "37.58982861",
        },
        {
          marketId: "2",
          marketName: "풍납시장",
          address: "서울특별시 송파구 바람드리길",
          x: "127.1176729",
          y: "37.53803468",
        },
      ];

      mockMarkets.forEach((market) => {
        const position = new window.naver.maps.LatLng(
          Number(market.y),
          Number(market.x)
        );

        new window.naver.maps.Marker({
          position,
          map: map,
          icon: {
            content: `
              <div class="flex flex-col items-center">
                <div class="text-body3 bg-white px-[12px] py-[4px] rounded-[8px] shadow">
                  ${market.marketName}
                </div>
                <img src="${markerImg}" alt="마커" class="w-[20px] mt-[4px]" />
              </div>
            `,
            size: new window.naver.maps.Size(80, 50),
            anchor: new window.naver.maps.Point(40, 50),
          },
        });
      });
    });
  }, [region]);

  return (
    <div className="relative w-full h-full">
      {region ? (
        <>
          <div ref={mapElement} className="w-full h-full" />

          <button
            onClick={() => navigate("/chatbot")}
            className="
              fixed bottom-[111px] right-[32px]
              w-[48px] h-[48px]
              rounded-full bg-white 
              flex items-center justify-center
            "
          >
            <img src={chatbotIcon} alt="챗봇" className="w-[28px] h-[31px]" />
          </button>
        </>
      ) : (
        <div className="p-4">해당 지역 정보를 찾을 수 없습니다.</div>
      )}
    </div>
  );
};

export default RegionMap;
