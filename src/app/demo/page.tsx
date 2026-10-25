import type { Metadata } from "next";
import { Containers } from "@/components";
import { DemoPage } from "@/components/widgets/DemoPage";
import { demoMeta } from "@/constraints/demo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...demoMeta, path: "/demo" });

/**
 * Request demo (W5): a focused page, logo and "Back to site" only, no
 * footer. Submissions go to /api/demo (see that route for delivery).
 */
export default function RequestDemoPage() {
  return (
    <Containers.Layout variant="focus">
      <DemoPage />
    </Containers.Layout>
  );
}
