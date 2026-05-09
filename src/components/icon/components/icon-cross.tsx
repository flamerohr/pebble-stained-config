import type { FC, SVGAttributes } from "react";

export const IconCross: FC<SVGAttributes<SVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 1 1
      L 15 15
      M 15 1
      L 1 15"
      stroke="var(--outline-color)"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default IconCross;
