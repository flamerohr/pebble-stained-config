import type { ButtonHTMLAttributes, FC } from "react";

import s from "./button.module.scss";
import classNames from "classnames";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  type = "button",
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      {...props}
      className={classNames(className, s.button)}
    ></button>
  );
};

export default Button;
