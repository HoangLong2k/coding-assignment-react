import React, { PropsWithChildren } from "react";
import { ButtonType, ButtonShape, ButtonSize } from "./type";
import styles from "./Button.module.css";
import classNames from "classnames";

interface ButtonProps extends PropsWithChildren {
  onClick?: () => void;
  buttonType?: ButtonType;
  buttonShape?: ButtonShape;
  size?: ButtonSize;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  buttonType = "primary",
  buttonShape = "rounded",
  size = "medium",
  className = "",
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={classNames(
        styles["button"],
        styles[buttonType],
        styles[buttonShape],
        styles[size],
        styles["click-effect"],
        className
      )}
    >
      {children}
    </button>
  );
};
export default Button;
