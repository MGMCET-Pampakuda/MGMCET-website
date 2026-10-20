import type { Metadata } from "next";
import { DesignSystemPage } from "@/components/design-system";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Design System Catalog | MGMCET Dev",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DesignSystemPage />;
}
