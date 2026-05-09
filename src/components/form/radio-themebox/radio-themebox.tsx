import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import classNames from "classnames";

import s from "./radio-themebox.module.scss";
import fs from "../form.module.scss";
import RadioThemeitem from "./components/radio-themeitem";
import { useController } from "react-hook-form";
import Modal from "#components/modal/modal";
import Button from "#components/button/button";
import RadioPreview from "./components/radio-preview";

interface RadioThemeboxProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
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
  const { name } = props;
  const {
    field: { value },
  } = useController({ name });
  const [show, setShow] = useState(false);

  const showModal = useCallback(() => setShow(true), [setShow]);

  const hideModal = useCallback(() => setShow(false), [setShow]);

  const selected = useMemo(
    () => options.find((o) => o.value === Number(value)) || options[0],
    [value, options],
  );

  useEffect(() => {
    hideModal();
  }, [value, hideModal]);

  return (
    <div
      {...props}
      className={classNames(className, fs.inputcontainer, s.radiothemebox)}
    >
      {label && <label className={fs.inputlabelfloat}>{label}</label>}
      <div className={s.radiopreviewvalue}>
        <RadioPreview className={classNames(s.radiopreview, selected.theme)} />
        {selected.themeAlt && (
          <RadioPreview
            className={classNames(
              s.radiopreview,
              s.radiopreviewcut,
              selected.themeAlt,
            )}
          />
        )}
      </div>
      <div className={s.radiopreviewlabel}>{selected.label}</div>
      <Button onClick={showModal}>Change</Button>
      <Modal
        show={show}
        onHide={hideModal}
        renderHeader={() => "Choose a theme:"}
        renderContent={() => (
          <div className={s.radiothemelist}>
            {options.map((option, index) => (
              <RadioThemeitem
                key={option.value}
                {...option}
                {...radioProps}
                index={index}
              />
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default RadioThemebox;
