import axios from "@/shared/api/Axios";
import type { LoginPayload, LoginResponse } from "@/features/auth/types/auth";

// 로그인 API
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>("/auth/login", payload);
  return data;
};
