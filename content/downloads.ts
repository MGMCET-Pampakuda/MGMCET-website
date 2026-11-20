import type { DownloadItem } from "@/types";

/**
 * Downloads / Regulatory Documents.
 * Direct downloads pointing to public/documents/ files scraped from mgmcet.ac.in.
 */
export const downloads: DownloadItem[] = [
  {
    id: "aicte-approval-2024-25",
    title: "AICTE Approval Letter (2024-25)",
    category: "regulatory",
    // Original: https://www.mgmcet.ac.in/_files/ugd/d90d18_65b15d9cb0494f99a097b6428817f406.pdf
    href: "/documents/aicte-approval-2024-25.pdf",
    fileType: "pdf",
    year: "2024-25",
    isExternal: false,
    description: "Official All India Council for Technical Education (AICTE) Extension of Approval letter for MGMCET.",
  },
  {
    id: "nirf-report-2024",
    title: "NIRF Report 2024",
    category: "regulatory",
    // Original: https://www.mgmcet.ac.in/_files/ugd/d90d18_9a8d824a353841bfb624181f38589250.pdf
    href: "/documents/nirf-report-2024.pdf",
    fileType: "pdf",
    year: "2024",
    isExternal: false,
    description: "National Institutional Ranking Framework (NIRF) 2024 submission and institutional data.",
  },
  {
    id: "sc-st-committee",
    title: "SC-ST Committee Notification",
    category: "regulatory",
    // Original: https://www.mgmcet.ac.in/_files/ugd/d90d18_81c625c975e044d6a6503ccb3b8c4d04.pdf
    href: "/documents/sc-st-committee.pdf",
    fileType: "pdf",
    year: "2024",
    isExternal: false,
    description: "Constitution and order of the SC/ST Committee as mandated by AICTE guidelines.",
  },
  {
    id: "mandatory-disclosure-2024",
    title: "AICTE Mandatory Disclosure (2024)",
    category: "regulatory",
    // Original: https://www.mgmcet.ac.in/_files/ugd/d90d18_ccf58f557c2f42f4baa54befc003661f.pdf
    href: "/documents/mandatory-disclosure-2024.pdf",
    fileType: "pdf",
    year: "2024",
    isExternal: false,
    description: "Statutory mandatory disclosure document covering governance, academic programs, faculty, and infrastructure.",
  },
  {
    id: "anti-ragging-committee",
    title: "Anti-Ragging Committee & Squad",
    category: "regulatory",
    // Original: https://www.mgmcet.ac.in/_files/ugd/d90d18_1d318eef77f4418d996fe73d83a1207b.pdf
    href: "/documents/anti-ragging-committee.pdf",
    fileType: "pdf",
    year: "2024",
    isExternal: false,
    description: "Notification regarding Anti-Ragging Committee and Squad members in compliance with Supreme Court directives.",
  },
];
