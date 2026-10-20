import { Elements } from "@/components";
import styles from "./styles.module.scss";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { _TAGS } from "@/constraints/tags";
import { useState } from "react";

export const HeroCard = () => {
  const [isSaved, setIsSaved] = useState(false);
  return (
    <div className={styles.heroCard}>
      <div className={styles.leftContent}>
        <div className={styles.imageWrapper}>
          <Image
            src={"/Kyoto.webp"}
            alt="Kyoto city landscape"
            fill
            className={styles.cardImage}
            quality={100}
            priority
            sizes="(max-width: 768px) 300px, 488px"
          />
        </div>
      </div>

      <div className={styles.rightContent}>
        <div className={styles.topContent}>
          <div className={styles.tagsContent}>
            <div className={styles.tagsTopContent}>
              <div className={styles.tags}>
                {_TAGS.map((tag, index) => (
                  <Elements.Tag key={index} label={tag.label} />
                ))}
              </div>
              <div
                className={`${styles.saveMark} ${isSaved ? styles.active : ""}`}
                role="button"
                aria-pressed={isSaved}
                tabIndex={0}
                onClick={() => setIsSaved((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsSaved((v) => !v);
                  }
                }}
              >
                <Icons.Save color="var(--color-save)" />
              </div>
            </div>
            <div className={styles.titleContainer}>
              <Elements.Title
                title="7 Days in Kyoto: Temples, Tea, and Trains"
                type="h3"
                color="var(--color-text)"
                className={styles.titleCard}
              />
            </div>
          </div>

          <div className={styles.descriptionContainer}>
            <Elements.Description
              description="A breezy itinerary balancing classic sights with quite neigborhooods and tea experiences."
              type="medium"
              className={styles.descriptionCard}
            />
          </div>
          <Elements.GuideButton />
        </div>
        <div className={styles.devider}></div>
        <div className={styles.bottomContent}>
          <div className={styles.avatarWrapper}>
            <Image
              src={"/Avatar.webp"}
              alt=""
              fill
              className={styles.avatar}
              quality={100}
              sizes="48px"
            />
          </div>

          <div className={styles.avatarDescription}>
            <Elements.Description
              description="James Carter"
              type="small"
              color="var(--color-text)"
            />
            <Elements.Description description="12 Aug, 2025" type="extraSm" />
          </div>

          <div className={styles.time}>
            <Icons.Time />
            <Elements.Description description="5 min read" type="extraSm" />
          </div>
        </div>
      </div>
    </div>
  );
};
