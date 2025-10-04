import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useDarkMode } from "@/hooks/useDarkMode";

export function ThemeToggle() {
    const { isDark, toggleTheme } = useDarkMode();

    return (
        <Button
            variant="outline"
            onClick={toggleTheme}
            className="relative overflow-hidden transition-all duration-300 hover:scale-105"
            aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
        >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );
}