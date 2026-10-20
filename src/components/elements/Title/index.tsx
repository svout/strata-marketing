import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

type TitleProps = {
  title?: string;
  color?: string;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  highlight?: string;
  highlightColor?: string;
  highlightStart?: string;
  flag?: React.ReactNode;
};

const Title = ({
  title,
  color,
  type = "h1",
  className,
  highlight,
  highlightColor,
  highlightStart,
  flag,
}: TitleProps) => {
  const Tag = type as React.ElementType;

  return (
    <Tag
      className={clsx(styles.title, styles[type], className)}
      style={{ color }}
    >
      <span
        className={clsx(styles.highlight)}
        style={{ color: highlightColor }}
      >
        {highlightStart}
      </span>
      {flag && flag}
      {title}
      <span
        className={clsx(styles.highlight)}
        style={{ color: highlightColor }}
      >
        {highlight}
      </span>
    </Tag>
  );
};

export default Title;
