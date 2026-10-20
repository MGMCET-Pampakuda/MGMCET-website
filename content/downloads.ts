import type { DownloadItem } from "@/types";

/**
 * Downloads / Documents.
 * PDF links from the original site kept as external links.
 * TODO(content): download PDFs and save to /public/documents/ for self-hosting.
 */
export const downloads: DownloadItem[] = [
  {
    id: "nirf-report",
    title: "NIRF Report",
    category: "regulatory",
    // TODO(content): replace with direct PDF link from the college's NIRF submission
    href: "https://www.nirfindia.org/",
    fileType: "pdf",
    isExternal: true,
    description: "National Institutional Ranking Framework (NIRF) report.",
  },
  {
    id: "aicte-approval",
    title: "AICTE Approval Letter",
    category: "regulatory",
    // TODO(content): replace with the actual AICTE approval PDF URL from the original site
    href: "https://www.aicte-india.org/",
    fileType: "pdf",
    isExternal: true,
    description: "AICTE approval letter for the current academic year.",
  },
  {
    id: "sc-st-committee",
    title: "SC-ST Committee Report",
    category: "regulatory",
    // TODO(content): replace with actual PDF URL from the original site
    href: "#",
    fileType: "pdf",
    isExternal: false,
    description: "SC-ST Committee details and report.",
  },
  {
    id: "mandatory-disclosure",
    title: "Mandatory Disclosure",
    category: "regulatory",
    // TODO(content): replace with actual Mandatory Disclosure PDF URL from the original site
    href: "#",
    fileType: "pdf",
    isExternal: false,
    description: "AICTE Mandatory Disclosure document.",
  },
  {
    id: "prospectus",
    title: "College Prospectus",
    category: "prospectus",
    href: "/documents/prospectus.pdf",
    fileType: "pdf",
    isExternal: false,
    description: "Official college prospectus with programme details and fee structure.", // TODO(content): add real prospectus PDF
  },
];
