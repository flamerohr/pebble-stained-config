import {
  type FC,
  type SVGAttributes,
  type CSSProperties,
  useMemo,
} from "react";
import classNames from "classnames";

import s from "./icon.module.scss";

import IconCross from "./components/icon-cross";
import IconBox from "./components/icon-box";
import IconCheckedBox from "./components/icon-checked-box";

interface IconProps extends SVGAttributes<SVGElement> {
  name: "cross" | "box" | "checked-box";
  size?: CSSProperties["width"];
}

export const Icon: FC<IconProps> = ({
  name,
  className,
  size = "1rem",
  ...inputProps
}) => {
  const props: SVGAttributes<SVGElement> = {
    ...inputProps,
    className: s.icon,
    style: { width: size },
  };

  const Image = useMemo(() => {
    switch (name) {
      case "cross": {
        return IconCross;
      }
      case "box": {
        return IconBox;
      }
      case "checked-box": {
        return IconCheckedBox;
      }
      default: {
        return null;
      }
    }
  }, [name]);

  if (!Image) {
    return null;
  }
  return (
    <div className={classNames(className, s.iconcontainer)}>
      <Image {...props} />
    </div>
  );
};

export default Icon;
