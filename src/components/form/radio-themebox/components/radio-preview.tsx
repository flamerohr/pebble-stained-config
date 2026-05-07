import type { FC, SVGProps } from "react";

export const RadioPreview: FC<SVGProps<HTMLOrSVGElement>> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x={0} y={0} width={16} height={16} fill="var(--background-color)" />
      <path
        d="M 12 0.5 L 4 15.5 L 0.5 5 Z"
        fill="var(--theme-color-1)"
        stroke="var(--outline-color)"
        transform="scale(0.5) translate(16, 16)"
      />
      <path
        d="M 15.5 4 L 12 15.5 L 8 15.5 L 0.5 0.5 Z"
        fill="var(--theme-color-2)"
        stroke="var(--outline-color)"
        transform="scale(0.5) translate(3, 1)"
      />
      <path
        d="M 6 0.5 C 6 8, 6 8, 0.5 13 L 14 15.5 Z"
        fill="var(--theme-color-3)"
        stroke="var(--outline-color)"
        transform="scale(0.5) translate(3, 15)"
      />
      <path
        d="M 6 0.5 L 15.5 11 L 0.5 14 Z"
        fill="var(--theme-color-4)"
        stroke="var(--outline-color)"
        transform="scale(0.5) translate(16, 2)"
      />
    </svg>
  );
};

export default RadioPreview;
