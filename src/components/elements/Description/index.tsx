import React, { CSSProperties } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

interface DescriptionProps {
  description: string;
  color?: CSSProperties["color"];
  type: "default" | "small" | "medium" | "large" | "extraSm";
  className?: string;
}

const Description = ({
  description,
  color,
  type = "medium",
  className,
}: DescriptionProps) => {
  return (
    <div className={styles.descriptionContainer}>
      <p
        className={clsx(styles.description, styles[type], className)}
        style={{ color }}
      >
        {description}
      </p>
    </div>
  );
};

export default Description;
