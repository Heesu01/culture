import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import Header from "@/shared/components/Header";
import StampBadge from "@/features/stamp/components/Stamp";
import Modal from "@/features/stamp/components/Modal";
import ConfirmModal from "@/features/stamp/components/ConfirmModal";

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

  const [showModal, setShowModal] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState<Stamp | null>(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
        <StampBadge name={market.marketName} visited={market.visited} />
      );

      const marker = new window.naver.maps.Marker({
        position,
        map: mapInstance.current,
        icon: {
          content: badgeHTML,
          size: new window.naver.maps.Size(80, 80),
          anchor: new window.naver.maps.Point(40, 40),
        },
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        if (!market.visited) {
          setSelectedStamp(market);
          setShowModal(true);
        }
      });
    });
  }, [stamps]);

  const handleConfirm = () => {
    console.log("인증 시작:", selectedStamp?.marketName);
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const handleConfirmModalClose = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title={"도장깨기"} showBack={true} />
      <div ref={mapElement} className="flex-1 w-full" />

      {showModal && selectedStamp && (
        <Modal
          title="시장 위치 인증"
          description={`도장깨기를 완료하려면\n현재 ${selectedStamp.marketName} 위치를 인증해야해요!`}
          onConfirm={handleConfirm}
          onCancel={handleConfirmModalClose}
        />
      )}

      {showConfirmModal && selectedStamp && (
        <ConfirmModal
          marketName={selectedStamp.marketName}
          onClose={handleConfirmModalClose}
        />
      )}
    </div>
  );
};

export default StampMap;
