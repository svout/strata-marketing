import type { Metadata } from "next";
import Link from "next/link";
import { Containers } from "@/components";
import { Button } from "@/components/elements/Button";
import { containerClass } from "@/components/containers/Section";
import { ROUTES } from "@/config/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** 404: keeps the full header and footer and links back into every page. */
export default function NotFound() {
  return (
    <Containers.Layout headerTone="light">
      <section aria-labelledby="not-found-title" className="bg-surface pb-24 pt-[120px] md:pb-32 md:pt-[184px]">
        <div className={containerClass}>
          <div className="flex max-w-[900px] flex-col items-start gap-6">
            <p className="font-mono text-label font-medium uppercase tracking-[0.1em] text-brand-on-subtle">404</p>
            <h1
              id="not-found-title"
              className="text-balance text-[clamp(2.75rem,1.4rem+4.6vw,4.5rem)] font-semibold leading-none tracking-[-0.05em]"
            >
              This page doesn&apos;t exist.
            </h1>
            <p className="max-w-[620px] text-body-lg text-fg-muted md:text-xl">
              The link may be old or mistyped. These pages do:
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-body-lg">
              {ROUTES.filter((r) => r.path !== "/").map((r) => (
                <li key={r.path}>
                  <Link href={r.path} className="rounded-sm font-medium text-brand-on-subtle hover:underline">
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button variant="primary" size="large" href="/" className="mt-2">
              Back to home
            </Button>
          </div>
        </div>
      </section>
    </Containers.Layout>
  );
}
