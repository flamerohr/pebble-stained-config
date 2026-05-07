import {
  useMemo,
  type FC,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import classNames from "classnames";
import RadioPreview from "./radio-preview";

import s from "../radio-themebox.module.scss";
import fs from "../../form.module.scss";

interface RadioThemeitemProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  theme: string;
  themeAlt?: string;
  name: string;
  label?: ReactNode;
  index?: number | string;
}

export const RadioThemeitem: FC<RadioThemeitemProps> = ({
  theme,
  themeAlt,
  className,
  id,
  label,
  index,
  ...props
}) => {
  const { name } = props;

  const radioId = useMemo(() => {
    if (id) {
      return index == null ? id : `${id}-${index}`;
    }

    return `${name}-${index}-${Math.round(Math.random() * 100)}`;
  }, []);

  return (
    <label
      className={classNames(className, s.radiothemeitem)}
      htmlFor={radioId}
    >
      <div className={s.radiopreviewbox}>
        <RadioPreview className={classNames(s.radiopreview, theme)} />
        {themeAlt && (
          <RadioPreview
            className={classNames(s.radiopreview, s.radiopreviewcut, themeAlt)}
          />
        )}
      </div>
      <div className={s.radiolabelbox}>
        {label && (
          <div className={classNames("label", s.inputlabel)}>{label}</div>
        )}
        <input
          {...props}
          id={radioId}
          className={classNames("radio", s.select, fs.inputbox)}
          type="radio"
        />
      </div>
    </label>
  );
};

export default RadioThemeitem;
