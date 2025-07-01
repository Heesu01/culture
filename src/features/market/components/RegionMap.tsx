import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { regions } from "@/features/market/data/regions";
import markerImg from "@/features/market/assets/marker.png";
import chatbotIcon from "@/features/market/assets/chatbot.png";
import type { Market } from "@/features/market/types/market";
import { getMarkets } from "@/features/market/api/marketApi";

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
  const [markets, setMarkets] = useState<Market[]>([]);
  const [showHint, setShowHint] = useState(true);

  const region = regions.find((r) => r.name === regionName);

  useEffect(() => {
    if (!regionName) return;

    const fetchMarkets = async () => {
      try {
        const encodedRegion = encodeURIComponent(regionName);
        const res = await getMarkets(encodedRegion);
        setMarkets(res.data.markets);
      } catch (error) {
        console.error("전통시장 목록 불러오기 실패:", error);
      }
    };

    fetchMarkets();
  }, [regionName]);

  useEffect(() => {
    if (!region || !markets.length) return;

    loadNaverMapScript(() => {
      if (!mapElement.current || !window.naver) return;

      const map = new window.naver.maps.Map(mapElement.current, {
        center: new window.naver.maps.LatLng(region.lat, region.lng),
        zoom: 12,
      });

      markets.forEach((market) => {
        const position = new window.naver.maps.LatLng(
          Number(market.y),
          Number(market.x)
        );

        const marker = new window.naver.maps.Marker({
          position,
          map: map,
          icon: {
            content: `
              <div class="marker-wrapper flex flex-col items-center">
                <div class="marker-label text-body3 bg-white px-[12px] py-[4px] rounded-[8px] shadow whitespace-nowrap">
                  ${market.marketName}
                </div>
                <img src="${markerImg}" alt="마커" class="w-[20px] mt-[4px]" />
              </div>
            `,
            size: new window.naver.maps.Size(80, 50),
            anchor: new window.naver.maps.Point(40, 50),
          },
        });

        window.naver.maps.Event.addListener(marker, "click", () => {
          map.setCenter(position);
          map.setZoom(18);
        });
      });

      const toggleLabels = () => {
        const zoom = map.getZoom();
        const labels = document.querySelectorAll(".marker-label");

        labels.forEach((label) => {
          if (zoom >= 14) {
            (label as HTMLElement).style.display = "block";
          } else {
            (label as HTMLElement).style.display = "none";
          }
        });

        if (zoom >= 14) {
          setShowHint(false);
        } else {
          setShowHint(true);
        }
      };

      toggleLabels();

      window.naver.maps.Event.addListener(map, "zoom_changed", toggleLabels);
    });
  }, [region, markets]);

  return (
    <div className="relative w-full h-full">
      {region ? (
        <>
          {showHint && (
            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-md text-body4 z-10 whitespace-nowrap">
              지도를 확대하면 시장 이름을 확인할 수 있어요!
            </div>
          )}

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
