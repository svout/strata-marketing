import React from "react";
import styles from "./styles.module.scss";

interface ToggleButtonProps {
  options: string[];
  selectedOption: string;
  onToggle: (option: string) => void;
  icons?: React.ReactNode[];
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  options,
  selectedOption,
  onToggle,
  icons,
}) => {
  const selectedIndex = options.indexOf(selectedOption);

  const handleClick = (option: string) => {
    const clickedIndex = options.indexOf(option);
    const isActive = clickedIndex === selectedIndex;
    const nextIndex = isActive ? (selectedIndex === 0 ? 1 : 0) : clickedIndex;
    onToggle(options[nextIndex]);
  };

  return (
    <div className={styles.toggleContainer}>
      <div className={styles.toggleTrack}>
        <div
          className={styles.toggleThumb}
          style={{ left: selectedIndex === 0 ? "2px" : "calc(100% - 41px)" }}
        >
          {icons?.[selectedIndex] ?? null}
        </div>
        <div
          className={`${styles.toggleLabel} ${
            selectedIndex === 0 ? styles.left : styles.right
          }`}
        >
          {options[selectedIndex]}
        </div>
      </div>
      <div className={styles.toggleButtons}>
        {options.map((option) => (
          <button
            key={option}
            className={styles.invisibleButton}
            onClick={() => handleClick(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default ToggleButton;
