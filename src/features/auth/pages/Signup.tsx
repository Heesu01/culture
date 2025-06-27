import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/shared/components/Header";
import AuthInput from "@/features/auth/components/AuthInput";
import Button from "@/shared/components/Button";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("회원가입 시도:", { name, email, password });
  };

  const handleGoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="relative flex flex-col min-h-screen px-[32px]">
      <Header title="회원가입" showBack={false} />

      <div className="flex flex-col justify-center mt-[26px]">
        <AuthInput
          label="이름"
          placeholder="이름을 입력해 주세요"
          type="text"
          value={name}
          onChange={setName}
        />

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

        <Button
          variant="primary"
          onClick={handleSignup}
          className="w-full mt-[60px]"
        >
          회원가입
        </Button>
      </div>

      <div className="absolute bottom-[52px] left-0 right-0 text-center text-body2 text-subtext">
        이미 계정이 있으신가요?
        <span
          className="text-primary text-body3 cursor-pointer ml-[4px] underline"
          onClick={handleGoLogin}
        >
          로그인
        </span>
      </div>
    </div>
  );
};

export default Signup;
