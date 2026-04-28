import { useMemo, type FC, type InputHTMLAttributes } from "react";
import classNames from "classnames";

import s from "./checkbox.module.scss";
import fs from "../form.module.scss";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  name: string;
  label?: string;
}

export const Checkbox: FC<CheckboxProps> = ({
  className,
  label,
  id,
  ...props
}) => {
  const { name } = props;

  const checkboxId = useMemo(() => {
    if (id) {
      return id;
    }

    return `${name}-${Math.round(Math.random() * 100)}`;
  }, []);

  return (
    <div className={classNames(className, s.checkbox, fs.inputcontainer)}>
      {label && (
        <label
          htmlFor={checkboxId}
          className={classNames("label", s.inputlabel, fs.inputlabel)}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        id={checkboxId}
        className={classNames("checkbox", s.select, fs.inputbox)}
        type="checkbox"
      />
    </div>
  );
};

export default Checkbox;
