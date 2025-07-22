import { useEffect, useRef, useState } from "react";
import RegionModal from "@/features/market/components/RegionModal";
import { regions } from "@/features/market/data/regions";

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

const Map = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [selectedRegion, setSelectedRegion] = useState<
    null | (typeof regions)[0]
  >(null);
  const [showGuide, setShowGuide] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    loadNaverMapScript(() => {
      if (!mapElement.current || !window.naver) return;

      const map = new window.naver.maps.Map(mapElement.current, {
        center: new window.naver.maps.LatLng(35.5, 127.5),
        zoom: 7,
      });

      regions.forEach((region) => {
        const position = new window.naver.maps.LatLng(
          region.markerLat,
          region.markerLng
        );

        const marker = new window.naver.maps.Marker({
          position,
          map: map,
          icon: {
            content: `
              <div class="relative inline-block bg-black text-white px-2 py-1 rounded-md text-body3 whitespace-nowrap">
                ${region.name}
                <div class="absolute left-1/2 -translate-x-1/2 -bottom-[6px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-black"></div>
              </div>
            `,
            size: new window.naver.maps.Size(80, 28),
            anchor: new window.naver.maps.Point(40, 28),
          },
        });

        window.naver.maps.Event.addListener(marker, "click", () => {
          setSelectedRegion(region);
        });
      });
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2000);
    const hideTimer = setTimeout(() => setShowGuide(false), 2500);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      <div ref={mapElement} className="w-full h-full relative">
        {showGuide && (
          <div
            className={`fixed top-24 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow text-body2 z-50 text-center transition-opacity duration-500 min-w-[60%] ${
              fadeOut ? "animate-fadeout" : "animate-fadein"
            }`}
          >
            어느 <span className="text-primary font-semibold">지역 시장</span>이
            궁금한가요?
            <br /> 🗺️ 지도를 눌러 확인해보세요
          </div>
        )}
      </div>
      {selectedRegion && <RegionModal region={selectedRegion} />}
    </>
  );
};

export default Map;
