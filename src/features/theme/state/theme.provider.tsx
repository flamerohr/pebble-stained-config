import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import { ThemeContext } from "#features/theme/state/theme.context";

import "../size.scss";
import colourfulTheme from "../color/colourful.module.scss";
import bwTheme from "../color/bw.module.scss";

const themeMap: Record<number, string> = {
  0: colourfulTheme.light,
  1: colourfulTheme.dark,
  2: bwTheme.light,
  3: bwTheme.dark,
};

export const ThemeProvider: FC<PropsWithChildren<{ bw?: boolean }>> = ({
  bw,
  children,
}) => {
  const [color, setColor] = useState<number>(0);

  const updateColor = useCallback((newColor: number) => {
    if (newColor >= 4) {
      return;
    }
    setColor(newColor);
  }, []);

  useEffect(() => {
    let className;
    if (bw) {
      className = color % 1 === 0 ? bwTheme.light : bwTheme.dark;
    } else {
      className = themeMap[color] || colourfulTheme.light;
    }

    document.documentElement.classList.add(className);

    return () => {
      document.documentElement.classList.remove(className);
    };
    // add theme list to deps in case the list updates for hot reload
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  const context = useMemo(
    () => ({ color, setColor: updateColor }),
    [color, updateColor],
  );

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
