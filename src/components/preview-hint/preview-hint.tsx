import { useEffect, useState } from "react";

import s from "./preview-hint.module.scss";

export const PreviewHint = () => {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(40);

  useEffect(() => {
    if (!containerRef) {
      return;
    }
    const calcOffset = () => {
      const scrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
      const bounds = containerRef.getBoundingClientRect();

      setOffset(bounds.top - scrollTop);
    };

    window.addEventListener("scroll", calcOffset);

    calcOffset();

    return () => {
      window.removeEventListener("scroll", calcOffset);
    };
  }, [containerRef]);

  return (
    <div ref={setContainerRef} className={s.container}>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={s.shard}
        style={{ top: `max(35px, ${offset + 40}px)`, left: "12.5%" }}
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
        style={{ top: `max(35px, ${offset + 80}px)`, left: "37.5%" }}
      >
        <path
          d="M 15.5 4 L 12 15.5 L 8 15.5 L 0.5 0.5 Z"
          fill="var(--theme-color-2)"
          stroke="var(--outline-color)"
        />
      </svg>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={s.shard}
        style={{ top: `max(35px, ${offset + 60}px)`, left: "62.5%" }}
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
        style={{ top: `max(35px, ${offset + 20}px)`, left: "87.5%" }}
      >
        <path
          d="M 6 0.5 L 15.5 11 L 0.5 14 Z"
          fill="var(--theme-color-4)"
          stroke="var(--outline-color)"
        />
      </svg>
    </div>
  );
};

export default PreviewHint;
