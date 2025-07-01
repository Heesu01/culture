import Axios from "@/shared/api/Axios";

// 지역별 도감 진행률
export const getRegionsProgress = async () => {
  const response = await Axios.get("/market-books/mypage");
  return response.data.data;
};
