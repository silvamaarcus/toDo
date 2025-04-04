import { Sun, Moon } from "lucide-react";

import { useThemeSwitcher } from "../stores/useThemeSwitcher";

export const ThemeSwitcher = () => {
  const toggleTheme = useThemeSwitcher((state) => state.toggleTheme);

  const theme = useThemeSwitcher((state) => state.theme);

  return (
    <button
      onClick={toggleTheme}
      className={`cursor-pointer transition-colors duration-300 hover:opacity-70`}
    >
      {theme === "light" ? <Moon size={32} color="white" /> : <Sun size={32} color="white" />}
    </button>
  );
};
