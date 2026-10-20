import clsx from "clsx";
import styles from "./styles.module.scss";

export type TagType = {
  label: string;
  type?: "transperent" | "default";
  className?: string;
  color?: string;
};

export const Tag = ({ label, type = "default", className, color }: TagType) => {
  return (
    <div className={clsx(styles.tagContainer, styles[type], className)}>
      <span className={styles.text} style={{ color }}>{label}</span>
    </div>
  );
};
