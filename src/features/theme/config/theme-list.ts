interface ThemeOption {
  value: number;
  label: string;
  bw?: boolean;
}

export const themeList: ThemeOption[] = [
  { value: 0, label: "Colorful light background" },
  { value: 1, label: "Colorful dark background" },
  { value: 2, label: "Black & white light background", bw: true },
  { value: 3, label: "Black & white dark background", bw: true },
];
