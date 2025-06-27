export interface AuthInputProps {
  label: string;
  placeholder: string;
  type?: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  showToggle?: boolean;
}
