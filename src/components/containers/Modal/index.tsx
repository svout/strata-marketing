import styles from "./styles.module.scss";
import { Icons } from "@/components/icons";
import { CSSProperties } from "react";

export default function Modal({
  children,
  id,
  closeModal,
  style,
}: {
  children: React.ReactNode;
  id: string;
  closeModal: (id: string) => void;
  style?: CSSProperties;
}) {
  return (
    <div className={styles.modal} style={style}>
      <button className={styles.closeButton} onClick={() => closeModal(id)}>
        <Icons.Close style={{ transform: "rotate(45deg)" }} />
      </button>
      {children}
    </div>
  );
}
