import Axios from "@/shared/api/Axios";

export const postSurvey = async (payload: Record<string, string>) => {
  const response = await Axios.post("/surveys/score", payload);
  return response.data;
};
