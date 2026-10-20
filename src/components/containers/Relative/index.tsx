import styles from "./styles.module.scss";

export default function Relative({ children }: { children: React.ReactNode }) {
  return <div className={styles.section}>{children}</div>;
}
