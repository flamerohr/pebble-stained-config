import type { FC, SVGAttributes } from "react";

export const IconBox: FC<SVGAttributes<SVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="-1 -1 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d={`
      M 8,1
      C 15,1 15,1     15,8
      C 15,15 15,15   8,15
      C 1,15 1,15     1,8
      C 1,1 1,1       8,1
      Z`}
      stroke="var(--outline-color)"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default IconBox;
