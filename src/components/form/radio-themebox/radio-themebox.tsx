import {
  type FC,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import classNames from "classnames";

import s from "./radio-themebox.module.scss";
import fs from "../form.module.scss";
import RadioThemeitem from "./components/radio-themeitem";

interface RadioThemeboxProps extends HTMLAttributes<HTMLDivElement> {
  options: {
    value: number | string;
    label: ReactNode;
    theme: string;
    themeAlt?: string;
  }[];
  label?: ReactNode;
  radioProps: InputHTMLAttributes<HTMLInputElement> & { name: string };
}

export const RadioThemebox: FC<RadioThemeboxProps> = ({
  className,
  label,
  radioProps,
  options,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classNames(className, fs.inputcontainer, s.radiothemebox)}
    >
      {label && (
        <label className={classNames("label", fs.inputlabelfloat)}>
          {label}
        </label>
      )}
      <div className={classNames("list", s.radiothemelist)}>
        {options.map((option, index) => (
          <RadioThemeitem
            key={option.value}
            {...option}
            {...radioProps}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default RadioThemebox;
