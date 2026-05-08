import type { FC, SVGAttributes, CSSProperties } from "react";

import s from "./icon.module.scss";
import classNames from "classnames";

interface IconProps extends SVGAttributes<SVGElement> {
  name: "cross";
  size?: CSSProperties["width"];
}

export const Icon: FC<IconProps> = ({
  name,
  className,
  size = "1rem",
  ...props
}) => {
  if (name === "cross") {
    return (
      <svg
        {...props}
        className={classNames(className, s.icon)}
        style={{ width: size }}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0 0
          L 15.5 15.5
          M 15.5 0
          L 0 15.5"
          stroke="var(--outline-color)"
        />
      </svg>
    );
  }
  return null;
};

export default Icon;
