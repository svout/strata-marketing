import type { MenuLinkInterface } from "@/types/MenuLink.interface";
import { COMPANY, isFilled } from "@/config/company";

/** Top nav (Marketing Website → Site map): Product · Developers · Security */
export const config = {
  links: [
    { label: "Product", href: "/product" },
    { label: "Developers", href: "/developers" },
    { label: "Security", href: "/security" },
  ] satisfies MenuLinkInterface[],
  // "#" until the console URL ([app.domain]) is filled in config/company.ts
  signIn: { label: "Sign in", href: isFilled(COMPANY.appUrl) ? COMPANY.appUrl : "#" },
  cta: { label: "Request demo", href: "/demo" },
};
