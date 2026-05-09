import colourfulTheme from "../color/colourful.module.scss";
import bwTheme from "../color/bw.module.scss";
import blueSkiesTheme from "../color/blue-skies.module.scss";
import nightlightTheme from "../color/nightlight.module.scss";
import crispWinterTheme from "../color/crisp-winter.module.scss";

interface ThemeOption {
  value: number;
  label: string;
  bw?: boolean;
  className: string;
  altClassName?: string;
}

export const themeList: ThemeOption[] = [
  {
    value: 0,
    label: "Colorful light background",
    className: colourfulTheme.light,
  },
  {
    value: 1,
    label: "Colorful dark background",
    className: colourfulTheme.dark,
  },
  {
    value: 2,
    label: "Black & white light background",
    className: bwTheme.light,
    bw: true,
  },
  {
    value: 3,
    label: "Black & white dark background",
    className: bwTheme.dark,
    bw: true,
  },
  { value: 4, label: "Blue skies", className: blueSkiesTheme.blueskies },
  { value: 5, label: "Nightlight", className: nightlightTheme.nightlight },
  {
    value: 6,
    label: "Blue skies and nightlight mixed",
    // TODO: add function to switch between day and night preview
    className: blueSkiesTheme.blueskies,
    altClassName: nightlightTheme.nightlight,
  },
  { value: 7, label: "Crisp Winter", className: crispWinterTheme.crispwinter },
];
