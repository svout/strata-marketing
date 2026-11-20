/**
 * v2 stroke icons (docs/design/website-v2/icons): 24 px grid, stroke 1.6,
 * round caps, currentColor. Generated from the SVG files; decorative by
 * default (aria-hidden). Pass `label` for a meaningful icon.
 */
type V2IconProps = { size?: number; className?: string; label?: string };

function Svg({ size = 20, className, label, children }: V2IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {children}
    </svg>
  );
}

const Activity = (p: V2IconProps) => <Svg {...p}><path d="M3 12h4l2-6 4 12 2-6h6"/></Svg>;
const Bank = (p: V2IconProps) => <Svg {...p}><path d="M3 10l9-6 9 6"/><path d="M5 10v8M10 10v8M14 10v8M19 10v8M3 20h18"/></Svg>;
const Bell = (p: V2IconProps) => <Svg {...p}><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/></Svg>;
const Book = (p: V2IconProps) => <Svg {...p}><path d="M4 4h6a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h7z"/></Svg>;
const Card = (p: V2IconProps) => <Svg {...p}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></Svg>;
const Chart = (p: V2IconProps) => <Svg {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></Svg>;
const Check = (p: V2IconProps) => <Svg {...p}><path d="M5 12l5 5 9-10"/></Svg>;
const Chev = (p: V2IconProps) => <Svg {...p}><path d="M9 6l6 6-6 6"/></Svg>;
const Code = (p: V2IconProps) => <Svg {...p}><path d="M8 7l-5 5 5 5M16 7l5 5-5 5"/></Svg>;
const Copy = (p: V2IconProps) => <Svg {...p}><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></Svg>;
const Down = (p: V2IconProps) => <Svg {...p}><path d="M6 9l6 6 6-6"/></Svg>;
const Download = (p: V2IconProps) => <Svg {...p}><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></Svg>;
const Eye = (p: V2IconProps) => <Svg {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></Svg>;
const File = (p: V2IconProps) => <Svg {...p}><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 13h6M9 17h6"/></Svg>;
const Filter = (p: V2IconProps) => <Svg {...p}><path d="M3 5h18l-7 8v6l-4 2v-8z"/></Svg>;
const Flask = (p: V2IconProps) => <Svg {...p}><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 15h10"/></Svg>;
const Globe = (p: V2IconProps) => <Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></Svg>;
const Home = (p: V2IconProps) => <Svg {...p}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></Svg>;
const Invoice = (p: V2IconProps) => <Svg {...p}><path d="M6 2h12v20l-3-2-3 2-3-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h4"/></Svg>;
const Key = (p: V2IconProps) => <Svg {...p}><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/></Svg>;
const Link = (p: V2IconProps) => <Svg {...p}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></Svg>;
const List = (p: V2IconProps) => <Svg {...p}><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></Svg>;
const Lock = (p: V2IconProps) => <Svg {...p}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></Svg>;
const Mail = (p: V2IconProps) => <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></Svg>;
const More = (p: V2IconProps) => <Svg {...p}><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></Svg>;
const Phone = (p: V2IconProps) => <Svg {...p}><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></Svg>;
const Plus = (p: V2IconProps) => <Svg {...p}><path d="M12 5v14M5 12h14"/></Svg>;
const Repeat = (p: V2IconProps) => <Svg {...p}><path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/></Svg>;
const Search = (p: V2IconProps) => <Svg {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></Svg>;
const Send = (p: V2IconProps) => <Svg {...p}><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></Svg>;
const Settings = (p: V2IconProps) => <Svg {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></Svg>;
const Shield = (p: V2IconProps) => <Svg {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></Svg>;
const Sliders = (p: V2IconProps) => <Svg {...p}><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/></Svg>;
const Sparkle = (p: V2IconProps) => <Svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></Svg>;
const Store = (p: V2IconProps) => <Svg {...p}><path d="M4 9l1-5h14l1 5"/><path d="M4 9v11h16V9M4 9h16M9 20v-6h6v6"/></Svg>;
const Usercheck = (p: V2IconProps) => <Svg {...p}><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6"/><path d="M16 11l2 2 4-4"/></Svg>;
const Users = (p: V2IconProps) => <Svg {...p}><circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6"/><path d="M16 4a4 4 0 0 1 0 8M22 21c0-3-2-5-4-5.5"/></Svg>;
const Wallet = (p: V2IconProps) => <Svg {...p}><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M16 13h2M3 10h18M6 6V4h12v2"/></Svg>;
const X = (p: V2IconProps) => <Svg {...p}><path d="M6 6l12 12M18 6L6 18"/></Svg>;

export const V2Icons = {
  Activity,
  Bank,
  Bell,
  Book,
  Card,
  Chart,
  Check,
  Chev,
  Code,
  Copy,
  Down,
  Download,
  Eye,
  File,
  Filter,
  Flask,
  Globe,
  Home,
  Invoice,
  Key,
  Link,
  List,
  Lock,
  Mail,
  More,
  Phone,
  Plus,
  Repeat,
  Search,
  Send,
  Settings,
  Shield,
  Sliders,
  Sparkle,
  Store,
  Usercheck,
  Users,
  Wallet,
  X,
};

export type V2IconName = keyof typeof V2Icons;
