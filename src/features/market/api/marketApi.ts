import Axios from "@/shared/api/Axios";
import type { GetMarketsResponse } from "@/features/market/types/market";

export const getMarkets = async (
  region: string
): Promise<GetMarketsResponse> => {
  const { data } = await Axios.get<GetMarketsResponse>(
    `/markets?region=${region}`
  );
  return data;
};
