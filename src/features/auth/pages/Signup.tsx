import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/shared/components/Header";
import AuthInput from "@/features/auth/components/AuthInput";
import Button from "@/shared/components/Button";
import { signup } from "@/features/auth/api/authApi";
import type { AxiosError } from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!userId) {
      newErrors.userId = "사용하실 아이디를 입력해주세요.";
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

    if (!name) {
      newErrors.name = "사용하실 이름을 입력해주세요.";
    } else if (name.length < 1 || name.length > 10) {
      newErrors.name = "이름은 최소 1자에서 최대 10자까지 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;

    try {
      const res = await signup({ userId, password, name });
      console.log(res.message);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "회원가입 실패";
      alert(message);
    }
  };

  const handleGoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="relative flex flex-col h-[93vh] px-[32px]">
      <Header title="회원가입" showBack={false} />

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
        <AuthInput
          label="이름"
          placeholder="이름을 입력해 주세요"
          value={name}
          onChange={setName}
        />
        {errors.name && (
          <p className="text-red-500 text-body3 text-right mt-[-20px] mr-[8px]">
            {errors.name}
          </p>
        )}
      </div>
      <Button
        variant="primary"
        onClick={handleSignup}
        className="w-full mt-[60px]"
      >
        회원가입
      </Button>

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
