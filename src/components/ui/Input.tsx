import { useThemeSwitcher } from "../../stores/useThemeSwitcher";

interface InputProps {
  placeholder?: string;
  icon?: React.ReactNode;
  type?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = ({
  placeholder,
  icon,
  type = "text",
  className = "",
  value,
  onChange,
  onKeyDown,
}: InputProps) => {
  const { theme } = useThemeSwitcher();

  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute top-1/2 left-6 -translate-y-1/2 transform">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded ${
          theme === "light"
            ? "bg-white text-dark-very-dark-desaturated-blue"
            : "bg-dark-very-dark-desaturated-blue text-light-very-light-grayish-blue"
        } ${icon ? "pl-16" : "px-6"} py-4 ${className}`}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
