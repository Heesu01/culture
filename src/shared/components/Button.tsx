import type { ButtonProps } from "@/shared/types/button";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonProps) => {
  const baseStyle = `
    w-full max-w-[500px]
    h-[60px]
    rounded-[16px]
    text-subtitle
    text-center
    transition-colors
  `;

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/80",
    secondary: "bg-deactivate text-subtext hover:bg-deactivate/80",
  };

  const disabledStyle = `
    bg-deactivate text-deactivate-text cursor-not-allowed opacity-60
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${
        disabled ? disabledStyle : variants[variant]
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
