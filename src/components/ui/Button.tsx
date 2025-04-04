import { useThemeSwitcher } from "../../stores/useThemeSwitcher";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  const { theme } = useThemeSwitcher();
  return (
    <>
      <button
        className={`${theme === "light" ? "text-dark-very-dark-blue" : "text-light-very-light-gray"} hover:text-primary-bright-blue cursor-pointer`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
