import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import Header from "@/shared/components/Header";
import StampBadge from "@/features/stamp/components/Stamp";
import Modal from "@/features/stamp/components/Modal";
import ConfirmModal from "@/features/stamp/components/ConfirmModal";
import { fetchStampMarkets } from "@/features/stamp/api/stampApi";

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

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            const map = new window.naver.maps.Map(mapElement.current, {
              center: new window.naver.maps.LatLng(lat, lng),
              zoom: 17,
            });
            mapInstance.current = map;

            new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(lat, lng),
              map: map,
              icon: {
                content: `
                <div class="w-[20px] h-[20px] bg-primary rounded-full border-2 border-white shadow"></div>
              `,
                size: new window.naver.maps.Size(14, 14),
                anchor: new window.naver.maps.Point(7, 7),
              },
            });
          },
          (err) => {
            console.warn("위치 못 가져옴:", err);
            mapInstance.current = new window.naver.maps.Map(
              mapElement.current,
              {
                center: new window.naver.maps.LatLng(37.5665, 126.978),
                zoom: 12,
              }
            );
          }
        );
      } else {
        console.warn("Geolocation 지원 안됨");
        mapInstance.current = new window.naver.maps.Map(mapElement.current, {
          center: new window.naver.maps.LatLng(37.5665, 126.978),
          zoom: 12,
        });
      }
    });
  }, []);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const res = await fetchStampMarkets();
        setStamps(res.data.markets);
      } catch (error) {
        console.error("도감 데이터 불러오기 실패:", error);
      }
    };

    fetchMarkets();
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

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedStamp(null);
  };

  const handleConfirmModalClose = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="flex flex-col h-screen relative">
      <Header title={"도장깨기"} showBack={true} />
      <div className="bg-[#F9FAFB] px-4 py-3 text-center text-body2 text-gray-600 border-b border-gray-200">
        📍 현재 위치 주변의 전통시장을 둘러보고
        <br />
        아직 안 깬 도장을 클릭해 인증해보세요!
      </div>
      {/* <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-md text-body3 z-10 whitespace-nowrap">
        현재 위치 주변의 전통시장을 둘러보고
        <br />
        아직 안 깬 도장을 클릭해 인증해보세요!
      </div> */}

      <div ref={mapElement} className="flex-1 w-full" />

      {showModal && selectedStamp && (
        <Modal
          title="시장 위치 인증"
          description={`도장깨기를 완료하려면\n현재 ${selectedStamp.marketName} 위치를 인증해야해요!`}
          onConfirm={handleConfirm}
          onCancel={handleModalClose}
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
