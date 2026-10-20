import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Elements } from "@/components";
import { itinerary } from "@/constraints/itinerary";

const Itinerary = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <Elements.Title
            title="Itinerary"
            type="h2"
            color="var(--color-text)"
            className={styles.titleMask}
          />
        </div>
        <div className={styles.cards}>
          {itinerary.map((item, i) => (
            <div
              key={item.id}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(0)}
            >
              <Elements.ItineraryCard isActive={activeIndex === i} {...item} />
            </div>
          ))}
        </div>

        <Elements.Button
          label="View More"
          variant="white"
          className={styles.button}
        />
      </div>
    </section>
  );
};

export default Itinerary;
