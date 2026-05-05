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
import { themeList } from "../config/theme-list";

export const ThemeProvider: FC<PropsWithChildren<{ bw?: boolean }>> = ({
  bw,
  children,
}) => {
  const [color, setColor] = useState<number>(0);

  const updateColor = useCallback((newColor: number) => {
    if (newColor >= themeList.length) {
      return;
    }
    setColor(newColor);
  }, []);

  useEffect(() => {
    let className;
    if (bw) {
      className =
        themeList.find(({ value }) =>
          color === 3 ? value === color : value === 2,
        )?.className || "";
    } else {
      className = (
        themeList.find(({ value }) => value === color) || themeList[0]
      )?.className;
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
