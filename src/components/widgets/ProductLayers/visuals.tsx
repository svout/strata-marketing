import clsx from "clsx";
import { DecisionChip } from "@/components/elements/DecisionChip";
import { ledgerChainSample, mandateEditorSample as m, reviewQueueSample as rq } from "@/constraints/product";

/**
 * Product UI crops for the three layer sections, rebuilt from the
 * platform boards with their real components (not screenshots):
 * - MandateEditorCrop ← P7 Mandate editor
 * - ReviewQueueCrop   ← P5 Review queue
 * - LedgerChain       ← W2 ledger blocks
 * They are illustrations: each <figure> has a text caption for screen
 * readers, and the mock controls inside are hidden from them (they look
 * like inputs and buttons but do nothing).
 */

function Frame({ caption, children, className }: { caption: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className={clsx("relative min-w-0", className)}>
      <figcaption className="sr-only">{caption}</figcaption>
      <div aria-hidden>{children}</div>
      <span aria-hidden className="absolute right-4 top-4 font-mono text-overline text-fg-muted">
        SAMPLE
      </span>
    </figure>
  );
}

const field = "flex h-10 items-center rounded-sm border-[1.5px] border-line bg-elevated px-3 font-mono text-sm";

export function MandateEditorCrop() {
  return (
    <Frame
      caption={`Example from the mandate editor: ${m.plainWords}`}
      className="md:pb-20"
    >
      {/* Extra bottom padding is the space the "In plain words" card overlaps */}
      <div className="rounded-[22px] bg-elevated p-5 pb-12 shadow-pop md:p-6 md:pb-24">
        <p className="text-[13px] text-fg-muted">{m.breadcrumb}</p>
        <p className="mb-2 mt-0.5 text-[22px] font-semibold tracking-[-0.03em]">{m.name}</p>

        <div className="grid gap-x-4 gap-y-1 text-sm sm:grid-cols-[140px_minmax(0,1fr)]">
          <span className="pt-4 font-semibold">1 · Which agent?</span>
          <div className="border-b border-[#EEECE6] py-3">
            <div className={field}>{m.agent}</div>
          </div>

          <span className="pt-4 font-semibold">2 · What &amp; where?</span>
          <div className="flex flex-wrap gap-2 border-b border-[#EEECE6] py-3 text-[13px]">
            {m.categories.map((c) => (
              <span key={c} className="rounded-full bg-cobalt-500 px-3 py-1.5 font-semibold text-white">
                {c} ✕
              </span>
            ))}
            <span className="rounded-full border-[1.5px] border-dashed border-mist px-3 py-1.5 text-fg-muted">
              + Add category
            </span>
          </div>

          <span className="pt-4 font-semibold">3 · How much?</span>
          <div className="grid grid-cols-3 gap-2.5 border-b border-[#EEECE6] py-3">
            {m.caps.map((c) => (
              <div key={c.label} className="flex flex-col gap-1.5">
                <span className="text-xs text-fg-muted">{c.label}</span>
                <div className={field}>{c.value}</div>
              </div>
            ))}
          </div>

          <span className="pt-4 font-semibold">4 · When?</span>
          <div className="flex flex-wrap gap-1.5 border-b border-[#EEECE6] py-3 text-[13px]">
            {m.days.map((d) => (
              <span key={d.d} className={clsx("rounded-sm px-2.5 py-1.5", d.on ? "bg-ink text-white" : "bg-[#EEECE6]")}>
                {d.d}
              </span>
            ))}
          </div>

          <span className="pt-4 font-semibold">5 · Ask a human?</span>
          <div className="flex flex-wrap items-center gap-2.5 py-3">
            <span className="relative h-[26px] w-11 shrink-0 rounded-full bg-cobalt-500">
              <span className="absolute right-[3px] top-[3px] size-5 rounded-full bg-white" />
            </span>
            Review over <span className={clsx(field, "h-9 w-20")}>{m.reviewOver}</span> and notify{" "}
            <b>{m.reviewer}</b>
          </div>
        </div>
      </div>

      {/* "In plain words" card overlapping the editor, as on P7 */}
      <div className="relative z-10 mx-4 -mt-8 rounded-[18px] bg-ink p-5 text-white shadow-pop md:absolute md:bottom-0 md:right-[-12px] md:mx-0 md:mt-0 md:w-[340px]">
        <span className="font-mono text-overline text-mist">IN PLAIN WORDS</span>
        <p className="mt-2 text-[15px] font-semibold leading-snug">{m.plainWords}</p>
      </div>
    </Frame>
  );
}

export function ReviewQueueCrop() {
  const [first, second] = rq.cards;
  return (
    <Frame caption={`Example from the review queue: ${first.amount} from ${first.agent}. ${first.why}`}>
      <div className="flex flex-col gap-3 rounded-[22px] bg-surface p-4 md:p-6">
        <p className="flex items-baseline gap-3 pr-16">
          <span className="text-[22px] font-semibold tracking-[-0.03em]">Review queue</span>
          <span className="text-sm text-fg-muted">{rq.waiting}</span>
        </p>

        <div className="flex flex-col gap-4 rounded-[18px] border-2 border-cobalt-500 bg-elevated p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[26px] font-medium">{first.amount}</span>
              <span className="font-mono text-[13px]">{first.agent}</span>
              <span className="text-[13px] text-fg-muted">{first.merchant}</span>
            </div>
            <DecisionChip tone="review">Needs review</DecisionChip>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-xs text-fg-muted">WHY IT&apos;S HERE</span>
            <span className="text-sm leading-normal">{first.why}</span>
            <div className="flex items-center gap-2 text-xs text-fg-muted">
              Risk
              <span className="h-1.5 w-32 rounded-full bg-[#EEECE6]">
                <span className="block h-1.5 rounded-full bg-review" style={{ width: `${first.score * 100}%` }} />
              </span>
              <span className="font-mono">{first.score.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex gap-2.5 text-[15px] font-semibold">
            <span className="flex h-11 flex-1 items-center justify-center rounded-full bg-cobalt-500 text-white">
              Approve
            </span>
            <span className="flex h-11 flex-1 items-center justify-center rounded-full border-[1.5px] border-line bg-elevated">
              Decline
            </span>
          </div>
        </div>

        {/* Next card in the queue, compact: shows there's a list */}
        <div className="flex items-center justify-between gap-4 rounded-[18px] border border-line bg-elevated px-5 py-4">
          <div className="flex flex-col">
            <span className="font-mono text-lg font-medium">{second.amount}</span>
            <span className="text-[13px] text-fg-muted">{second.agent}</span>
          </div>
          <span className="font-mono text-xs text-fg-muted">Risk {second.score.toFixed(2)}</span>
        </div>
      </div>
    </Frame>
  );
}

const outcomeWord = { approve: "approve", review: "review", block: "block" } as const;

export function LedgerChain() {
  return (
    <figure className="min-w-0">
      <figcaption className="sr-only">
        Three ledger entries, #1041 to #1043, each storing the fingerprint of the entry before it.
      </figcaption>
      <ol className="flex flex-col items-stretch gap-0 sm:flex-row sm:items-center">
        {ledgerChainSample.map((e, i) => {
          const last = i === ledgerChainSample.length - 1;
          return (
            <li key={e.id} className="flex flex-col items-stretch sm:flex-1 sm:flex-row sm:items-center">
              {i > 0 && (
                <span aria-hidden className="mx-auto h-4 w-0.5 bg-cobalt-500 sm:mx-0 sm:h-0.5 sm:w-4 sm:shrink-0" />
              )}
              <div
                className={clsx(
                  "flex-1 rounded-[14px] p-4 font-mono text-xs leading-[1.7]",
                  last ? "bg-cobalt-500 text-white" : "border border-line bg-surface text-[#C9CBD1]",
                )}
              >
                <span className="block text-sm font-medium text-white">{e.id}</span>
                {outcomeWord[e.outcome as keyof typeof outcomeWord]}
                <br />
                <span className={last ? "text-white" : "text-cobalt-300"}>prev {e.prev}</span>
              </div>
            </li>
          );
        })}
      </ol>
      <p aria-hidden className="mt-4 font-mono text-overline text-fg-muted">
        SAMPLE
      </p>
    </figure>
  );
}
