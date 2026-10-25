import React from "react";
import clsx from "clsx";

/** Body copy in the body/lg or body/md text style, muted by default. */
interface DescriptionProps {
  children: React.ReactNode;
  size?: "lg" | "md";
  muted?: boolean;
  className?: string;
}

const Description = ({ children, size = "lg", muted = true, className }: DescriptionProps) => (
  <p
    className={clsx(
      size === "lg" ? "text-body-lg" : "text-body-md",
      muted ? "text-fg-muted" : "text-fg",
      "text-pretty",
      className,
    )}
  >
    {children}
  </p>
);

export default Description;
