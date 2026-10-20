import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

type ButtonInterface = {
  label: string | React.ReactNode;
  variant: "default" | "white" | "dark";
  type?: "submit" | "button";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export const Button = ({
  label,
  variant = "default",
  type = "button",
  disabled,
  onClick,
  className,
}: ButtonInterface) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        className
      )}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
        !disabled && onClick?.(e)
      }
    >
      <span className={styles.label}>{label}</span>
    </button>
  );
};
