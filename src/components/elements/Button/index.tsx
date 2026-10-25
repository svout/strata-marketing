"use client";

import NextLink from "next/link";
import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";

/**
 * Strata button = MUI Button with the brand variants from the theme
 * (primary · ink · white · outline · ghost) and the UI-kit sizes
 * (small 32 · medium 40 · large 48).
 *
 * Pass `href` and it renders a Next.js <Link> for internal routes (so
 * navigation stays client-side) or a plain <a> for external URLs and
 * "#" placeholders. Either way it is a real link for screen readers.
 */
export type ButtonProps = Omit<MuiButtonProps, "href" | "LinkComponent"> & {
  href?: string;
};

export function Button({ href, ...props }: ButtonProps) {
  if (href) {
    const internal = href.startsWith("/");
    return <MuiButton component={internal ? NextLink : "a"} href={href} {...props} />;
  }
  return <MuiButton type="button" {...props} />;
}

export default Button;
