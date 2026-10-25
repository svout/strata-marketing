"use client";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Section from "@/components/containers/Section";
import { Icons } from "@/components/icons";
import type { SectionTone } from "@/types/section";
import type { FaqItem } from "@/types/product";

/**
 * FAQ (Product · 06 in W2, also on Home): title left, MUI accordion
 * right. MUI wraps each question in an <h3> button with
 * aria-expanded/aria-controls, so it works with a keyboard and screen
 * readers out of the box. Collapsed answers stay in the server HTML, so
 * crawlers read them too. The page renders the matching FAQPage JSON-LD
 * (lib/jsonLd `faqSchema`).
 */
type FaqProps = {
  id: string;
  title: string;
  items: FaqItem[];
  tone?: SectionTone;
};

const Faq = ({ id, title, items, tone = "paper" }: FaqProps) => (
  <Section tone={tone} id={id} labelledBy={`${id}-title`}>
    <div className="grid gap-8 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-16">
      <h2
        id={`${id}-title`}
        className="text-[clamp(2rem,1.2rem+2.6vw,3rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-balance"
      >
        {title}
      </h2>
      <div className="border-b border-line">
        {items.map((item, i) => (
          <Accordion key={item.question}>
            <AccordionSummary
              id={`${id}-q-${i}`}
              aria-controls={`${id}-a-${i}`}
              expandIcon={<Icons.ChevronDown size={22} className="text-fg-muted" />}
              className="min-h-16 text-fg"
            >
              <span className="py-3 text-[17px] font-semibold md:text-[19px]">{item.question}</span>
            </AccordionSummary>
            <AccordionDetails id={`${id}-a-${i}`} className="pb-6">
              <p className="max-w-[60ch] text-body-lg text-fg-muted">{item.answer}</p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  </Section>
);

export default Faq;
