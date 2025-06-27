import type { ButtonProps } from "@/features/recommend/types/button";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonProps) => {
  const baseStyle = `
    h-[60px]
    rounded-[16px]
    text-subtitle1
    text-center 
  `;

  const variants = {
    primary: "bg-primary text-white hover:bg-[#f89f00]",
    secondary: "bg-deactivate hover:bg-[#e8eaec]",
  };

  const disabledStyle =
    "bg-deactivate text-deactivate-text cursor-not-allowed opacity-60";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyle} 
        ${disabled ? disabledStyle : variants[variant]} 
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
