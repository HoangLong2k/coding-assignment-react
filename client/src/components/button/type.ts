import { PropsWithChildren } from "react";

export type ButtonType = "primary" | "secondary";

export type ButtonShape = "rounded" | "square";

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends PropsWithChildren {
  onClick?: () => void;
  buttonType?: ButtonType;
  buttonShape?: ButtonShape;
  size?: ButtonSize;
  className?: string;
}
