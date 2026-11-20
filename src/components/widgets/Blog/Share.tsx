"use client";

import { useState } from "react";
import clsx from "clsx";
import { Icons } from "@/components/icons";

/**
 * Share row: LinkedIn, X and copy link. The shared URL carries UTM tags
 * per channel, so analytics show which network a reader came from.
 * Plain links (no SDKs, no tracking scripts); they open in a new tab.
 */
type ShareProps = {
  url: string;
  title: string;
  campaign: string;
  className?: string;
};

const withUtm = (url: string, source: string, campaign: string) =>
  `${url}?utm_source=${source}&utm_medium=social&utm_campaign=${encodeURIComponent(campaign)}`;

const pill =
  "inline-flex h-10 items-center gap-2 rounded-button bg-surface-3 px-4 text-[14px] font-medium text-text-1 shadow-[inset_0_0_0_1px_var(--color-line-strong)] transition-colors hover:bg-[#24262B]";

export function Share({ url, title, campaign, className }: ShareProps) {
  const [copied, setCopied] = useState(false);
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(withUtm(url, "linkedin", campaign))}`;
  const x = `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(withUtm(url, "x", campaign))}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={clsx("flex flex-wrap gap-2", className)}>
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className={pill}>
        <Icons.LinkedIn size={16} />
        Share on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <a href={x} target="_blank" rel="noopener noreferrer" className={pill}>
        <Icons.X size={14} />
        Post on X<span className="sr-only"> (opens in a new tab)</span>
      </a>
      <button type="button" onClick={copy} className={pill}>
        {copied ? <Icons.Check size={16} /> : <Icons.Link size={16} />}
        {copied ? "Link copied" : "Copy link"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}

export default Share;
