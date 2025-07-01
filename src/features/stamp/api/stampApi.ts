import Axios from "@/shared/api/Axios";
import type { GetRegionMarketBooksResponse } from "../types/stamp";

// 모든 지역 도감 진행률
export const getRegionsProgress = async () => {
  const response = await Axios.get("/market-books/mypage");
  return response.data.data;
};

// 지역별 시장 도장 모음
export const getRegionMarketBooks = async (
  region: string
): Promise<GetRegionMarketBooksResponse> => {
  const response = await Axios.get(`/market-books?region=${region}`);
  return response.data.data;
};
