/**
 * Home · 03 "How Strata decides": the animated scene.
 *
 * Copied as is from the design canvas, page "Home template (Stripe)",
 * board 03B (project/TplHowB.dc.html). See the project doc
 * "design/Home Section 03 Handoff.md".
 *
 * It is a 1200 × 795 SVG of a macOS-style app window. Inside, a 12 s
 * SMIL loop (<animate>/<animateMotion>) plays three SAMPLE payments
 * through the Mandate → Risk → Ledger gates:
 *   0.02–0.22  £412 hotel        → approved (green)
 *   0.36–0.54  £9,800 supplier   → sent to review (amber)
 *   0.69–0.88  £1,250 unknown    → blocked at Mandate (red)
 *
 * Only change from the board: the three ledger blocks at the bottom
 * carry class="ledger-block", so the reduced-motion still frame can show
 * all three (see globals.css → .decide-scene.is-still).
 *
 * Playback (start on scroll, pause off screen, still frame) is driven by
 * the widget through the SVG's own pauseAnimations / setCurrentTime API.
 * To change the animation, edit the board and paste the new <svg> here.
 */
export const SCENE_DURATION_S = 12;

/** Poster frame for reduced motion: the £9,800 review state (t ≈ 0.6). */
export const SCENE_POSTER_AT = 0.6;

export const decisionSceneSvg = `<svg width="1200" height="795" viewBox="0 0 1200 795" style="display: block;" role="img" aria-label="Animation: three agent payments pass through Strata's mandate, risk and ledger checks inside a laptop screen. A £412 hotel is approved, a £9,800 supplier order is sent to review, and £1,250 from an unknown agent is blocked.">
    <defs>
      <pattern id="tplLapPat" width="96" height="96" patternUnits="userSpaceOnUse"><rect x="36" y="14" width="48" height="18" rx="9" fill="#12151F"></rect><rect x="24" y="39" width="48" height="18" rx="9" fill="#12151F"></rect><rect x="12" y="64" width="48" height="18" rx="9" fill="#12151F"></rect></pattern>
      <path id="tplLapP1" d="M210 300 L700 300 C730 300 730 170 760 170"></path>
      <path id="tplLapP2" d="M210 300 L760 300"></path>
      <path id="tplLapP3" d="M210 300 L380 300 C380 450 420 450 480 450 L730 450 C750 450 750 430 760 430"></path>
    </defs>

    <rect width="1200" height="795" fill="#0B0D12"></rect>
    <rect width="1200" height="44" fill="#1C1F26"></rect>
    <rect y="43" width="1200" height="1" fill="#2A2D35"></rect>
    <circle cx="22" cy="22" r="6.5" fill="#FF5F57"></circle>
    <circle cx="44" cy="22" r="6.5" fill="#FEBC2E"></circle>
    <circle cx="66" cy="22" r="6.5" fill="#28C840"></circle>
    <text x="600" y="27" text-anchor="middle" font-family="Instrument Sans, sans-serif" font-size="13" font-weight="600" fill="#C9CBD1">Strata — Live decisions</text>

    <g transform="translate(0 44) scale(1.2605)">
      <rect width="952" height="596" fill="#0B0D12"></rect>
      <rect width="952" height="596" fill="url(#tplLapPat)"></rect>

      <g font-family="Instrument Sans, sans-serif">
        <text x="40" y="94" font-size="22" font-weight="600" fill="#FFFFFF" opacity="0">travel-booker books a £412 hotel<animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.02;0.03;0.32;0.33;1"></animate></text>
        <text x="40" y="94" font-size="22" font-weight="600" fill="#FFFFFF" opacity="0">procure-bot orders £9,800 from a supplier<animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.35;0.36;0.65;0.66;1"></animate></text>
        <text x="40" y="94" font-size="22" font-weight="600" fill="#FFFFFF" opacity="0">An unknown agent tries to spend £1,250<animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.68;0.69;0.98;0.99;1"></animate></text>
        <text x="40" y="124" font-size="16" fill="#3CCB9F" opacity="0">Approved. Paid and recorded.<animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.22;0.23;0.32;0.33;1"></animate></text>
        <text x="40" y="124" font-size="16" fill="#F2C14E" opacity="0">Unusual size. Waiting for [name] to approve.<animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.54;0.55;0.65;0.66;1"></animate></text>
        <text x="40" y="124" font-size="16" fill="#FF7A7E" opacity="0">No mandate. Blocked, nothing charged.<animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.88;0.89;0.98;0.99;1"></animate></text>
      </g>

      <path d="M210 300 H700" stroke="#2A2D35" stroke-width="2" stroke-dasharray="4 6" fill="none"></path>
      <path d="M700 300 C730 300 730 170 760 170" stroke="#2A2D35" stroke-width="2" stroke-dasharray="4 6" fill="none"></path>
      <path d="M700 300 H760" stroke="#2A2D35" stroke-width="2" stroke-dasharray="4 6" fill="none"></path>
      <path d="M380 300 C380 450 420 450 480 450 L730 450 C750 450 750 430 760 430" stroke="#2A2D35" stroke-width="2" stroke-dasharray="4 6" fill="none"></path>

      <rect x="40" y="252" width="170" height="96" rx="20" fill="#1C1F26" stroke="#2A2D35"></rect>
      <text x="60" y="284" font-family="IBM Plex Mono, monospace" font-size="11" fill="#A3A6AE">YOUR AGENT</text>
      <g font-family="IBM Plex Mono, monospace" font-size="14" fill="#FFFFFF">
        <text x="60" y="316" opacity="0">travel-booker<animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.01;0.02;0.32;0.33;1"></animate></text>
        <text x="60" y="316" opacity="0">procure-bot<animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.34;0.35;0.65;0.66;1"></animate></text>
        <text x="60" y="316" opacity="0">agt_unknown<animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.67;0.68;0.98;0.99;1"></animate></text>
      </g>

      <g font-family="IBM Plex Mono, monospace" font-size="12" fill="#A3A6AE" text-anchor="middle">
        <text x="380" y="176">01 MANDATE</text>
        <text x="520" y="186">02 RISK</text>
        <text x="660" y="196">03 LEDGER</text>
      </g>
      <rect x="338" y="190" width="84" height="200" rx="42" fill="#1C1F26" stroke="#2A2D35"></rect>
      <rect x="478" y="200" width="84" height="200" rx="42" fill="#1C1F26" stroke="#2A2D35"></rect>
      <rect x="618" y="210" width="84" height="200" rx="42" fill="#1C1F26" stroke="#2A2D35"></rect>

      <g opacity="0"><rect x="338" y="190" width="84" height="200" rx="42" fill="#10322A" stroke="#3CCB9F" stroke-width="2"></rect><text x="380" y="372" text-anchor="middle" font-size="18" fill="#3CCB9F">✓</text><animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0;1;1;0;0" keyTimes="0;0.06;0.07;0.1;0.12;0.4;0.41;0.44;0.46;1"></animate></g>
      <g opacity="0"><rect x="338" y="190" width="84" height="200" rx="42" fill="#3A1416" stroke="#FF7A7E" stroke-width="2"></rect><text x="380" y="372" text-anchor="middle" font-size="18" fill="#FF7A7E">✕</text><animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.72;0.73;0.8;0.82;1"></animate></g>
      <g opacity="0"><rect x="478" y="200" width="84" height="200" rx="42" fill="#10322A" stroke="#3CCB9F" stroke-width="2"></rect><text x="520" y="382" text-anchor="middle" font-size="18" fill="#3CCB9F">✓</text><animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.105;0.115;0.145;0.165;1"></animate></g>
      <g opacity="0"><rect x="478" y="200" width="84" height="200" rx="42" fill="#3A2E0A" stroke="#F2C14E" stroke-width="2"></rect><text x="520" y="382" text-anchor="middle" font-size="18" fill="#F2C14E">▲</text><animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.45;0.46;0.54;0.56;1"></animate></g>
      <g opacity="0"><rect x="618" y="210" width="84" height="200" rx="42" fill="#13204D" stroke="#8FA6FF" stroke-width="2"></rect><text x="660" y="392" text-anchor="middle" font-size="18" fill="#8FA6FF">●</text><animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0;1;1;0;0" keyTimes="0;0.15;0.16;0.19;0.21;0.5;0.51;0.54;0.56;1"></animate></g>

      <g font-family="Instrument Sans, sans-serif">
        <rect x="760" y="132" width="172" height="76" rx="18" fill="#14161C" stroke="#2A2D35"></rect>
        <text x="780" y="164" font-size="15" font-weight="600" fill="#3CCB9F">● Approved</text>
        <text x="780" y="188" font-size="12.5" fill="#A3A6AE">to [payment provider]</text>
        <rect x="760" y="262" width="172" height="76" rx="18" fill="#14161C" stroke="#2A2D35"></rect>
        <text x="780" y="294" font-size="15" font-weight="600" fill="#F2C14E">● Review</text>
        <text x="780" y="318" font-size="12.5" fill="#A3A6AE">waits for a person</text>
        <rect x="760" y="392" width="172" height="76" rx="18" fill="#14161C" stroke="#2A2D35"></rect>
        <text x="780" y="424" font-size="15" font-weight="600" fill="#FF7A7E">● Blocked</text>
        <text x="780" y="448" font-size="12.5" fill="#A3A6AE">nothing charged</text>
      </g>
      <rect x="760" y="132" width="172" height="76" rx="18" fill="#3CCB9F" fill-opacity="0.12" stroke="#3CCB9F" stroke-width="2" opacity="0"><animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.215;0.225;0.32;0.33;1"></animate></rect>
      <rect x="760" y="262" width="172" height="76" rx="18" fill="#F2C14E" fill-opacity="0.12" stroke="#F2C14E" stroke-width="2" opacity="0"><animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.535;0.545;0.65;0.66;1"></animate></rect>
      <rect x="760" y="392" width="172" height="76" rx="18" fill="#FF7A7E" fill-opacity="0.12" stroke="#FF7A7E" stroke-width="2" opacity="0"><animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.875;0.885;0.98;0.99;1"></animate></rect>

      <g opacity="0">
        <rect x="-62" y="-17" width="124" height="34" rx="17" fill="#FFFFFF"><animate attributeName="fill" dur="12s" repeatCount="indefinite" values="#FFFFFF;#FFFFFF;#3CCB9F;#3CCB9F" keyTimes="0;0.16;0.17;1"></animate></rect>
        <text x="0" y="5" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="13" fill="#0B0D12">£412 · hotel</text>
        <animateMotion dur="12s" repeatCount="indefinite" keyPoints="0;0;1;1" keyTimes="0;0.02;0.22;1" calcMode="linear"><mpath href="#tplLapP1"></mpath></animateMotion>
        <animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.02;0.03;0.21;0.225;1"></animate>
      </g>
      <g opacity="0">
        <rect x="-70" y="-17" width="140" height="34" rx="17" fill="#FFFFFF"><animate attributeName="fill" dur="12s" repeatCount="indefinite" values="#FFFFFF;#FFFFFF;#F2C14E;#F2C14E" keyTimes="0;0.46;0.47;1"></animate></rect>
        <text x="0" y="5" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="13" fill="#0B0D12">£9,800 · supplier</text>
        <animateMotion dur="12s" repeatCount="indefinite" keyPoints="0;0;1;1" keyTimes="0;0.36;0.54;1" calcMode="linear"><mpath href="#tplLapP2"></mpath></animateMotion>
        <animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.36;0.37;0.53;0.545;1"></animate>
      </g>
      <g opacity="0">
        <rect x="-70" y="-17" width="140" height="34" rx="17" fill="#FFFFFF"><animate attributeName="fill" dur="12s" repeatCount="indefinite" values="#FFFFFF;#FFFFFF;#FF7A7E;#FF7A7E" keyTimes="0;0.73;0.74;1"></animate></rect>
        <text x="0" y="5" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="13" fill="#0B0D12">£1,250 · unknown</text>
        <animateMotion dur="12s" repeatCount="indefinite" keyPoints="0;0;0.264;0.264;1;1" keyTimes="0;0.69;0.73;0.77;0.88;1" calcMode="linear"><mpath href="#tplLapP3"></mpath></animateMotion>
        <animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.69;0.7;0.87;0.885;1"></animate>
      </g>

      <text x="40" y="548" font-family="IBM Plex Mono, monospace" font-size="11" fill="#A3A6AE">LEDGER</text>
      <path d="M120 543 H430" stroke="#2A2D35" stroke-width="2"></path>
      <g font-family="IBM Plex Mono, monospace" font-size="12" fill="#FFFFFF" text-anchor="middle">
        <g class="ledger-block" opacity="0"><rect x="120" y="526" width="92" height="34" rx="10" fill="#13204D" stroke="#2B59FF"></rect><text x="166" y="548">#1041 ✓</text><animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.19;0.205;1"></animate></g>
        <g class="ledger-block" opacity="0"><rect x="230" y="526" width="92" height="34" rx="10" fill="#13204D" stroke="#2B59FF"></rect><text x="276" y="548">#1042 ▲</text><animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.52;0.535;1"></animate></g>
        <g class="ledger-block" opacity="0"><rect x="340" y="526" width="92" height="34" rx="10" fill="#13204D" stroke="#2B59FF"></rect><text x="386" y="548">#1043 ✕</text><animate attributeName="opacity" dur="12s" repeatCount="indefinite" values="0;0;1;1" keyTimes="0;0.86;0.875;1"></animate></g>
      </g>
    </g>
  </svg>`;
