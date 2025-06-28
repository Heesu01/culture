import axios from "@/shared/api/Axios";
import type {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  SignupResponse,
} from "@/features/auth/types/auth";

// 로그인 API
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>("/auth/login", payload);
  return data;
};

// 회원가입 API
export const signup = async (
  payload: SignupPayload
): Promise<SignupResponse> => {
  const { data } = await axios.post<SignupResponse>("/auth/signup", payload);
  return data;
};
