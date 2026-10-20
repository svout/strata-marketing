import type { MenuLinkInterface } from "@/types/MenuLink.interface";

type MenuConfig = {
  links: MenuLinkInterface[];
};
export const config: MenuConfig = {
  links: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Services", href: "/services" },
    { label: "Project", href: "/project" },
  ],
};
