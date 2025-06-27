import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/shared/components/Header";
import AuthInput from "@/features/auth/components/AuthInput";
import Button from "@/shared/components/Button";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!userId) {
      newErrors.userId = "아이디를 입력해주세요.";
    } else if (userId.length < 2 || userId.length > 20) {
      newErrors.userId = "아이디는 최소 2자에서 최대 20자까지 입력해주세요.";
    }

    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (password.length < 8 || password.length > 20) {
      newErrors.password =
        "비밀번호는 최소 8자에서 최대 20자까지 입력해주세요.";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,20}$/.test(password)
    ) {
      newErrors.password = "영문과 숫자, 특수기호를 조합하여 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    console.log("로그인 시도:", { userId, password });
  };

  const handleGoRegister = () => {
    navigate("/signup");
  };

  return (
    <div className="relative flex flex-col min-h-screen px-[32px]">
      <Header title="로그인" showBack={false} />

      <div className="flex flex-col justify-center mt-[26px] gap-[22px]">
        <AuthInput
          label="아이디"
          placeholder="아이디를 입력해 주세요"
          value={userId}
          onChange={setUserId}
        />
        {errors.userId && (
          <p className="text-red-500 text-body3 text-right mt-[-20px] mr-[8px]">
            {errors.userId}
          </p>
        )}

        <AuthInput
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          type="password"
          value={password}
          onChange={setPassword}
          showToggle
        />
        {errors.password && (
          <p className="text-red-500 text-body3 text-right mt-[-20px] mr-[8px]">
            {errors.password}
          </p>
        )}

        <div className="text-right text-body2 text-subtext mt-[-2px]">
          아이디/비밀번호 찾기
        </div>
      </div>

      <Button
        variant="primary"
        onClick={handleLogin}
        className="w-full mt-[60px]"
      >
        로그인
      </Button>

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
