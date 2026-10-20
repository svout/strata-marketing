// components/icons/Close.tsx
import type React from "react";

interface CloseProps {
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

export const Close = ({ style, width = 40, height = 40 }: CloseProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M18 18L6 6M18 6L6 18"
        stroke="var(--color-text)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
