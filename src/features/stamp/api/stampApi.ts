import Axios from "@/shared/api/Axios";
import type {
  GetRegionMarketBooksResponse,
  StampResponse,
} from "@/features/stamp/types/stamp";

// 모든 지역 도감 진행률
export const getRegionsProgress = async () => {
  const response = await Axios.get("/market-books/mypage");
  return response.data.data;
};

// 지역별 시장 도감
export const getRegionMarketBooks = async (
  region: string
): Promise<GetRegionMarketBooksResponse> => {
  const response = await Axios.get(`/market-books?region=${region}`);
  return response.data.data;
};

// 전체 시장 도장 리스트 조회
export const fetchStampMarkets = async (): Promise<StampResponse> => {
  const { data } = await Axios.get<StampResponse>("/market-books/all");
  return data;
};

// 시장 방문 인증 등록
export const postVisitedMarket = async (payload: { x: string; y: string }) => {
  return await Axios.post("/visited-markets", payload);
};
