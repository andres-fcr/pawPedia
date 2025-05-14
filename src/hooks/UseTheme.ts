import { useContext } from "react";

import type { ThemeContextType } from "@/context/ThemeContext";
import { ThemeContext } from "@/context/ThemeContext";

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
  };
  