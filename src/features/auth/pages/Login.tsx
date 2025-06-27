import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/shared/components/Header";
import AuthInput from "@/features/auth/components/AuthInput";
import Button from "@/shared/components/Button";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("로그인 시도:", { email, password });
  };

  const handleGoRegister = () => {
    navigate("/signup");
  };

  return (
    <div className="relative flex flex-col min-h-screen px-[32px]">
      <Header title="로그인" showBack={false} />

      <div className="flex flex-col justify-center mt-[26px]">
        <AuthInput
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          type="email"
          value={email}
          onChange={setEmail}
        />

        <AuthInput
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          type="password"
          value={password}
          onChange={setPassword}
          showToggle
        />

        <div className="text-right text-body2 text-subtext">
          아이디/비밀번호 찾기
        </div>

        <Button
          variant="primary"
          onClick={handleLogin}
          className="w-full mt-[60px]"
        >
          로그인
        </Button>
      </div>
      <div className="absolute bottom-[52px] left-0 right-0 text-center text-body2 text-subtext">
        아직 회원이 아니신가요?
        <span
          className="text-primary text-body3 cursor-pointer ml-[4px] underline"
          onClick={handleGoRegister}
        >
          회원가입
        </span>
      </div>
    </div>
  );
};

export default Login;
