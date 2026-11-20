import type { Metadata } from "next";
import Link from "next/link";
import { Containers } from "@/components";
import PageHero from "@/components/widgets/PageHero";
import { ROUTES } from "@/config/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** 404: keeps the full header and footer and links back into every page. */
export default function NotFound() {
  return (
    <Containers.Layout>
      <PageHero
        id="not-found-title"
        eyebrow="404"
        title="This page doesn't exist."
        lede="The link may be old or mistyped. These pages do:"
        primary={{ label: "Back to home", href: "/" }}
        below={
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
            {ROUTES.filter((r) => r.path !== "/").map((r) => (
              <li key={r.path}>
                <Link href={r.path} className="rounded-sm text-text-1 hover:text-white">
                  {r.name} <span aria-hidden className="text-text-2">›</span>
                </Link>
              </li>
            ))}
          </ul>
        }
      />
    </Containers.Layout>
  );
}
