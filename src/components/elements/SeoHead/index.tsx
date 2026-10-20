import OrganizationJsonLd from "@/lib/OrganizationJsonLd";
import Head from "next/head";

export const SeoHead = (props: { name?: string }) => {
  const name = props?.name || process.env.NEXT_PUBLIC_TITLE || "";
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{name}</title>
      <meta
        name="description"
        content="Break Bad Habits. Regain Control. Track your progress, learn better choices, and see real benefits. Say goodbye to bad habits with proven tools."
      />
      <link rel="canonical" href="https://prohabit.ai/" />

      {/* <!-- Open Graph --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://prohabit.ai/" />
      <meta
        property="og:title"
        content="ProHabit — Break Bad Habits. Regain Control."
      />
      <meta
        property="og:description"
        content="Build good habits, break bad ones, and visualize your progress."
      />
      <meta
        property="og:image"
        content="https://prohabit.ai/og/og-default.jpg"
      />

      {/* <!-- Twitter --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@prohabit_ai" />
      <meta
        name="twitter:title"
        content="ProHabit — Break Bad Habits. Regain Control."
      />
      <meta
        name="twitter:description"
        content="Build good habits, break bad ones, and visualize your progress."
      />
      <meta
        name="twitter:image"
        content="https://prohabit.ai/og/og-default.jpg"
      />

      <meta name="viewport" content="minimal-ui" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="apple-mobile-web-app-title" content={name} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest"></link>
      <OrganizationJsonLd />
    </Head>
  );
};
