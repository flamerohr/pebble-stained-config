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
import light from "../color/light-theme.module.scss";
import dark from "../color/dark-theme.module.scss";

export const ThemeProvider: FC<PropsWithChildren<{ bw?: boolean }>> = ({
  bw,
  children,
}) => {
  const [color, setColor] = useState<number>(0);

  const updateColor = useCallback((newColor: number) => {
    if (newColor >= 2) {
      return;
    }
    setColor(newColor);
  }, []);

  useEffect(() => {
    const className =
      (color === 1 && (bw ? dark.dark_bw : dark.dark)) ||
      (bw ? light.light_bw : light.light);

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
