import React from "react";
import clsx from "clsx";

/**
 * Headline in one of the token text styles. The HTML level (`as`) and
 * the visual size (`variant`) are separate, so section titles can be
 * <h2> while using the heading/1 style, as in W1.
 */
type TitleProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  variant?: "display" | "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  children: React.ReactNode;
};

const styles = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
} as const;

const Title = ({ as: Tag = "h2", variant = "h1", id, className, children }: TitleProps) => (
  <Tag id={id} className={clsx(styles[variant], "text-balance", className)}>
    {children}
  </Tag>
);

export default Title;
