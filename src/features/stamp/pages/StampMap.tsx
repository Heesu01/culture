import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import Header from "@/shared/components/Header";
import StampBadge from "@/features/stamp/components/Stamp";

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

type Stamp = {
  marketId: string;
  marketName: string;
  visited: boolean;
  visitedAt: string | null;
  x: string;
  y: string;
};

const StampMap = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [stamps, setStamps] = useState<Stamp[]>([]);
  const mapInstance = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    loadNaverMapScript(() => {
      if (!mapElement.current || !window.naver) return;

      mapInstance.current = new window.naver.maps.Map(mapElement.current, {
        center: new window.naver.maps.LatLng(37.5665, 126.978),
        zoom: 12,
      });
    });
  }, []);

  useEffect(() => {
    const mock = [
      {
        marketId: "00b8680f-5fd4-47d7-88bb-4ed5627e146e",
        marketName: "평화시장",
        visited: false,
        visitedAt: null,
        x: "127.1176729",
        y: "37.53803468",
      },
      {
        marketId: "11bcb44-987f-4bc5-8c10-46218f18aaaa",
        marketName: "동원시장",
        visited: true,
        visitedAt: "2024-01-01",
        x: "127.0921089",
        y: "37.58982861",
      },
    ];
    setStamps(mock);
  }, []);

  useEffect(() => {
    if (!window.naver || !mapInstance.current) return;

    stamps.forEach((market) => {
      const position = new window.naver.maps.LatLng(
        Number(market.y),
        Number(market.x)
      );

      const badgeHTML = ReactDOMServer.renderToStaticMarkup(
        <StampBadge name={market.marketName} />
      );

      new window.naver.maps.Marker({
        position,
        map: mapInstance.current,
        icon: {
          content: badgeHTML,
          size: new window.naver.maps.Size(80, 80),
          anchor: new window.naver.maps.Point(40, 40),
        },
      });
    });
  }, [stamps]);

  return (
    <div className="flex flex-col h-screen">
      <Header title={"도장깨기"} showBack={true} />
      <div ref={mapElement} className="flex-1 w-full" />
    </div>
  );
};

export default StampMap;
