import { useEffect, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import { themeList } from "#features/theme/config/theme-list";
import classNames from "classnames";

import s from "./preview-hint.module.scss";

export const PreviewHint = () => {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  const theme = useWatch({ name: "Theme" });

  const selected = useMemo(
    () =>
      themeList.find(({ value }) => value === Number(theme)) || themeList[0],
    [theme],
  );

  useEffect(() => {
    if (!containerRef) {
      return;
    }
    const calcOffset = () => {
      const bounds = containerRef.getBoundingClientRect();

      setOffset(bounds.top);
    };

    window.addEventListener("scroll", calcOffset);

    calcOffset();

    return () => {
      window.removeEventListener("scroll", calcOffset);
    };
  }, [containerRef]);

  return (
    <div ref={setContainerRef} className={s.container}>
      <div className={classNames(s.background, selected.className)}>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={s.shard}
          style={{ top: `max(25px, ${offset + 40}px)`, left: "12.5%" }}
        >
          <path
            d="M 12 0.5 L 4 15.5 L 0.5 5 Z"
            fill="var(--theme-color-1)"
            stroke="var(--outline-color)"
          />
        </svg>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={s.shard}
          style={{ top: `max(25px, ${offset + 80}px)`, left: "37.5%" }}
        >
          <path
            d="M 15.5 4 L 12 15.5 L 8 15.5 L 0.5 0.5 Z"
            fill="var(--theme-color-2)"
            stroke="var(--outline-color)"
          />
        </svg>
      </div>
      <div
        className={classNames(
          s.background,
          selected.altClassName || selected.className,
        )}
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={s.shard}
          style={{ top: `max(25px, ${offset + 60}px)`, left: "62.5%" }}
        >
          <path
            d="M 6 0.5 C 6 8, 6 8, 0.5 13 L 14 15.5 Z"
            fill="var(--theme-color-3)"
            stroke="var(--outline-color)"
          />
        </svg>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={s.shard}
          style={{ top: `max(25px, ${offset + 20}px)`, left: "87.5%" }}
        >
          <path
            d="M 6 0.5 L 15.5 11 L 0.5 14 Z"
            fill="var(--theme-color-4)"
            stroke="var(--outline-color)"
          />
        </svg>
      </div>
    </div>
  );
};

export default PreviewHint;
