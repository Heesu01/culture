import { useState } from "react";
import type { AuthInputProps } from "@/features/auth/types/auth";
import { HiEye, HiEyeOff } from "react-icons/hi";

const AuthInput = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  showToggle = false,
}: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col  ">
      <label className="text-body2 mb-[8px] pl-[8px]">{label}</label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-[16px] bg-deactivate p-[20px] text-body2 outline-none"
        />
        {showToggle && (
          <button
            type="button"
            className="absolute w-[20px] right-[20px] top-1/2 -translate-y-1/2 text-subtext"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInput;
