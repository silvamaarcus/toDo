import { useEffect } from "react";
import { useThemeSwitcher } from "../stores/useThemeSwitcher";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme } = useThemeSwitcher();

  useEffect(() => {
    // Remove ambos as classes do body
    document.body.classList.remove("light-theme", "dark-theme");
    // Adiciona a classe correspondente ao tema atual
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  return <>{children}</>;
};
