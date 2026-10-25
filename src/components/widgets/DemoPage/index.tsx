"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { PillPattern, type LitPill } from "@/components/elements/PillPattern";
import { containerClass } from "@/components/containers/Section";
import { Icons } from "@/components/icons";
import { demoForm as copy, demoHero as hero } from "@/constraints/demo";

/**
 * Request demo (W5). Continues the hero: same cobalt pattern, so clicking
 * "Request demo" feels like one step, not a new page. Copy and the three
 * call steps on the left, the form card on the right (stacked on mobile).
 *
 * Form: 5 fields (name, company, work email, use case, optional note) +
 * an invisible honeypot. Native inputs styled to the UI kit Input spec
 * (44 px, 8 px radius, cobalt border + #DCE4FF halo on focus, red border
 * and message on error). Each error is tied to its field with
 * aria-describedby, and focus moves to the first invalid field.
 * Success: the three step pills light up one by one, then the thank-you
 * message, announced to screen readers.
 */
const lit: LitPill[] = [
  { col: 1, row: 3, colour: "white" },
  { col: 7, row: 6, colour: "white" },
  { col: 1, row: 25, colour: "white" },
  { col: 7, row: 28, colour: "white" },
];
const litCompact: LitPill[] = [
  { col: 1, row: 3, colour: "white" },
  { col: -2, row: 4, colour: "white" },
];

type Field = "name" | "company" | "email" | "useCase" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass = (invalid: boolean) =>
  clsx(
    "h-11 w-full rounded-sm border-[1.5px] bg-white px-3 text-[15px] text-ink outline-none transition-[border-color,box-shadow]",
    "focus:border-cobalt-500 focus:shadow-[0_0_0_4px_var(--color-cobalt-100)]",
    invalid ? "border-block" : "border-line",
  );

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-label font-semibold text-ink">
      {children}
      {optional && <span className="font-normal text-fg-muted"> (optional)</span>}
    </label>
  );
}

function ErrorText({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <span id={id} className="flex items-center gap-1.5 text-[13px] text-block">
      <Icons.Alert size={14} />
      {msg}
    </span>
  );
}

export function DemoForm({ onSuccess }: { onSuccess: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const check = (fd: FormData): Errors => {
    const e: Errors = {};
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    if (!v("name")) e.name = "Please enter your name.";
    if (!v("company")) e.company = "Please enter your company.";
    if (!v("email")) e.email = "Please enter your work email.";
    else if (!EMAIL.test(v("email"))) e.email = "That email doesn't look right. Check for typos.";
    if (!v("useCase")) e.useCase = "Please choose what your agents pay for.";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const fd = new FormData(form);
    const found = check(fd);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      if (!res.ok) throw new Error(String(res.status));
      onSuccess();
    } catch {
      setStatus("error");
    }
  };

  const err = (f: Field) => ({
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `${f}-error` : undefined,
  });

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="demo-form-title"
      data-theme="light"
      className="flex flex-col gap-[18px] rounded-[22px] bg-white p-6 text-ink shadow-[0_40px_80px_rgb(11_13_18/0.35)] md:rounded-[26px] md:p-9"
    >
      <h2 id="demo-form-title" className="text-[22px] font-semibold tracking-[-0.02em]">
        {copy.title}
      </h2>

      <div className="grid gap-[18px] sm:grid-cols-2 sm:gap-3.5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <input id="name" name="name" autoComplete="name" className={inputClass(!!errors.name)} {...err("name")} />
          <ErrorText id="name-error" msg={errors.name} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company">Company</Label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={inputClass(!!errors.company)}
            {...err("company")}
          />
          <ErrorText id="company-error" msg={errors.company} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Work email</Label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className={inputClass(!!errors.email)}
          {...err("email")}
        />
        <ErrorText id="email-error" msg={errors.email} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="useCase">What do your agents pay for?</Label>
        <select
          id="useCase"
          name="useCase"
          defaultValue=""
          className={clsx(inputClass(!!errors.useCase), "appearance-none bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10")}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2355575E' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
          {...err("useCase")}
        >
          <option value="" disabled>
            Choose one
          </option>
          {copy.useCases.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
        <ErrorText id="useCase-error" msg={errors.useCase} />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message" optional>
          Anything else?
        </Label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={2000}
          className={clsx(inputClass(false), "h-20 resize-none py-2.5")}
        />
      </div>

      {/* Honeypot: hidden from people and screen readers, bots fill it */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex h-[54px] items-center justify-center rounded-full bg-ink text-base font-semibold text-white transition-colors hover:bg-graphite disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : copy.submit}
      </button>

      <p role="status" aria-live="polite" className={clsx("text-sm text-block", status !== "error" && "sr-only")}>
        {status === "error" ? copy.error : ""}
      </p>
      <p className="text-xs text-fg-muted">{copy.privacy}</p>
    </form>
  );
}

export function DemoPage() {
  const [done, setDone] = useState(false);
  const thanksRef = useRef<HTMLDivElement>(null);

  const onSuccess = () => {
    setDone(true);
    // Move focus to the confirmation so keyboard and screen-reader users land on it
    window.setTimeout(() => thanksRef.current?.focus(), 50);
  };

  return (
    <section
      data-theme="cobalt"
      aria-labelledby="demo-title"
      className="relative min-h-dvh overflow-hidden bg-cobalt-500 pb-16 pt-[100px] md:pb-20 md:pt-[120px]"
    >
      <PillPattern id="demo-hero" variant="cobalt" lit={lit} litCompact={litCompact} scrim="left" />

      <div className={`${containerClass} relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_560px] lg:gap-20`}>
        <div className="flex flex-col items-start gap-6">
          <h1
            id="demo-title"
            className="text-balance text-[clamp(2.75rem,1.4rem+4.4vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.05em]"
          >
            {hero.headline} <span className="text-ink">{hero.headlineAccent}</span>
          </h1>
          <p className="max-w-[520px] text-body-lg text-fg-muted md:text-[19px]">{hero.lede}</p>
          <ol className="mt-2 flex flex-col gap-2.5" aria-label="What happens on the call">
            {hero.steps.map((s, i) => (
              <li
                key={s}
                className={clsx(
                  "self-start rounded-full px-5 py-3 text-base transition-colors duration-500",
                  i === 0 && "ml-6",
                  i === 1 && "ml-3",
                  done ? "bg-white font-semibold text-ink" : "bg-cobalt-700",
                )}
                style={{ transitionDelay: done ? `${i * 350}ms` : "0ms" }}
              >
                {s}
              </li>
            ))}
          </ol>
        </div>

        <div className="min-w-0">
          {done ? (
            <div
              ref={thanksRef}
              tabIndex={-1}
              role="status"
              data-theme="light"
              className="flex flex-col gap-3 rounded-[22px] bg-white p-8 text-ink shadow-[0_40px_80px_rgb(11_13_18/0.35)] outline-none md:rounded-[26px] md:p-10"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-approve-tint text-approve-fg">
                <Icons.Check size={26} />
              </span>
              <h2 className="text-[26px] font-semibold tracking-[-0.02em]">{copy.success.title}</h2>
              <p className="text-body-lg text-fg-muted">{copy.success.body}</p>
            </div>
          ) : (
            <DemoForm onSuccess={onSuccess} />
          )}
        </div>
      </div>
    </section>
  );
}

export default DemoPage;
