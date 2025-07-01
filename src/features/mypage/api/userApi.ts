import Axios from "@/shared/api/Axios";
import type { UserInfo } from "@/features/mypage/types/user";
import type { UserRanking } from "../types/rank";

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await Axios.get("/users/info");
  return response.data.data;
};

export const getRankings = async (): Promise<{
  rankings: UserRanking[];
  myRank: UserRanking;
}> => {
  const res = await Axios.get("/users/rank");
  return res.data.data;
};
