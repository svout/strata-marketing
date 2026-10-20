import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { ItineraryCardProps } from "@/types/ItineraryType.interface";
import { Icons } from "@/components/icons";
import { Elements } from "@/components";

const ItineraryCard = ({
  isActive,
  imageSrc = "/image.png",
  tagLabel = "Day 1",
  title,
  description,
  cost,
  rateValue,
}: ItineraryCardProps) => {
  return (
    <div className={`${styles.card} ${isActive ? styles.active : ""}`}>
      <div className={styles.cardImg}>
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 767px) 320px, 400px"
          quality={100}
          className={styles.image}
        />
        <div className={styles.tag}>
          <Elements.Tag label={tagLabel} color="#FEFEFE" />
        </div>
        <div className={styles.hoverContent}>
          <Link href="/" className={styles.link}>
            <Icons.ArrowLink />
          </Link>
        </div>
      </div>
      <div className={styles.description}>
        <p className={styles.cardTitle}>{title}</p>
        <span className={styles.cardDesc}>{description}</span>
      </div>
      <div className={styles.costAndRate}>
        <span className={styles.cost}>{cost}</span>
        <div className={styles.rateContainer}>
          <Icons.Rate />
          <p className={styles.rate}>{rateValue}</p>
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;
