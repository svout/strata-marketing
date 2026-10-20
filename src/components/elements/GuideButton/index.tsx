import { Icons } from "@/components/icons";
import { Button } from "@/components/elements/Button";
import styles from "./styles.module.scss";

export const GuideButton = () => {
  return (
    <Button
      type="button"
      variant="default"
      label={
        <div className={styles.content}>
          <span className={styles.text}>Read guide</span>
          <span className={styles.icon}>
            <Icons.ArrowLink />
          </span>
        </div>
      }
      className={styles.button}
    />
  );
};
