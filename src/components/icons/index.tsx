/**
 * Line icons on a 24 px grid, 1.75 stroke, round caps (Brand Guidelines
 * → Graphic language). They inherit currentColor; ink by default, cobalt
 * when active. All are decorative (aria-hidden): the control that holds
 * them carries the accessible name.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const Base = ({ size = 24, children, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
);

/** Menu: three shifted lines, echoing the mark (W6 header) */
const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 7h12M6 12h12M4 17h12" />
  </Base>
);
const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Base>
);
const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);
const ChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);
const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);
const Alert = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4 3 19.5h18z" />
    <path d="M12 10v4M12 16.8v.2" />
  </Base>
);
const Shield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
    <path d="M9 12l2 2 4-4" />
  </Base>
);
/** Ledger: a page of entries (Security pillars) */
const Ledger = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </Base>
);
const Pulse = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 12h4l2-6 4 12 2-6h6" />
  </Base>
);
const Download = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </Base>
);
const Pause = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 6v12M15 6v12" />
  </Base>
);
const Play = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5.5v13l10-6.5z" />
  </Base>
);

export const Icons = {
  Menu,
  Close,
  ArrowRight,
  ChevronDown,
  Check,
  Alert,
  Shield,
  Ledger,
  Pulse,
  Download,
  Pause,
  Play,
};
