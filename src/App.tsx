import { ThemeProvider } from "./components/ThemeProvider";
import { HomePage } from "./pages/Home";
import { useThemeSwitcher } from "./stores/useThemeSwitcher";

function App() {
  const { theme } = useThemeSwitcher();

  return (
    <ThemeProvider>
      <main
        className={`${theme === "light" ? "light bg-[url('/images/bg-desktop-light.jpg')]" : "dark bg-[url('/images/bg-desktop-dark.jpg')]"} -z-10 h-76 bg-cover bg-center bg-no-repeat`}
      >
        <HomePage />
      </main>
    </ThemeProvider>
  );
}

export default App;
