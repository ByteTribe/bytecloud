import { useDarkModeContext } from "@/context/DarkMode.context";

export function DarkModeToggler() {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <button
      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-md"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? "Modo Claro" : "Modo Escuro"}
    </button>
  );
}
