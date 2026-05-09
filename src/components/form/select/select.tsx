import classNames from "classnames";
import { useMemo, type FC, type HTMLAttributes } from "react";

import s from "./select.module.scss";
import fs from "../form.module.scss";

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: any }[];
  name: string;
}

export const Select: FC<SelectProps> = ({
  className,
  options,
  label,
  id,
  ...props
}) => {
  const { name } = props;

  const selectId = useMemo(() => {
    if (id) {
      return id;
    }

    return `${name}-${Math.round(Math.random() * 100)}`;
  }, []);

  return (
    <div className={classNames(className, fs.inputcontainer)}>
      {label && (
        <label className={fs.inputlabelfloat} htmlFor={selectId}>
          {label}
        </label>
      )}
      <select
        {...props}
        className={classNames(s.select, fs.inputbox)}
        id={selectId}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
