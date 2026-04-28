import type { HTMLAttributes, ReactNode } from "react";

export interface DisplayColorProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
}

export interface ColorGroup {
  label: ReactNode;
  items: {
    label?: ReactNode;
    color: string;
    contrast: string;
  }[];
}
