import { useContext, createContext } from "react";

interface ContextData {
  color: number;
  setColor: (theme: number) => void;
}

export const ThemeContext = createContext<ContextData>({
  color: 0,
  setColor: () => null,
});

export const useTheme = () => {
  return useContext(ThemeContext);
};
