export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
}
