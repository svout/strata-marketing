import styles from "./styles.module.scss";
import clsx from "clsx";
import { CSSProperties } from "react";
import { SectionInterface } from "@/types/section";

export default function Section({
  el,
  bg,
  bt,
  s,
  ah,
  usePaddings,
}: SectionInterface) {
  const isSticky: CSSProperties = s
    ? { position: "sticky", left: 0, top: 0 }
    : {};

  return (
    <section
      className={clsx(styles.section, usePaddings && styles.paddings)}
      style={{
        background: bg,
        ...isSticky,
        borderTop: bt,
        height: ah ? "auto" : "",
      }}
    >
      {el}
    </section>
  );
}
