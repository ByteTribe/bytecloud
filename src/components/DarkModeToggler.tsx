import { useDarkMode } from "@/context/DarkMode.context";
import * as Toggle from "@radix-ui/react-toggle";

export function DarkModeToggler() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <Toggle.Root className="h-8 w-10 rounded-md  bg-violet-600 hover:scale-110 transition-all hover:bg-violet-500" onClick={toggleDarkMode}>
        {darkMode ? "☀️" : "🌙"}
    </Toggle.Root>
  );
}
