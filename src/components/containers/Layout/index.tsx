import { ReactNode } from "react";
import { Elements } from "@/components";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={"layout"} id="layout">
      <Elements.SeoHead />
      <Elements.Menu />
      {children}
    </div>
  );
}
