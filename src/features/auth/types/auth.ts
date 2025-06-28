// 인풋 컴포넌트의 props 타입 정의
export interface AuthInputProps {
  label: string;
  placeholder: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  showToggle?: boolean;
}

// 로그인 api 요청 페이로드와 응답 타입 정의
export interface LoginPayload {
  userId: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}
