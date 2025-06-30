import Axios from "@/shared/api/Axios";
import type { UserInfo } from "@/features/mypage/types/user";

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await Axios.get("/users/info");
  return response.data.data;
};
