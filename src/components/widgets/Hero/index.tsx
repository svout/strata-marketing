import React from "react";
import styles from "./styles.module.scss";
import Elements from "@/components/elements";
import clsx from "clsx";

interface HeroProps {
  fullHeight?: boolean;
}

const Hero = ({ fullHeight }: HeroProps) => {
  return (
    <section
      className={clsx(styles.container, fullHeight && styles.fullHeight)}
    >
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <Elements.Title
            title="Discover our Insights"
            color="var(--color-text)"
            type="h1"
            className={styles.titleMask}
          />

          <div className={styles.descriptionContainer}>
            <Elements.Description
              description="Stay up-to-date with our latest blog post"
              color="var(--color-text)"
              type="medium"
              className={styles.description}
            />
          </div>
        </div>
        <div className={styles.card}>
          <Elements.HeroCard />
        </div>
      </div>
    </section>
  );
};

export default Hero;
