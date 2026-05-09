import { useMemo, type FC, type InputHTMLAttributes } from "react";
import classNames from "classnames";

import s from "./checkbox.module.scss";
import fs from "../form.module.scss";
import Icon from "#components/icon/icon";

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
          className={classNames(s.inputlabel, fs.inputlabel)}
        >
          {label}
        </label>
      )}
      <label className={s.inputicons}>
        <Icon name="checked-box" className={s.checkedicon} />
        <Icon name="box" className={s.uncheckedicon} />
        <input
          {...props}
          id={checkboxId}
          className={classNames("checkbox", s.inputbox, fs.inputbox)}
          type="checkbox"
        />
      </label>
    </div>
  );
};

export default Checkbox;
