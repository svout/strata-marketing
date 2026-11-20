"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { PatternFrame } from "@/components/elements/PatternFrame";
import { Icons } from "@/components/icons";
import { demoForm as copy, demoHero as hero } from "@/constraints/demo";

/**
 * Request demo, v2. The cobalt pattern frames the whole page, like every
 * hero. Copy and the three call steps on the left, the form card on the
 * right (stacked on mobile).
 *
 * Form: 5 fields (name, company, work email, use case, optional note) +
 * an invisible honeypot. Native inputs, v2: 40 px, radius 8, surface-2
 * with a line-strong edge; cobalt edge and halo on focus; blocked-red
 * edge and message on error. Each error is tied to its field with
 * aria-describedby, and focus moves to the first invalid field.
 * Success: the three call steps light up one by one, then the thank-you
 * message, announced to screen readers.
 */
type Field = "name" | "company" | "email" | "useCase" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass = (invalid: boolean) =>
  clsx(
    "h-10 w-full rounded-button bg-surface-2 px-3 text-[15px] text-text-1 outline-none transition-shadow placeholder:text-text-3",
    "focus:shadow-[inset_0_0_0_1px_#2B59FF,0_0_0_3px_rgba(43,89,255,0.35)]",
    invalid ? "shadow-[inset_0_0_0_1px_var(--color-blocked)]" : "shadow-[inset_0_0_0_1px_var(--color-line-strong)]",
  );

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-[13px] font-medium text-text-1">
      {children}
      {optional && <span className="font-normal text-text-2"> (optional)</span>}
    </label>
  );
}

function ErrorText({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <span id={id} className="flex items-center gap-1.5 text-[13px] text-blocked">
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
      className="flex flex-col gap-[18px] rounded-panel-lg bg-surface-1 p-6 shadow-float md:p-8"
    >
      <h2 id="demo-form-title" className="text-[22px]">
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
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238A8F98' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
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
        className="flex h-10 items-center justify-center rounded-button bg-cobalt text-[14px] font-medium text-white transition-colors hover:bg-cobalt-600 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : copy.submit}
      </button>

      <p role="status" aria-live="polite" className={clsx("text-sm text-blocked", status !== "error" && "sr-only")}>
        {status === "error" ? copy.error : ""}
      </p>
      <p className="text-xs text-text-3">{copy.privacy}</p>
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
    <PatternFrame id="demo-pattern" labelledBy="demo-title" containerClassName="min-h-[calc(100dvh-56px)] md:min-h-[calc(100dvh-72px)]">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-5 pb-16 pt-[112px] md:pb-20 md:pt-[150px] lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-20">
        <div className="flex flex-col items-start gap-6">
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-cobalt-light">Request a demo</p>
          <h1 id="demo-title" className="text-balance text-h1 font-bold">
            {hero.headline} <span className="text-text-2">{hero.headlineAccent}</span>
          </h1>
          <p className="max-w-[520px] text-lede text-text-2">{hero.lede}</p>
          <ol className="mt-2 flex flex-col gap-2.5" aria-label="What happens on the call">
            {hero.steps.map((s, i) => (
              <li
                key={s}
                className={clsx(
                  "flex items-center gap-3 self-start rounded-button px-4 py-2.5 text-[15px] transition-[background-color,color,box-shadow] duration-500",
                  i === 0 && "ml-6",
                  i === 1 && "ml-3",
                  done
                    ? "bg-surface-3 text-text-1 shadow-[inset_0_0_0_1px_#2B59FF]"
                    : "bg-surface-1 text-text-2 shadow-[inset_0_0_0_1px_var(--color-line-strong)]",
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
              className="flex flex-col gap-3 rounded-panel-lg bg-surface-1 p-8 shadow-float outline-none md:p-10"
            >
              <span className="flex size-12 items-center justify-center rounded-card bg-approved-bg text-approved">
                <Icons.Check size={26} />
              </span>
              <h2 className="text-[26px]">{copy.success.title}</h2>
              <p className="text-body-lg text-text-2">{copy.success.body}</p>
            </div>
          ) : (
            <DemoForm onSuccess={onSuccess} />
          )}
        </div>
      </div>
    </PatternFrame>
  );
}

export default DemoPage;
